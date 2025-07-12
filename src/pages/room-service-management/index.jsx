import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import OrderQueue from './components/OrderQueue';
import OrderDetails from './components/OrderDetails';
import StaffPanel from './components/StaffPanel';
import OrderFilters from './components/OrderFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RoomServiceManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    timeRange: 'today'
  });

  // Mock data for orders
  useEffect(() => {
    const mockOrders = [
      {
        id: 'RS001',
        guestName: 'John Smith',
        roomNumber: '305',
        guestPhone: '+1 (555) 123-4567',
        status: 'new',
        priority: 'high',
        orderTime: new Date(Date.now() - 300000), // 5 minutes ago
        estimatedPrepTime: 25,
        totalAmount: 45.50,
        assignedStaff: null,
        internalNotes: '',
        specialInstructions: 'Extra spicy, no onions',
        items: [
          {
            name: 'Grilled Chicken Caesar Salad',
            description: 'Fresh romaine lettuce with grilled chicken breast',
            quantity: 1,
            price: 18.50,
            customizations: 'Extra dressing on the side',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=150'
          },
          {
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with molten center',
            quantity: 2,
            price: 12.00,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150'
          },
          {
            name: 'Fresh Orange Juice',
            description: 'Freshly squeezed orange juice',
            quantity: 1,
            price: 5.50,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=150'
          }
        ]
      },
      {
        id: 'RS002',
        guestName: 'Emily Johnson',
        roomNumber: '412',
        guestPhone: '+1 (555) 987-6543',
        status: 'preparing',
        priority: 'medium',
        orderTime: new Date(Date.now() - 900000), // 15 minutes ago
        estimatedPrepTime: 30,
        totalAmount: 32.75,
        assignedStaff: 'Maria Rodriguez',
        internalNotes: 'Guest has nut allergy - confirmed with kitchen',
        specialInstructions: 'Nut-free preparation required',
        items: [
          {
            name: 'Margherita Pizza',
            description: 'Classic pizza with fresh mozzarella and basil',
            quantity: 1,
            price: 22.00,
            customizations: 'Thin crust, extra basil',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150'
          },
          {
            name: 'Sparkling Water',
            description: 'Premium sparkling mineral water',
            quantity: 2,
            price: 5.75,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=150'
          }
        ]
      },
      {
        id: 'RS003',
        guestName: 'Michael Chen',
        roomNumber: '208',
        guestPhone: '+1 (555) 456-7890',
        status: 'ready',
        priority: 'low',
        orderTime: new Date(Date.now() - 1800000), // 30 minutes ago
        estimatedPrepTime: 20,
        totalAmount: 28.25,
        assignedStaff: 'James Wilson',
        internalNotes: 'Ready for delivery - guest requested ASAP',
        specialInstructions: null,
        items: [
          {
            name: 'Club Sandwich',
            description: 'Triple-decker sandwich with turkey and bacon',
            quantity: 1,
            price: 16.50,
            customizations: 'No mayo, extra lettuce',
            image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=150'
          },
          {
            name: 'French Fries',
            description: 'Crispy golden french fries',
            quantity: 1,
            price: 8.75,
            customizations: 'Extra crispy',
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=150'
          },
          {
            name: 'Iced Tea',
            description: 'Refreshing iced tea with lemon',
            quantity: 1,
            price: 3.00,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150'
          }
        ]
      },
      {
        id: 'RS004',
        guestName: 'Sarah Williams',
        roomNumber: '156',
        guestPhone: '+1 (555) 321-0987',
        status: 'delivered',
        priority: 'medium',
        orderTime: new Date(Date.now() - 3600000), // 1 hour ago
        estimatedPrepTime: 15,
        totalAmount: 19.50,
        assignedStaff: 'Michael Brown',
        internalNotes: 'Delivered successfully - guest very satisfied',
        specialInstructions: 'Deliver to balcony door',
        items: [
          {
            name: 'Greek Salad',
            description: 'Fresh salad with feta cheese and olives',
            quantity: 1,
            price: 14.50,
            customizations: 'Extra feta cheese',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150'
          },
          {
            name: 'Garlic Bread',
            description: 'Toasted bread with garlic butter',
            quantity: 1,
            price: 5.00,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=150'
          }
        ]
      },
      {
        id: 'RS005',
        guestName: 'David Rodriguez',
        roomNumber: '523',
        guestPhone: '+1 (555) 654-3210',
        status: 'new',
        priority: 'high',
        orderTime: new Date(Date.now() - 120000), // 2 minutes ago
        estimatedPrepTime: 35,
        totalAmount: 67.25,
        assignedStaff: null,
        internalNotes: '',
        specialInstructions: 'Anniversary dinner - please include complimentary dessert',
        items: [
          {
            name: 'Grilled Salmon',
            description: 'Atlantic salmon with lemon herb seasoning',
            quantity: 2,
            price: 26.00,
            customizations: 'Medium-rare, extra lemon',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150'
          },
          {
            name: 'Asparagus',
            description: 'Grilled asparagus with garlic',
            quantity: 2,
            price: 8.50,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150'
          },
          {
            name: 'Red Wine',
            description: 'House red wine selection',
            quantity: 1,
            price: 15.25,
            customizations: null,
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=150'
          }
        ]
      }
    ];

    setOrders(mockOrders);
    setSelectedOrder(mockOrders[0]);
  }, []);

  // Filter orders based on current filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !filters.search || 
      order.guestName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.roomNumber.includes(filters.search) ||
      order.id.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesPriority = filters.priority === 'all' || order.priority === filters.priority;
    
    // Time range filtering (simplified for demo)
    const matchesTimeRange = filters.timeRange === 'today'; // For demo, showing all as today
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTimeRange;
  });

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
    
    // Update selected order if it's the one being updated
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleNotesUpdate = (orderId, notes) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, internalNotes: notes }
          : order
      )
    );
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, internalNotes: notes }));
    }
  };

  const handleStaffAssign = (orderId, staffName) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, assignedStaff: staffName }
          : order
      )
    );
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, assignedStaff: staffName }));
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      timeRange: 'today'
    });
  };

  const handleInventoryAlert = (item) => {
    // Handle inventory reorder logic
    console.log('Reorder requested for:', item.name);
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      new: orders.filter(o => o.status === 'new').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };
    return stats;
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <div className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Room Service Management</h1>
                <p className="text-muted-foreground mt-1">
                  Coordinate food orders and track delivery status
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Orders
                </Button>
                <Button variant="default">
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Order
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="ClipboardList" size={20} className="text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Total Orders</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Plus" size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">New</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{stats.new}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="ChefHat" size={20} className="text-yellow-600" />
                <span className="text-sm font-medium text-muted-foreground">Preparing</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{stats.preparing}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">Ready</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{stats.ready}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-muted-foreground">Delivered</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mt-1">{stats.delivered}</p>
            </div>
          </div>

          {/* Filters */}
          <OrderFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-400px)]">
            {/* Order Queue - Left Panel */}
            <div className="col-span-12 lg:col-span-3">
              <OrderQueue
                orders={filteredOrders}
                selectedOrder={selectedOrder}
                onOrderSelect={handleOrderSelect}
                onStatusUpdate={handleStatusUpdate}
                onPriorityChange={(orderId, priority) => {
                  // Handle priority change
                  console.log('Priority change:', orderId, priority);
                }}
              />
            </div>

            {/* Order Details - Center Panel */}
            <div className="col-span-12 lg:col-span-6">
              <OrderDetails
                order={selectedOrder}
                onStatusUpdate={handleStatusUpdate}
                onNotesUpdate={handleNotesUpdate}
                onAssignStaff={handleStaffAssign}
              />
            </div>

            {/* Staff Panel - Right Panel */}
            <div className="col-span-12 lg:col-span-3">
              <StaffPanel
                onStaffAssign={(staff) => {
                  if (selectedOrder) {
                    handleStaffAssign(selectedOrder.id, staff.name);
                  }
                }}
                onInventoryAlert={handleInventoryAlert}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomServiceManagement;