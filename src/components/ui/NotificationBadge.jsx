import React from 'react';

const NotificationBadge = ({ count, className = '', size = 'default' }) => {
  if (!count || count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();
  
  const sizeClasses = {
    sm: 'h-4 min-w-4 text-xs px-1',
    default: 'h-5 min-w-5 text-xs px-1.5',
    lg: 'h-6 min-w-6 text-sm px-2'
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center 
        ${sizeClasses[size]} 
        bg-error text-error-foreground 
        rounded-full font-medium 
        animate-bounce-subtle
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;