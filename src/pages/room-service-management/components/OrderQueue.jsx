import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderQueue = ({ orders, selectedOrder, onOrderSelect, onStatusUpdate, onPriorityChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return { icon: 'AlertTriangle', color: 'text-red-500' };
      case 'medium': return { icon: 'Clock', color: 'text-yellow-500' };
      case 'low': return { icon: 'Minus', color: 'text-green-500' };
      default: return { icon: 'Minus', color: 'text-gray-500' };
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedTime = (orderTime, prepTime) => {
    const estimated = new Date(orderTime.getTime() + prepTime * 60000);
    return formatTime(estimated);
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Order Queue</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {orders.filter(o => o.status !== 'delivered').length} Active
            </span>
            <Button variant="ghost" size="icon">
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-2 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {orders.map((order) => {
          const priorityInfo = getPriorityIcon(order.priority);
          const isSelected = selectedOrder?.id === order.id;
          
          return (
            <div
              key={order.id}
              onClick={() => onOrderSelect(order)}
              className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                isSelected 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">#{order.id}</span>
                  <Icon 
                    name={priorityInfo.icon} 
                    size={14} 
                    className={priorityInfo.color} 
                  />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Room {order.roomNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{order.guestName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Ordered: {formatTime(order.orderTime)}
                  </span>
                </div>
                {order.status === 'preparing' && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Timer" size={12} className="text-primary" />
                    <span className="text-sm text-primary font-medium">
                      ETA: {getEstimatedTime(order.orderTime, order.estimatedPrepTime)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                {order.assignedStaff && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="UserCheck" size={12} className="text-green-600" />
                    <span className="text-xs text-green-600">{order.assignedStaff}</span>
                  </div>
                )}
              </div>

              {order.status !== 'delivered' && (
                <div className="mt-2 flex space-x-1">
                  {order.status === 'new' && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(order.id, 'preparing');
                      }}
                      className="flex-1"
                    >
                      Start Prep
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(order.id, 'ready');
                      }}
                      className="flex-1"
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(order.id, 'delivered');
                      }}
                      className="flex-1"
                    >
                      Delivered
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderQueue;