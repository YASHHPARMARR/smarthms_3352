import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StaffPanel = ({ onStaffAssign, onInventoryAlert }) => {
  const [activeTab, setActiveTab] = useState('staff');

  const staffMembers = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      role: 'Kitchen Staff',
      status: 'available',
      currentTask: null,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      completedToday: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: 'James Wilson',
      role: 'Delivery Staff',
      status: 'busy',
      currentTask: 'Delivering to Room 305',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      completedToday: 8,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Sarah Chen',
      role: 'Kitchen Staff',
      status: 'busy',
      currentTask: 'Preparing Order #1234',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      completedToday: 15,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Michael Brown',
      role: 'Delivery Staff',
      status: 'available',
      currentTask: null,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      completedToday: 6,
      rating: 4.6
    }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 5,
      minStock: 10,
      unit: 'kg',
      status: 'low',
      lastUpdated: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      name: 'Fresh Basil',
      category: 'Herbs',
      currentStock: 2,
      minStock: 5,
      unit: 'bunches',
      status: 'critical',
      lastUpdated: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      name: 'Mozzarella Cheese',
      category: 'Dairy',
      currentStock: 15,
      minStock: 8,
      unit: 'blocks',
      status: 'good',
      lastUpdated: new Date(Date.now() - 7200000)
    },
    {
      id: 4,
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 3,
      minStock: 12,
      unit: 'kg',
      status: 'low',
      lastUpdated: new Date(Date.now() - 5400000)
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInventoryStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-1">
          <Button
            variant={activeTab === 'staff' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('staff')}
            className="flex-1"
          >
            <Icon name="Users" size={16} className="mr-2" />
            Staff
          </Button>
          <Button
            variant={activeTab === 'inventory' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('inventory')}
            className="flex-1"
          >
            <Icon name="Package" size={16} className="mr-2" />
            Inventory
          </Button>
        </div>
      </div>

      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {activeTab === 'staff' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Team Status</h3>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{staff.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(staff.status)}`}>
                          {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                      {staff.currentTask && (
                        <p className="text-xs text-primary mt-1">{staff.currentTask}</p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="CheckCircle" size={12} className="text-green-600" />
                            <span className="text-xs text-muted-foreground">{staff.completedToday}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-yellow-500" />
                            <span className="text-xs text-muted-foreground">{staff.rating}</span>
                          </div>
                        </div>
                        {staff.status === 'available' && (
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => onStaffAssign(staff)}
                          >
                            Assign
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Performance Summary</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Avg. Rating</span>
                  </div>
                  <p className="text-lg font-semibold text-green-800 mt-1">4.75</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Avg. Time</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-800 mt-1">18m</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Inventory Alerts</h3>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={14} className="mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {inventoryItems.map((item) => (
                <div key={item.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getInventoryStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Current Stock</span>
                          <span className="text-sm font-medium text-foreground">
                            {item.currentStock} {item.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Min Required</span>
                          <span className="text-sm text-muted-foreground">
                            {item.minStock} {item.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Last Updated</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(item.lastUpdated)}
                          </span>
                        </div>
                      </div>

                      {(item.status === 'low' || item.status === 'critical') && (
                        <div className="mt-2 flex space-x-2">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => onInventoryAlert(item)}
                            className="flex-1"
                          >
                            <Icon name="ShoppingCart" size={12} className="mr-1" />
                            Reorder
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            className="flex-1"
                          >
                            <Icon name="AlertTriangle" size={12} className="mr-1" />
                            Alert Chef
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-red-600" />
                    <span className="text-sm font-medium text-red-800">Critical Items</span>
                  </div>
                  <p className="text-lg font-semibold text-red-800 mt-1">
                    {inventoryItems.filter(item => item.status === 'critical').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Low Stock</span>
                  </div>
                  <p className="text-lg font-semibold text-yellow-800 mt-1">
                    {inventoryItems.filter(item => item.status === 'low').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPanel;