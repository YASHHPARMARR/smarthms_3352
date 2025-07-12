import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, icon, trend, trendValue, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success", 
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error"
  };

  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-moderate transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <Icon name={trendIcon} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default KPICard;