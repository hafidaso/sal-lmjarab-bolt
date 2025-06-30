import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Calendar,
  Search,
  FileText,
  Star,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  chatbotService,
  ChatMessage,
  ChatContext,
} from '../../services/chatbotService';
import { mockDoctors } from '../../data/mockDoctors';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

const EnhancedChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Date.now().toString());
  const [context, setContext] = useState<ChatContext>({
    sessionId,
    language: 'en',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const quickActions: QuickAction[] = [
    {
      id: 'find-doctor',
      label: 'Find a Doctor',
      icon: <User className="w-5 h-5" />,
      action: () => handleSendMessage('find doctor near me'),
    },
    {
      id: 'book-appointment',
      label: 'Book an Appointment',
      icon: <Calendar className="w-5 h-5" />,
      action: () => handleSendMessage('book appointment'),
    },
    {
      id: 'symptom-guidance',
      label: 'Symptom Check',
      icon: <FileText className="w-5 h-5" />,
      action: () => handleSendMessage('I have anxiety'),
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: <AlertTriangle className="w-5 h-5" />,
      action: () => handleSendMessage('emergency help'),
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setContext((prev) => ({ ...prev, language }));
  }, [language]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date(),
        intent: 'greeting',
        confidence: 1.0,
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language, t]);

  const getWelcomeMessage = () => {
    return `👋 Hello! I'm your healthcare assistant. I can help you with:

🏥 **Find Doctors** - Search by specialty, location, or symptoms
📅 **Book Appointments** - Easy scheduling with step-by-step guidance
🧠 **Symptom Guidance** - Get recommendations for specialists
🚨 **Emergency Info** - Emergency numbers and when to seek urgent care

What would you like help with today?`;
  };

  const formatDoctorList = (doctors: typeof mockDoctors) => {
    if (!doctors.length) return 'No doctors available at the moment.';
    return doctors.slice(0, 3).map(doc =>
      `• ${doc.name} (${doc.specialty}) - ${doc.location.city} | Next: ${new Date(doc.availability.nextAvailable).toLocaleString()}\n`
    ).join('');
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Process the message with the chatbot service
      const response = await chatbotService.processMessage(text, context);

      // Add typing animation
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 1000)
      );

      setMessages((prev) => [...prev, response]);

      if (response.intent === 'emergency') {
        handleEmergencyResponse();
      }

      if (response.intent === 'find_doctor') {
        const doctorList = formatDoctorList(mockDoctors);
        const doctorListMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          text: `Here are some available doctors near you:\n${doctorList}`,
          sender: 'bot',
          timestamp: new Date(),
          intent: 'doctor_list',
          confidence: 1.0,
        };
        setMessages((prev) => [...prev, doctorListMessage]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmergencyResponse = () => {
    const emergencyMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      text: '🚨 **Emergency Contacts:**\n\n• Emergency: 15\n• Ambulance: 15\n• Police: 19\n\nIf you are experiencing a medical emergency, please call 15 immediately or go to the nearest emergency room.',
      sender: 'bot',
      timestamp: new Date(),
      intent: 'emergency',
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, emergencyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (message: ChatMessage) => {
    if (message.sender === 'user') return <User className="w-4 h-4" />;

    switch (message.intent) {
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'greeting':
        return <Bot className="w-4 h-4 text-primary-500" />;
      case 'find_doctor':
        return <User className="w-4 h-4 text-primary-500" />;
      case 'book_appointment':
        return <Calendar className="w-4 h-4 text-primary-500" />;
      default:
        return <Bot className="w-4 h-4 text-primary-500" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-full max-w-md sm:w-96 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300"
            style={{ minHeight: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-500 p-5 flex items-center justify-between rounded-t-3xl shadow-md">
              <div className="flex items-center space-x-3">
                <Bot className="w-7 h-7 text-white drop-shadow" />
                <h3 className="text-white font-bold text-lg tracking-wide drop-shadow">Healthcare Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary-400 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.action()}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium shadow hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900" style={{ minHeight: '300px' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'flex-row-reverse space-x-reverse'
                        : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow ${
                        message.sender === 'user'
                          ? 'bg-primary-100 dark:bg-primary-900'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {getMessageIcon(message)}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 shadow text-sm break-words ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow">
                      <Bot className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 shadow">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 shadow"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full shadow transition-colors"
                  title="Send"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default EnhancedChatBot;