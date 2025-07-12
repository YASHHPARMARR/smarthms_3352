import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ filters, onFiltersChange, stats }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const roomTypeOptions = [
    { value: 'all', label: 'All Room Types' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' }
  ];

  const technicianOptions = [
    { value: 'all', label: 'All Technicians' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'mike-wilson', label: 'Mike Wilson' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'david-brown', label: 'David Brown' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'other', label: 'Other' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priority: 'all',
      roomType: 'all',
      technician: 'all',
      category: 'all',
      dateRange: 'all',
      search: ''
    });
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-r border-border h-full flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="mb-4"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
        <div className="flex flex-col space-y-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={16} className="text-primary" />
          </div>
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={16} className="text-success" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(true)}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={16} className="mr-2 text-success" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-foreground">{stats.totalTasks}</p>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-success">{stats.completionRate}%</p>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-warning">{stats.avgResolutionTime}h</p>
            <p className="text-xs text-muted-foreground">Avg Resolution</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-error">{stats.urgentTasks}</p>
            <p className="text-xs text-muted-foreground">Urgent Tasks</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <Input
            label="Search Tasks"
            type="search"
            placeholder="Search by room, description..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Priority Filter */}
        <div>
          <Select
            label="Priority Level"
            options={priorityOptions}
            value={filters.priority}
            onChange={(value) => handleFilterChange('priority', value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
          />
        </div>

        {/* Room Type Filter */}
        <div>
          <Select
            label="Room Type"
            options={roomTypeOptions}
            value={filters.roomType}
            onChange={(value) => handleFilterChange('roomType', value)}
          />
        </div>

        {/* Technician Filter */}
        <div>
          <Select
            label="Assigned Technician"
            options={technicianOptions}
            value={filters.technician}
            onChange={(value) => handleFilterChange('technician', value)}
          />
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <Icon name="X" size={16} className="mr-2" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;