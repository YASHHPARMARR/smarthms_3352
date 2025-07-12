import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const OrderDetails = ({ order, onStatusUpdate, onNotesUpdate, onAssignStaff }) => {
  const [notes, setNotes] = useState(order?.internalNotes || '');
  const [showAssignModal, setShowAssignModal] = useState(false);

  if (!order) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="ClipboardList" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select an Order</h3>
          <p className="text-muted-foreground">Choose an order from the queue to view details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    onNotesUpdate(order.id, value);
  };

  const availableStaff = [
    { id: 1, name: 'Maria Rodriguez', role: 'Kitchen Staff', available: true },
    { id: 2, name: 'James Wilson', role: 'Delivery Staff', available: true },
    { id: 3, name: 'Sarah Chen', role: 'Kitchen Staff', available: false },
    { id: 4, name: 'Michael Brown', role: 'Delivery Staff', available: true }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-foreground">Order #{order.id}</h2>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Contact Guest
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Printer" size={16} className="mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Guest Information */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Guest Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Guest Name</span>
              </div>
              <p className="font-medium text-foreground">{order.guestName}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Room Number</span>
              </div>
              <p className="font-medium text-foreground">Room {order.roomNumber}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Contact</span>
              </div>
              <p className="font-medium text-foreground">{order.guestPhone}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Order Time</span>
              </div>
              <p className="font-medium text-foreground">
                {formatDate(order.orderTime)} at {formatTime(order.orderTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.customizations && (
                    <p className="text-xs text-primary mt-1">
                      Customizations: {item.customizations}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  <p className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Total Amount</span>
              <span className="text-lg font-semibold text-foreground">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Special Instructions</h3>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">{order.specialInstructions}</p>
            </div>
          </div>
        )}

        {/* Staff Assignment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Staff Assignment</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAssignModal(true)}
            >
              <Icon name="UserPlus" size={16} className="mr-2" />
              Assign Staff
            </Button>
          </div>
          {order.assignedStaff ? (
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Icon name="UserCheck" size={20} className="text-green-600" />
              <div>
                <p className="font-medium text-green-800">{order.assignedStaff}</p>
                <p className="text-sm text-green-600">Assigned to this order</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <Icon name="UserX" size={20} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-700">No staff assigned</p>
                <p className="text-sm text-gray-500">Click assign staff to select a team member</p>
              </div>
            </div>
          )}
        </div>

        {/* Internal Notes */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Internal Notes</h3>
          <Input
            type="text"
            placeholder="Add internal notes for kitchen staff..."
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border">
          {order.status === 'new' && (
            <Button
              variant="default"
              onClick={() => onStatusUpdate(order.id, 'preparing')}
              className="flex-1"
            >
              <Icon name="ChefHat" size={16} className="mr-2" />
              Start Preparation
            </Button>
          )}
          {order.status === 'preparing' && (
            <Button
              variant="default"
              onClick={() => onStatusUpdate(order.id, 'ready')}
              className="flex-1"
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Mark as Ready
            </Button>
          )}
          {order.status === 'ready' && (
            <Button
              variant="default"
              onClick={() => onStatusUpdate(order.id, 'delivered')}
              className="flex-1"
            >
              <Icon name="Truck" size={16} className="mr-2" />
              Mark as Delivered
            </Button>
          )}
          {order.status !== 'delivered' && (
            <Button variant="destructive" className="flex-1">
              <Icon name="X" size={16} className="mr-2" />
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      {/* Staff Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg w-full max-w-md mx-4">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Assign Staff</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAssignModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {availableStaff.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => {
                    onAssignStaff(order.id, staff.name);
                    setShowAssignModal(false);
                  }}
                  disabled={!staff.available}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                    staff.available
                      ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' :'border-border bg-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={staff.available ? "UserCheck" : "UserX"} 
                      size={20} 
                      className={staff.available ? "text-green-600" : "text-gray-400"} 
                    />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    staff.available 
                      ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600'
                  }`}>
                    {staff.available ? 'Available' : 'Busy'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;