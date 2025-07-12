import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ onApprovalAction }) => {
  const pendingItems = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'AC repair in Room 103 - $250',
      priority: 'high',
      requestedBy: 'Sarah Johnson',
      timestamp: '2 hours ago',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      type: 'refund',
      title: 'Refund Request',
      description: 'Guest cancellation - $180',
      priority: 'medium',
      requestedBy: 'Mike Wilson',
      timestamp: '4 hours ago',
      icon: 'DollarSign'
    },
    {
      id: 3,
      type: 'staff',
      title: 'Staff Leave Request',
      description: 'Emma Davis - 3 days vacation',
      priority: 'low',
      requestedBy: 'Emma Davis',
      timestamp: '1 day ago',
      icon: 'Calendar'
    },
    {
      id: 4,
      type: 'discount',
      title: 'Discount Approval',
      description: '20% discount for Room 201',
      priority: 'medium',
      requestedBy: 'Front Desk',
      timestamp: '6 hours ago',
      icon: 'Percent'
    }
  ];

  const priorityConfig = {
    high: { color: 'text-error', bg: 'bg-error/10' },
    medium: { color: 'text-warning', bg: 'bg-warning/10' },
    low: { color: 'text-success', bg: 'bg-success/10' }
  };

  const handleApprove = (item) => {
    onApprovalAction('approve', item);
  };

  const handleReject = (item) => {
    onApprovalAction('reject', item);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
        </div>
        <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
          {pendingItems.length}
        </span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {pendingItems.map((item) => {
          const priorityStyle = priorityConfig[item.priority];
          
          return (
            <div key={item.id} className="p-4 border border-border rounded-lg hover:shadow-subtle transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${priorityStyle.bg}`}>
                    <Icon name={item.icon} size={16} className={priorityStyle.color} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.color}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>By: {item.requestedBy}</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleApprove(item)}
                  iconName="Check"
                  iconPosition="left"
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(item)}
                  iconName="X"
                  iconPosition="left"
                >
                  Reject
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingApprovals;