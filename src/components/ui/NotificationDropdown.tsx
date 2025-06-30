import React, { useRef } from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';
import { usePatientNotifications } from '../../hooks/usePatientNotifications';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationDropdownProps {
  open: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ open, onClose }) => {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    error
  } = usePatientNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <button
              className="text-xs text-primary-600 hover:underline disabled:opacity-50 whitespace-nowrap"
              onClick={markAllAsRead}
              disabled={unreadCount === 0 || loading}
            >
              Mark All as Read
            </button>
          </div>
          <div className="max-h-80 sm:max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500 text-sm">{error.message}</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!n.read ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}
                  onClick={() => !n.read && markAsRead(n.id)}
                >
                  {n.read ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Bell className="w-4 h-4 text-primary-500 mt-0.5 animate-pulse flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                      {n.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      {n.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {n.created_at ? new Date(n.created_at).toLocaleString() : ''}
                    </div>
                  </div>
                  {!n.read && (
                    <span className="ml-2 text-xs text-primary-600 dark:text-primary-400 font-semibold flex-shrink-0">New</span>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown; 