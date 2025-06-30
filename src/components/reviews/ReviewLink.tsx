import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewLinkProps {
  doctorId: string;
  doctorName: string;
  variant?: 'button' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

const ReviewLink: React.FC<ReviewLinkProps> = ({
  doctorId,
  doctorName,
  variant = 'button',
  size = 'md',
  className = '',
  showIcon = true,
  children
}) => {
  const { user } = useAuth();

  if (!user) {
    return null; // Don't show review link if user is not logged in
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    button: 'bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors',
    link: 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline',
    icon: 'text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
  };

  const defaultText = children || 'Review This Doctor';

  return (
    <Link
      to={`/doctor/${doctorId}/review`}
      className={`inline-flex items-center space-x-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      title={`Review Dr. ${doctorName}`}
    >
      {showIcon && (
        variant === 'icon' ? (
          <Star className="w-4 h-4" />
        ) : (
          <MessageCircle className="w-4 h-4" />
        )
      )}
      <span>{defaultText}</span>
    </Link>
  );
};

export default ReviewLink; 