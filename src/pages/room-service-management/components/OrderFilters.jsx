import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'new', label: 'New Orders' },
    { value: 'preparing', label: 'In Preparation' },
    { value: 'ready', label: 'Ready for Delivery' },
    { value: 'delivered', label: 'Delivered' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters.search || 
           filters.status !== 'all' || 
           filters.priority !== 'all' || 
           filters.timeRange !== 'today';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">Filter Orders</h3>
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
          >
            <Icon name="X" size={14} className="mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search orders, guests, rooms..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Priority Filter */}
        <Select
          placeholder="Filter by priority"
          options={priorityOptions}
          value={filters.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />

        {/* Time Range Filter */}
        <Select
          placeholder="Filter by time"
          options={timeRangeOptions}
          value={filters.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant={filters.status === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters.status === 'new' ? 'all' : 'new')}
        >
          <Icon name="Plus" size={14} className="mr-2" />
          New Orders
        </Button>
        <Button
          variant={filters.status === 'preparing' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters.status === 'preparing' ? 'all' : 'preparing')}
        >
          <Icon name="ChefHat" size={14} className="mr-2" />
          In Kitchen
        </Button>
        <Button
          variant={filters.status === 'ready' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters.status === 'ready' ? 'all' : 'ready')}
        >
          <Icon name="CheckCircle" size={14} className="mr-2" />
          Ready
        </Button>
        <Button
          variant={filters.priority === 'high' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('priority', filters.priority === 'high' ? 'all' : 'high')}
        >
          <Icon name="AlertTriangle" size={14} className="mr-2" />
          Urgent
        </Button>
      </div>
    </div>
  );
};

export default OrderFilters;