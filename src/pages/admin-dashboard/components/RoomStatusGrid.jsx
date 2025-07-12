import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RoomStatusGrid = ({ onRoomClick }) => {
  const [selectedFloor, setSelectedFloor] = useState('all');

  const rooms = [
    { id: '101', floor: 1, type: 'Deluxe', status: 'occupied', guest: 'John Smith', checkOut: '2025-07-13' },
    { id: '102', floor: 1, type: 'Standard', status: 'available', guest: null, checkOut: null },
    { id: '103', floor: 1, type: 'Suite', status: 'maintenance', guest: null, checkOut: null },
    { id: '104', floor: 1, type: 'Deluxe', status: 'cleaning', guest: null, checkOut: null },
    { id: '201', floor: 2, type: 'Suite', status: 'occupied', guest: 'Sarah Johnson', checkOut: '2025-07-14' },
    { id: '202', floor: 2, type: 'Deluxe', status: 'available', guest: null, checkOut: null },
    { id: '203', floor: 2, type: 'Standard', status: 'occupied', guest: 'Mike Wilson', checkOut: '2025-07-12' },
    { id: '204', floor: 2, type: 'Suite', status: 'reserved', guest: 'Emma Davis', checkOut: null },
    { id: '301', floor: 3, type: 'Deluxe', status: 'available', guest: null, checkOut: null },
    { id: '302', floor: 3, type: 'Standard', status: 'occupied', guest: 'David Brown', checkOut: '2025-07-15' },
    { id: '303', floor: 3, type: 'Suite', status: 'available', guest: null, checkOut: null },
    { id: '304', floor: 3, type: 'Deluxe', status: 'maintenance', guest: null, checkOut: null }
  ];

  const statusConfig = {
    available: { 
      color: 'bg-success text-success-foreground', 
      icon: 'CheckCircle', 
      label: 'Available' 
    },
    occupied: { 
      color: 'bg-error text-error-foreground', 
      icon: 'User', 
      label: 'Occupied' 
    },
    maintenance: { 
      color: 'bg-warning text-warning-foreground', 
      icon: 'Wrench', 
      label: 'Maintenance' 
    },
    cleaning: { 
      color: 'bg-primary text-primary-foreground', 
      icon: 'Sparkles', 
      label: 'Cleaning' 
    },
    reserved: { 
      color: 'bg-secondary text-secondary-foreground', 
      icon: 'Clock', 
      label: 'Reserved' 
    }
  };

  const floors = [
    { value: 'all', label: 'All Floors' },
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' }
  ];

  const filteredRooms = selectedFloor === 'all' 
    ? rooms 
    : rooms.filter(room => room.floor.toString() === selectedFloor);

  const getStatusCounts = () => {
    return Object.keys(statusConfig).reduce((acc, status) => {
      acc[status] = rooms.filter(room => room.status === status).length;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Building2" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Room Status</h2>
        </div>
        
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {floors.map(floor => (
            <option key={floor.value} value={floor.value}>{floor.label}</option>
          ))}
        </select>
      </div>

      {/* Status Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
            <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
            <span className="text-xs font-medium text-foreground">{config.label}</span>
            <span className="text-xs text-muted-foreground">({statusCounts[status]})</span>
          </div>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {filteredRooms.map((room) => {
          const config = statusConfig[room.status];
          return (
            <button
              key={room.id}
              onClick={() => onRoomClick(room)}
              className={`p-4 rounded-lg border-2 transition-smooth hover:shadow-moderate ${config.color} hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{room.id}</span>
                <Icon name={config.icon} size={16} />
              </div>
              
              <div className="text-left space-y-1">
                <p className="text-sm font-medium">{room.type}</p>
                {room.guest && (
                  <p className="text-xs opacity-90 truncate">{room.guest}</p>
                )}
                {room.checkOut && (
                  <p className="text-xs opacity-75">Out: {room.checkOut}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoomStatusGrid;