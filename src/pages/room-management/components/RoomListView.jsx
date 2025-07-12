import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoomListView = ({ 
  rooms, 
  selectedRooms, 
  onRoomSelect, 
  onStatusChange, 
  onEdit, 
  onMaintenance, 
  onHousekeeping 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-success text-success-foreground';
      case 'Occupied':
        return 'bg-error text-error-foreground';
      case 'Under Maintenance':
        return 'bg-warning text-warning-foreground';
      case 'Cleaning':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoomTypeIcon = (type) => {
    if (type.includes('Suite')) return 'Crown';
    if (type.includes('Deluxe')) return 'Star';
    return 'Bed';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onRoomSelect(rooms.map(room => room.id));
    } else {
      onRoomSelect([]);
    }
  };

  const isAllSelected = rooms.length > 0 && selectedRooms.length === rooms.length;
  const isPartiallySelected = selectedRooms.length > 0 && selectedRooms.length < rooms.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted border-b border-border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-foreground">
          <div className="col-span-1 flex items-center">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isPartiallySelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
          <div className="col-span-2">Room</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Guest/Details</div>
          <div className="col-span-2">Housekeeping</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 transition-smooth ${
              selectedRooms.includes(room.id) ? 'bg-primary/5' : ''
            }`}
          >
            {/* Selection Checkbox */}
            <div className="col-span-1 flex items-center">
              <Checkbox
                checked={selectedRooms.includes(room.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onRoomSelect([...selectedRooms, room.id]);
                  } else {
                    onRoomSelect(selectedRooms.filter(id => id !== room.id));
                  }
                }}
              />
            </div>

            {/* Room Number & Floor */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <Icon name={getRoomTypeIcon(room.type)} size={18} className="text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{room.number}</p>
                  <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div className="col-span-2">
              <p className="text-sm text-foreground">{room.type}</p>
              <p className="text-xs text-muted-foreground">
                ${room.price}/night
              </p>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                {room.status}
              </div>
              {room.status === 'Under Maintenance' && room.maintenance && (
                <p className="text-xs text-muted-foreground mt-1">
                  {room.maintenance.issue}
                </p>
              )}
            </div>

            {/* Guest Information */}
            <div className="col-span-2">
              {room.status === 'Occupied' && room.guest ? (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={room.guest.avatar}
                      alt={room.guest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{room.guest.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(room.checkIn)} - {formatDate(room.checkOut)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No guest</p>
              )}
            </div>

            {/* Housekeeping Status */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  room.housekeepingStatus === 'Clean' ? 'bg-success' : 
                  room.housekeepingStatus === 'Dirty' ? 'bg-error' : 'bg-warning'
                }`} />
                <span className="text-sm text-foreground">{room.housekeepingStatus}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Last: {formatDate(room.lastCleaned)}
              </p>
            </div>

            {/* Actions */}
            <div className="col-span-1">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(room)}
                >
                  <Icon name="Edit" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMaintenance(room)}
                >
                  <Icon name="Wrench" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onHousekeeping(room)}
                >
                  <Icon name="Sparkles" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Bed" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No rooms found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomListView;