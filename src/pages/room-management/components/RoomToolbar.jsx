import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RoomToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  onAddRoom, 
  selectedRooms,
  totalRooms,
  onRefresh 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Section - Search and Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-smooth ${
                  isSearchFocused ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <input
                type="text"
                placeholder="Search rooms, guests, or room numbers..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-10 pr-4 py-2 text-sm bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                  isSearchFocused ? 'border-primary' : 'border-border'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Room Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full" />
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span>Maintenance</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Cleaning</span>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and View Controls */}
        <div className="flex items-center gap-3">
          {/* Selection Info */}
          {selectedRooms.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span>{selectedRooms.length} of {totalRooms} selected</span>
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3 py-1"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3 py-1"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>

          {/* Add Room Button */}
          <Button
            variant="default"
            onClick={onAddRoom}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Room
          </Button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      {selectedRooms.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Quick Actions for {selectedRooms.length} selected room{selectedRooms.length > 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Schedule Cleaning
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Wrench" size={14} className="mr-1" />
                Request Maintenance
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="UserCheck" size={14} className="mr-1" />
                Bulk Check-in
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomToolbar;