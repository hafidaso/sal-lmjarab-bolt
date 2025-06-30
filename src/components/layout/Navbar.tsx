import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Moon, Sun, Globe, User, LogOut, Settings, Bell, Calendar, FileText, MessageCircle, Shield, Users, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationDropdown from '../ui/NotificationDropdown';
import { usePatientNotifications } from '../../hooks/usePatientNotifications';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = usePatientNotifications();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu') && !target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'ar', name: t('language.arabic'), flag: '🇲🇦' },
  ];

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/search', label: t('nav.search') },
    { path: '/pharmacy', label: t('nav.pharmacies') },
    { path: '/find-facility', label: t('nav.findFacility') },
    { path: '/top-hospitals', label: t('nav.topHospitals') },
    { path: '/hospital-comparison', label: t('nav.hospitalComparison') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/about-us', label: t('nav.aboutUs') },
  ];

  // Role-specific dashboard links
  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'patient':
        return '/patient/dashboard';
      case 'provider':
        return '/provider/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  // Role-specific menu items
  const getUserMenuItems = () => {
    if (!user) return [];
    
    const commonItems = [
      { icon: User, label: 'Profile', path: `/${user.role}/profile` },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];
    
    switch (user.role) {
      case 'patient':
        return [
          ...commonItems,
          { icon: Calendar, label: 'Appointments', path: '/patient/communication?tab=appointments' },
          { icon: FileText, label: 'Medical Records', path: '/patient/communication?tab=records' },
          { icon: MessageCircle, label: 'Messages', path: '/patient/communication?tab=messages' },
        ];
      case 'provider':
        return [
          ...commonItems,
          { icon: Calendar, label: 'Appointments', path: '/provider/profile' },
          { icon: Users, label: 'Patients', path: '/provider/profile' },
          { icon: MessageCircle, label: 'Messages', path: '/provider/profile' },
          { icon: Star, label: 'Reviews', path: '/provider/reviews' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'User Management', path: '/admin/accounts' },
          { icon: Shield, label: 'Moderation', path: '/admin/moderation' },
          { icon: Settings, label: 'System Settings', path: '/admin/dashboard' },
        ];
      default:
        return commonItems;
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Sal-lmjarab
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="relative focus:outline-none"
                aria-label="Notifications"
                onClick={() => setIsNotificationOpen((open) => !open)}
              >
                <Bell className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationDropdown open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-menu-button flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <span>{user.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="user-menu absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 capitalize">
                            {user.role}
                          </span>
                        </div>
                      </div>
                      
                      {/* Dashboard link */}
                      <Link
                        to={getDashboardLink() || '/'}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('nav.dashboard')}
                      </Link>
                      
                      {/* Role-specific menu items */}
                      {getUserMenuItems().map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.label}
                        </Link>
                      ))}
                      
                      {/* Logout button */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register/select"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Notification Bell */}
            {user && (
              <div className="relative">
                <button
                  className="relative p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Notifications"
                  onClick={() => setIsNotificationOpen((open) => !open)}
                >
                  <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <NotificationDropdown open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {user ? (
                  <>
                    {/* Notifications */}
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <span className="text-base font-medium text-gray-700 dark:text-gray-300">Notifications</span>
                        </div>
                        {unreadCount > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to={getDashboardLink() || '/'}
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register/select"
                      className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;