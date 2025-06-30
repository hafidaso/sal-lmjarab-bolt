export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'file' | 'image' | 'document';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  timestamp: Date;
  read: boolean;
  edited: boolean;
  editedAt?: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'doctor-patient' | 'patient-support' | 'doctor-doctor';
  lastMessage?: Message;
  lastActivity: Date;
  unreadCount: { [userId: string]: number };
  archived: boolean;
  metadata: {
    patientName?: string;
    doctorName?: string;
    appointmentId?: string;
  };
}

export interface FileAttachment {
  file: File;
  type: 'medical-record' | 'prescription' | 'lab-result' | 'image' | 'document';
  description?: string;
}

class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private typingUsers: Map<string, Set<string>> = new Map();

  async createConversation(
    participants: string[],
    type: 'doctor-patient' | 'patient-support' | 'doctor-doctor',
    metadata?: any
  ): Promise<Conversation> {
    const conversationId = this.generateId();
    
    const conversation: Conversation = {
      id: conversationId,
      participants,
      type,
      lastActivity: new Date(),
      unreadCount: participants.reduce((acc, userId) => {
        acc[userId] = 0;
        return acc;
      }, {} as { [userId: string]: number }),
      archived: false,
      metadata: metadata || {}
    };

    this.conversations.set(conversationId, conversation);
    this.messages.set(conversationId, []);

    return conversation;
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    type: 'text' | 'file' | 'image' | 'document' = 'text',
    fileData?: { url: string; name: string; size: number }
  ): Promise<Message> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (!conversation.participants.includes(senderId)) {
      throw new Error('User not authorized to send messages in this conversation');
    }

    const receiverId = conversation.participants.find(id => id !== senderId);
    if (!receiverId) {
      throw new Error('Receiver not found');
    }

    const message: Message = {
      id: this.generateId(),
      conversationId,
      senderId,
      receiverId,
      content: this.sanitizeContent(content),
      type,
      fileUrl: fileData?.url,
      fileName: fileData?.name,
      fileSize: fileData?.size,
      timestamp: new Date(),
      read: false,
      edited: false
    };

    // Add message to conversation
    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(conversationId, conversationMessages);

    // Update conversation
    conversation.lastMessage = message;
    conversation.lastActivity = new Date();
    conversation.unreadCount[receiverId]++;

    // Send real-time notification
    await this.sendNotification(message);

    return message;
  }

  async sendFileMessage(
    conversationId: string,
    senderId: string,
    attachment: FileAttachment
  ): Promise<Message> {
    // Validate file
    this.validateFile(attachment.file);

    // Upload file (simulated)
    const fileUrl = await this.uploadFile(attachment.file);

    return this.sendMessage(
      conversationId,
      senderId,
      attachment.description || `Shared ${attachment.type}`,
      this.getMessageTypeFromFile(attachment.type),
      {
        url: fileUrl,
        name: attachment.file.name,
        size: attachment.file.size
      }
    );
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conv => conv.participants.includes(userId) && !conv.archived)
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }

  async getMessages(
    conversationId: string,
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      throw new Error('Unauthorized access to conversation');
    }

    const messages = this.messages.get(conversationId) || [];
    return messages
      .slice(-limit - offset, messages.length - offset)
      .reverse();
  }

  async markAsRead(conversationId: string, userId: string, messageId?: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;

    const messages = this.messages.get(conversationId) || [];
    
    if (messageId) {
      // Mark specific message as read
      const message = messages.find(m => m.id === messageId);
      if (message && message.receiverId === userId) {
        message.read = true;
        conversation.unreadCount[userId] = Math.max(0, conversation.unreadCount[userId] - 1);
      }
    } else {
      // Mark all messages as read
      messages
        .filter(m => m.receiverId === userId && !m.read)
        .forEach(m => {
          m.read = true;
        });
      conversation.unreadCount[userId] = 0;
    }
  }

  async editMessage(messageId: string, userId: string, newContent: string): Promise<boolean> {
    for (const messages of this.messages.values()) {
      const message = messages.find(m => m.id === messageId);
      if (message && message.senderId === userId && message.type === 'text') {
        message.content = this.sanitizeContent(newContent);
        message.edited = true;
        message.editedAt = new Date();
        return true;
      }
    }
    return false;
  }

  async deleteMessage(messageId: string, userId: string): Promise<boolean> {
    for (const [conversationId, messages] of this.messages.entries()) {
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex !== -1) {
        const message = messages[messageIndex];
        if (message.senderId === userId) {
          messages.splice(messageIndex, 1);
          
          // Update last message if this was the last one
          const conversation = this.conversations.get(conversationId);
          if (conversation && conversation.lastMessage?.id === messageId) {
            conversation.lastMessage = messages[messages.length - 1];
          }
          
          return true;
        }
      }
    }
    return false;
  }

  async setTyping(conversationId: string, userId: string, isTyping: boolean): Promise<void> {
    if (!this.typingUsers.has(conversationId)) {
      this.typingUsers.set(conversationId, new Set());
    }

    const typingSet = this.typingUsers.get(conversationId)!;
    
    if (isTyping) {
      typingSet.add(userId);
      // Auto-remove after 3 seconds
      setTimeout(() => {
        typingSet.delete(userId);
      }, 3000);
    } else {
      typingSet.delete(userId);
    }
  }

  async getTypingUsers(conversationId: string, excludeUserId: string): Promise<string[]> {
    const typingSet = this.typingUsers.get(conversationId);
    if (!typingSet) return [];
    
    return Array.from(typingSet).filter(userId => userId !== excludeUserId);
  }

  async archiveConversation(conversationId: string, userId: string): Promise<boolean> {
    const conversation = this.conversations.get(conversationId);
    if (conversation && conversation.participants.includes(userId)) {
      conversation.archived = true;
      return true;
    }
    return false;
  }

  async searchMessages(
    userId: string,
    query: string,
    conversationId?: string
  ): Promise<Message[]> {
    const results: Message[] = [];
    const searchTerm = query.toLowerCase();

    for (const [convId, messages] of this.messages.entries()) {
      if (conversationId && convId !== conversationId) continue;
      
      const conversation = this.conversations.get(convId);
      if (!conversation || !conversation.participants.includes(userId)) continue;

      const matchingMessages = messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm) ||
        message.fileName?.toLowerCase().includes(searchTerm)
      );

      results.push(...matchingMessages);
    }

    return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getUnreadCount(userId: string): Promise<number> {
    let totalUnread = 0;
    
    for (const conversation of this.conversations.values()) {
      if (conversation.participants.includes(userId)) {
        totalUnread += conversation.unreadCount[userId] || 0;
      }
    }

    return totalUnread;
  }

  async getResponseTime(doctorId: string, days: number = 7): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const responseTimes: number[] = [];

    for (const [conversationId, messages] of this.messages.entries()) {
      const conversation = this.conversations.get(conversationId);
      if (!conversation || !conversation.participants.includes(doctorId)) continue;

      // Find patient messages followed by doctor responses
      for (let i = 0; i < messages.length - 1; i++) {
        const patientMessage = messages[i];
        const doctorMessage = messages[i + 1];

        if (
          patientMessage.senderId !== doctorId &&
          doctorMessage.senderId === doctorId &&
          patientMessage.timestamp >= cutoffDate
        ) {
          const responseTime = doctorMessage.timestamp.getTime() - patientMessage.timestamp.getTime();
          responseTimes.push(responseTime);
        }
      }
    }

    if (responseTimes.length === 0) return 0;

    const averageResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    return Math.round(averageResponseTime / (1000 * 60)); // Convert to minutes
  }

  private validateFile(file: File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not allowed');
    }
  }

  private async uploadFile(file: File): Promise<string> {
    // Simulate file upload
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://storage.sal-lmjarab.ma/files/${Date.now()}_${file.name}`);
      }, 1000);
    });
  }

  private getMessageTypeFromFile(attachmentType: string): 'file' | 'image' | 'document' {
    switch (attachmentType) {
      case 'image':
        return 'image';
      case 'medical-record':
      case 'prescription':
      case 'lab-result':
      case 'document':
        return 'document';
      default:
        return 'file';
    }
  }

  private sanitizeContent(content: string): string {
    // Remove potential XSS and sanitize content
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }

  private async sendNotification(message: Message): Promise<void> {
    // In production, this would send push notifications, emails, etc.
    console.log(`Notification sent for message ${message.id}`);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const messagingService = new MessagingService();