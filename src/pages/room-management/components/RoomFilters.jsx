import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoomFilters = ({ filters, onFilterChange, onClearFilters, onBulkAction }) => {
  const roomTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Deluxe AC', label: 'Deluxe AC' },
    { value: 'Deluxe Non-AC', label: 'Deluxe Non-AC' },
    { value: 'Suite AC', label: 'Suite AC' },
    { value: 'Suite Non-AC', label: 'Suite Non-AC' }
  ];

  const floorOptions = [
    { value: '', label: 'All Floors' },
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
    { value: '4', label: 'Floor 4' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Available', label: 'Available' },
    { value: 'Occupied', label: 'Occupied' },
    { value: 'Under Maintenance', label: 'Under Maintenance' },
    { value: 'Cleaning', label: 'Cleaning' }
  ];

  const housekeepingOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'Clean', label: 'Clean' },
    { value: 'Dirty', label: 'Dirty' },
    { value: 'In Progress', label: 'In Progress' }
  ];

  const bulkActionOptions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'mark-clean', label: 'Mark as Clean' },
    { value: 'mark-dirty', label: 'Mark as Dirty' },
    { value: 'schedule-maintenance', label: 'Schedule Maintenance' },
    { value: 'assign-housekeeping', label: 'Assign Housekeeping' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleBulkActionChange = (action) => {
    if (action) {
      onBulkAction(action);
    }
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Room Type Filter */}
        <div>
          <Select
            label="Room Type"
            options={roomTypeOptions}
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
            className="w-full"
          />
        </div>

        {/* Floor Filter */}
        <div>
          <Select
            label="Floor"
            options={floorOptions}
            value={filters.floor}
            onChange={(value) => handleFilterChange('floor', value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            className="w-full"
          />
        </div>

        {/* Housekeeping Filter */}
        <div>
          <Select
            label="Housekeeping"
            options={housekeepingOptions}
            value={filters.housekeeping}
            onChange={(value) => handleFilterChange('housekeeping', value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-3">Quick Filters</p>
          <div className="space-y-2">
            <Checkbox
              label="Available Today"
              checked={filters.availableToday}
              onChange={(e) => handleFilterChange('availableToday', e.target.checked)}
            />
            <Checkbox
              label="Needs Cleaning"
              checked={filters.needsCleaning}
              onChange={(e) => handleFilterChange('needsCleaning', e.target.checked)}
            />
            <Checkbox
              label="Maintenance Due"
              checked={filters.maintenanceDue}
              onChange={(e) => handleFilterChange('maintenanceDue', e.target.checked)}
            />
            <Checkbox
              label="VIP Guests"
              checked={filters.vipGuests}
              onChange={(e) => handleFilterChange('vipGuests', e.target.checked)}
            />
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="pt-4 border-t border-border">
          <Select
            label="Bulk Actions"
            options={bulkActionOptions}
            value=""
            onChange={handleBulkActionChange}
            placeholder="Select action..."
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Select rooms first, then choose an action
          </p>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Showing filtered results</span>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;