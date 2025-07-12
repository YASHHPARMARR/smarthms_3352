import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'check-in',
      title: 'Guest Check-in',
      description: 'John Smith checked into Room 101',
      timestamp: '2 minutes ago',
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'AC repair needed in Room 103',
      timestamp: '15 minutes ago',
      icon: 'Wrench',
      color: 'text-warning'
    },
    {
      id: 3,
      type: 'room-service',
      title: 'Room Service Order',
      description: 'Breakfast order for Room 201',
      timestamp: '32 minutes ago',
      icon: 'Coffee',
      color: 'text-primary'
    },
    {
      id: 4,
      type: 'check-out',
      title: 'Guest Check-out',
      description: 'Lisa Anderson checked out of Room 205',
      timestamp: '1 hour ago',
      icon: 'UserMinus',
      color: 'text-error'
    },
    {
      id: 5,
      type: 'booking',
      title: 'New Booking',
      description: 'Emma Davis reserved Room 204',
      timestamp: '2 hours ago',
      icon: 'Calendar',
      color: 'text-secondary'
    },
    {
      id: 6,
      type: 'payment',
      title: 'Payment Received',
      description: '$450 payment for Room 302',
      timestamp: '3 hours ago',
      icon: 'CreditCard',
      color: 'text-success'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm">{activity.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
            
            {index < activities.length - 1 && (
              <div className="absolute left-7 mt-8 w-px h-4 bg-border"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;