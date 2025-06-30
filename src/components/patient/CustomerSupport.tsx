import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Search, Clock, CheckCircle, AlertTriangle, Bot, User, Send, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdate: string;
  category: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const CustomerSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'tickets' | 'faq'>('chat');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TK-001',
      subject: 'Unable to book appointment',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2025-06-20',
      lastUpdate: '2025-01-11',
      category: 'Booking Issues'
    },
    {
      id: 'TK-002',
      subject: 'Payment processing error',
      status: 'resolved',
      priority: 'high',
      createdAt: '2025-06-23',
      lastUpdate: '2025-01-09',
      category: 'Payment'
    }
  ]);

  const [faqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by searching for a doctor, selecting an available time slot, and confirming your booking. You\'ll receive a confirmation email and SMS.',
      category: 'Booking',
      helpful: 45
    },
    {
      id: '2',
      question: 'What insurance plans do you accept?',
      answer: 'We accept CNSS, RAMED, and most private insurance plans. You can filter search results by insurance type to find providers that accept your plan.',
      category: 'Insurance',
      helpful: 38
    },
    {
      id: '3',
      question: 'How do I cancel or reschedule an appointment?',
      answer: 'You can cancel or reschedule appointments up to 24 hours before the scheduled time through your patient dashboard or by contacting the healthcare provider directly.',
      category: 'Booking',
      helpful: 32
    },
    {
      id: '4',
      question: 'Is my medical information secure?',
      answer: 'Yes, all medical information is encrypted with 256-bit encryption and stored securely. We are fully HIPAA compliant and follow strict privacy protocols.',
      category: 'Privacy',
      helpful: 28
    },
    {
      id: '5',
      question: 'How do I access my medical records?',
      answer: 'You can access your medical records through the Medical Records Portal in your patient dashboard. All records are securely encrypted and available 24/7.',
      category: 'Medical Records',
      helpful: 25
    }
  ]);

  const emergencyContacts = [
    { service: 'Emergency Services', number: '15', description: 'Life-threatening emergencies' },
    { service: 'SAMU', number: '141', description: 'Medical emergency ambulance' },
    { service: 'Police', number: '19', description: 'Police emergency' },
    { service: 'Fire Department', number: '15', description: 'Fire and rescue services' }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: 'Thank you for your message. I\'m processing your request and will provide assistance shortly. If this is urgent, please consider contacting our live support.',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Support
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We're here to help you 24/7. Get assistance with any questions or issues.
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-bold text-red-600 text-lg">{contact.number}</span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">{contact.service}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">24/7 AI Chat</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Get instant answers from our AI assistant
          </p>
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Support</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Chat with our support team (9 AM - 6 PM)
          </p>
          <button
            onClick={() => setShowLiveChat(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Connect Now
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Support Ticket</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Submit a detailed support request
          </p>
          <button
            onClick={() => setActiveTab('tickets')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Ticket
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'chat', label: 'AI Chat', icon: Bot },
              { id: 'tickets', label: 'Support Tickets', icon: Mail },
              { id: 'faq', label: 'FAQ', icon: Search }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'chat' | 'tickets' | 'faq')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'bot' && <Bot className="w-4 h-4" />}
                        {message.sender === 'user' && <User className="w-4 h-4" />}
                        <span className="text-xs opacity-75">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Support Tickets
                </h3>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Create New Ticket
                </button>
              </div>
              
              {tickets.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No support tickets found
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {ticket.subject}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ticket ID: {ticket.id}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>Category: {ticket.category}</div>
                        <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                        <div>Last Update: {new Date(ticket.lastUpdate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h4>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {faq.answer}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Helpful ({faq.helpful})</span>
                      </button>
                      <span className="text-gray-500 dark:text-gray-400">
                        Was this helpful?
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Chat Modal */}
      <AnimatePresence>
        {showLiveChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Connect to Live Support
                  </h3>
                  <button
                    onClick={() => setShowLiveChat(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Support agents are online</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You'll be connected to the next available support agent. Average wait time is less than 2 minutes.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowLiveChat(false);
                        alert('Connecting you to a live agent...');
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Connect Now
                    </button>
                    <button
                      onClick={() => setShowLiveChat(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerSupport;