import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomCard = ({ room, onStatusChange, onEdit, onMaintenance, onHousekeeping }) => {
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
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-moderate transition-smooth">
      {/* Room Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getRoomTypeIcon(room.type)} size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{room.number}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
          {room.status}
        </div>
      </div>

      {/* Room Type & Floor */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{room.type}</span>
        <span className="text-sm text-muted-foreground">Floor {room.floor}</span>
      </div>

      {/* Guest Information */}
      {room.status === 'Occupied' && room.guest && (
        <div className="bg-muted rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-background">
              <Image
                src={room.guest.avatar}
                alt={room.guest.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{room.guest.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(room.checkIn)} - {formatDate(room.checkOut)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Info */}
      {room.status === 'Under Maintenance' && room.maintenance && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Wrench" size={14} className="text-warning" />
            <span className="text-sm font-medium text-warning">Maintenance Required</span>
          </div>
          <p className="text-xs text-muted-foreground">{room.maintenance.issue}</p>
          <p className="text-xs text-muted-foreground">
            Assigned to: {room.maintenance.assignedTo}
          </p>
        </div>
      )}

      {/* Housekeeping Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Last cleaned: {formatDate(room.lastCleaned)}
          </span>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          room.housekeepingStatus === 'Clean' ? 'bg-success' : 
          room.housekeepingStatus === 'Dirty' ? 'bg-error' : 'bg-warning'
        }`} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(room)}
          className="flex-1"
        >
          <Icon name="Edit" size={14} className="mr-1" />
          Edit
        </Button>
        
        {room.status === 'Available' && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onStatusChange(room.id, 'Occupied')}
            className="flex-1"
          >
            <Icon name="UserPlus" size={14} className="mr-1" />
            Check In
          </Button>
        )}
        
        {room.status === 'Occupied' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onStatusChange(room.id, 'Available')}
            className="flex-1"
          >
            <Icon name="UserMinus" size={14} className="mr-1" />
            Check Out
          </Button>
        )}
        
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
  );
};

export default RoomCard;