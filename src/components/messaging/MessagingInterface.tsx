import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, FileText, Mic, MicOff, MoreVertical, Search, Phone, Video, Archive, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { messagingService, Message, Conversation, FileAttachment } from '../../services/messagingService';
import { useAuth } from '../../contexts/AuthContext';

interface MessagingInterfaceProps {
  conversationId?: string;
  recipientId?: string;
  recipientName?: string;
  recipientType?: 'doctor' | 'patient' | 'support';
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({
  conversationId: initialConversationId,
  recipientId,
  recipientName,
  recipientType = 'doctor'
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (initialConversationId) {
      loadConversation(initialConversationId);
    } else if (recipientId && user) {
      createOrFindConversation();
    }
  }, [initialConversationId, recipientId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      loadMessages();
      const interval = setInterval(checkForTyping, 1000);
      return () => clearInterval(interval);
    }
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    if (!user) return;
    
    try {
      const userConversations = await messagingService.getConversations(user.id);
      setConversations(userConversations);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
        await loadMessages();
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const createOrFindConversation = async () => {
    if (!user || !recipientId) return;

    try {
      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        conv.participants.includes(recipientId)
      );

      if (existingConversation) {
        setActiveConversation(existingConversation);
      } else {
        // Create new conversation
        const newConversation = await messagingService.createConversation(
          [user.id, recipientId],
          recipientType === 'doctor' ? 'doctor-patient' : 'patient-support',
          {
            patientName: recipientType === 'doctor' ? user.name : recipientName,
            doctorName: recipientType === 'doctor' ? recipientName : user.name
          }
        );
        
        setActiveConversation(newConversation);
        setConversations(prev => [newConversation, ...prev]);
      }
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const loadMessages = async () => {
    if (!activeConversation || !user) return;

    try {
      const conversationMessages = await messagingService.getMessages(
        activeConversation.id,
        user.id,
        50,
        0
      );
      setMessages(conversationMessages);
      
      // Mark messages as read
      await messagingService.markAsRead(activeConversation.id, user.id);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const checkForTyping = async () => {
    if (!activeConversation || !user) return;

    try {
      const typing = await messagingService.getTypingUsers(activeConversation.id, user.id);
      setTypingUsers(typing);
    } catch (error) {
      console.error('Failed to check typing status:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation || !user || sending) return;

    setSending(true);
    try {
      const message = await messagingService.sendMessage(
        activeConversation.id,
        user.id,
        newMessage.trim()
      );

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Stop typing indicator
      await messagingService.setTyping(activeConversation.id, user.id, false);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeConversation || !user) return;

    try {
      const attachment: FileAttachment = {
        file,
        type: getFileType(file),
        description: `Shared ${file.name}`
      };

      const message = await messagingService.sendFileMessage(
        activeConversation.id,
        user.id,
        attachment
      );

      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Failed to send file:', error);
      alert('Failed to send file. Please try again.');
    }
  };

  const getFileType = (file: File): 'medical-record' | 'prescription' | 'lab-result' | 'image' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'document';
    return 'document';
  };

  const handleTyping = async (typing: boolean) => {
    if (!activeConversation || !user) return;

    setIsTyping(typing);
    await messagingService.setTyping(activeConversation.id, user.id, typing);

    if (typing) {
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing after 3 seconds
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        messagingService.setTyping(activeConversation.id, user.id, false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);
    
    if (now.toDateString() === messageDate.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const renderMessage = (message: Message) => {
    const isOwn = message.senderId === user?.id;
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isOwn
              ? 'bg-primary-500 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
          }`}
        >
          {message.type === 'text' ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : message.type === 'image' ? (
            <div>
              <img
                src={message.fileUrl}
                alt={message.fileName}
                className="max-w-full h-auto rounded-lg mb-2"
              />
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <div>
                <p className="font-medium">{message.fileName}</p>
                {message.content && <p className="text-sm opacity-75">{message.content}</p>}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">
              {formatMessageTime(message.timestamp)}
            </span>
            {message.edited && (
              <span className="text-xs opacity-75">edited</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Messages
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  activeConversation?.id === conversation.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {conversation.metadata.doctorName || conversation.metadata.patientName || 'Unknown'}
                  </span>
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatMessageTime(conversation.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
                {conversation.unreadCount[user?.id || ''] > 0 && (
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      {conversation.unreadCount[user?.id || '']} new
                    </span>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {activeConversation.metadata.doctorName || activeConversation.metadata.patientName || 'Unknown'}
                </h4>
                {typingUsers.length > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Typing...
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                  Start a conversation by sending a message
                </div>
              ) : (
                messages.map(renderMessage)
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end space-x-2">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <AnimatePresence>
                    {showAttachmentMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2"
                      >
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachmentMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
                        >
                          <Image className="w-4 h-4" />
                          <span>Image</span>
                        </button>
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachmentMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Document</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping(e.target.value.length > 0);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    rows={1}
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface;