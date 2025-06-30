import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, FileText, User, Search, Filter, Clock, CheckCircle, X, Download, Eye, AlertCircle, Lock, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    id: string;
    name: string;
    type: 'image' | 'document' | 'lab-result';
    url: string;
    size: string;
  }[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'doctor' | 'staff' | 'pharmacy';
  participantAvatar?: string;
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
}

const PatientMessageCenter: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: 'doctor-1',
      participantName: 'Dr. Ahmed Bennani',
      participantRole: 'doctor',
      participantAvatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: {
        content: 'Your test results look good. Let\'s discuss at your next appointment.',
        timestamp: new Date('2025-01-10T14:30:00'),
        senderId: 'doctor-1'
      },
      unreadCount: 1
    },
    {
      id: '2',
      participantId: 'doctor-2',
      participantName: 'Dr. Fatima Alaoui',
      participantRole: 'doctor',
      participantAvatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: {
        content: 'Please remember to apply the cream twice daily.',
        timestamp: new Date('2025-01-09T16:45:00'),
        senderId: 'doctor-2'
      },
      unreadCount: 0
    },
    {
      id: '3',
      participantId: 'staff-1',
      participantName: 'Clinic Reception',
      participantRole: 'staff',
      lastMessage: {
        content: 'Your appointment has been confirmed for January 15th at 10:00 AM.',
        timestamp: new Date('2025-01-08T11:20:00'),
        senderId: 'staff-1'
      },
      unreadCount: 0
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id);
      
      // Mark messages as read
      if (activeConversation.unreadCount > 0) {
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, unreadCount: 0 }
              : conv
          )
        );
      }
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = (conversationId: string) => {
    setIsLoading(true);
    
    // Simulate API call to load messages
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: user?.id || 'patient-1',
          receiverId: conversationId === '1' ? 'doctor-1' : conversationId === '2' ? 'doctor-2' : 'staff-1',
          content: 'Hello doctor, I have a question about my medication.',
          timestamp: new Date('2025-01-10T14:25:00'),
          read: true
        },
        {
          id: '2',
          senderId: conversationId === '1' ? 'doctor-1' : conversationId === '2' ? 'doctor-2' : 'staff-1',
          receiverId: user?.id || 'patient-1',
          content: conversationId === '1' 
            ? 'Your test results look good. Let\'s discuss at your next appointment.' 
            : conversationId === '2'
            ? 'Please remember to apply the cream twice daily.'
            : 'Your appointment has been confirmed for January 15th at 10:00 AM.',
          timestamp: new Date(
            conversationId === '1' 
              ? '2025-01-10T14:30:00' 
              : conversationId === '2'
              ? '2025-01-09T16:45:00'
              : '2025-01-08T11:20:00'
          ),
          read: conversationId !== '1'
        }
      ];
      
      if (conversationId === '1') {
        mockMessages.push({
          id: '3',
          senderId: 'doctor-1',
          receiverId: user?.id || 'patient-1',
          content: 'I\'ve also attached your latest lab results for your reference.',
          timestamp: new Date('2025-01-10T14:32:00'),
          read: false,
          attachments: [
            {
              id: 'att-1',
              name: 'Lab Results - January 2025.pdf',
              type: 'lab-result',
              url: '#',
              size: '1.2 MB'
            }
          ]
        });
      }
      
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    if (!activeConversation) return;

    const newMessageObj: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'patient-1',
      receiverId: activeConversation.participantId,
      content: newMessage.trim(),
      timestamp: new Date(),
      read: false,
      attachments: attachments.length > 0 
        ? attachments.map((file, index) => ({
            id: `att-${Date.now()}-${index}`,
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 'document',
            url: URL.createObjectURL(file),
            size: formatFileSize(file.size)
          }))
        : undefined
    };

    setMessages(prev => [...prev, newMessageObj]);
    
    // Update conversation with last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              lastMessage: {
                content: newMessage.trim() || 'Sent an attachment',
                timestamp: new Date(),
                senderId: user?.id || 'patient-1'
              }
            }
          : conv
      )
    );
    
    setNewMessage('');
    setAttachments([]);
    setShowAttachmentMenu(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Check file size (limit to 10MB per file)
      const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some files exceed the 10MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }
      
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatMessageTime = (date: Date): string => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="flex h-[700px]">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Messages
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    activeConversation?.id === conversation.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {conversation.participantAvatar ? (
                      <img
                        src={conversation.participantAvatar}
                        alt={conversation.participantName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {conversation.participantName}
                        </h4>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage.senderId === user?.id ? 'You: ' : ''}
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="mt-1 flex justify-end">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-500 text-white text-xs">
                        {conversation.unreadCount}
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
                <div className="flex items-center space-x-3">
                  {activeConversation.participantAvatar ? (
                    <img
                      src={activeConversation.participantAvatar}
                      alt={activeConversation.participantName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activeConversation.participantName}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {activeConversation.participantRole}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <Clock className="w-12 h-12 mx-auto mb-2" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation by sending a message</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwn = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isOwn
                              ? 'bg-primary-500 text-white'
                              : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                          }`}
                        >
                          {message.content && (
                            <p className="mb-2">{message.content}</p>
                          )}
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="space-y-2 mt-2">
                              {message.attachments.map((attachment) => (
                                <div 
                                  key={attachment.id}
                                  className={`flex items-center space-x-2 p-2 rounded ${
                                    isOwn
                                      ? 'bg-primary-400'
                                      : 'bg-gray-100 dark:bg-gray-700'
                                  }`}
                                >
                                  {attachment.type === 'image' ? (
                                    <>
                                      <Image className="w-4 h-4" />
                                      <button 
                                        className="text-sm hover:underline flex-1 text-left truncate"
                                        onClick={() => setShowImagePreview(attachment.url)}
                                      >
                                        {attachment.name}
                                      </button>
                                    </>
                                  ) : attachment.type === 'lab-result' ? (
                                    <>
                                      <FileText className="w-4 h-4" />
                                      <span className="text-sm flex-1 truncate">{attachment.name}</span>
                                    </>
                                  ) : (
                                    <>
                                      <FileText className="w-4 h-4" />
                                      <span className="text-sm flex-1 truncate">{attachment.name}</span>
                                    </>
                                  )}
                                  <span className="text-xs">{attachment.size}</span>
                                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                    <Download className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="text-right mt-1">
                            <span className={`text-xs ${isOwn ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'}`}>
                              {formatMessageTime(message.timestamp)}
                              {isOwn && message.read && (
                                <CheckCircle className="w-3 h-3 ml-1 inline" />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {attachments.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-2 rounded"
                      >
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-gray-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                          {file.name}
                        </span>
                        <button 
                          onClick={() => removeAttachment(index)}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <AnimatePresence>
                      {showAttachmentMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 w-48"
                        >
                          <button
                            onClick={() => {
                              fileInputRef.current?.click();
                              setShowAttachmentMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                          >
                            <Image className="w-4 h-4" />
                            <span>Image</span>
                          </button>
                          <button
                            onClick={() => {
                              fileInputRef.current?.click();
                              setShowAttachmentMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Document</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && attachments.length === 0}
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  multiple
                />
                
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>HIPAA compliant secure messaging</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImagePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setShowImagePreview(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={showImagePreview}
                alt="Preview"
                className="max-w-full max-h-[80vh] mx-auto rounded-lg"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientMessageCenter;