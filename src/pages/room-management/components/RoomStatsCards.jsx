import React from 'react';
import Icon from '../../../components/AppIcon';

const RoomStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Rooms',
      value: stats.total,
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Available',
      value: stats.available,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Occupied',
      value: stats.occupied,
      icon: 'Users',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Maintenance',
      value: stats.maintenance,
      icon: 'Wrench',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Cleaning',
      value: stats.cleaning,
      icon: 'Sparkles',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-moderate transition-smooth"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomStatsCards;