import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RoomAvailabilityCalendar = ({ onRoomSelect, selectedRoom, checkInDate, checkOutDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const roomTypes = [
    { value: 'all', label: 'All Room Types' },
    { value: 'deluxe', label: 'Deluxe Room' },
    { value: 'suite', label: 'Suite' },
    { value: 'standard', label: 'Standard Room' },
    { value: 'premium', label: 'Premium Room' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-300', label: '$200 - $300' },
    { value: '300+', label: '$300+' }
  ];

  const mockRooms = [
    {
      id: 'R101',
      type: 'deluxe',
      name: 'Deluxe Room 101',
      price: 150,
      capacity: 2,
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
      status: 'available',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop'
    },
    {
      id: 'R102',
      type: 'suite',
      name: 'Executive Suite 102',
      price: 280,
      capacity: 4,
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'],
      status: 'available',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop'
    },
    {
      id: 'R103',
      type: 'standard',
      name: 'Standard Room 103',
      price: 89,
      capacity: 2,
      amenities: ['WiFi', 'AC', 'TV'],
      status: 'occupied',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=250&fit=crop'
    },
    {
      id: 'R104',
      type: 'premium',
      name: 'Premium Room 104',
      price: 220,
      capacity: 3,
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'City View'],
      status: 'available',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop'
    },
    {
      id: 'R105',
      type: 'deluxe',
      name: 'Deluxe Room 105',
      price: 165,
      capacity: 2,
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
      status: 'maintenance',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop'
    },
    {
      id: 'R106',
      type: 'suite',
      name: 'Presidential Suite 106',
      price: 450,
      capacity: 6,
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'],
      status: 'available',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop'
    }
  ];

  const filteredRooms = mockRooms.filter(room => {
    if (selectedFilter !== 'all' && room.type !== selectedFilter) return false;
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        if (room.price < parseInt(min) || room.price > parseInt(max)) return false;
      } else {
        if (room.price < parseInt(min)) return false;
      }
    }
    
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'occupied':
        return 'bg-error text-error-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const handleRoomSelection = (room) => {
    if (room.status === 'available') {
      onRoomSelect(room);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Room Availability</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Room Type"
          options={roomTypes}
          value={selectedFilter}
          onChange={setSelectedFilter}
        />
        
        <Select
          label="Price Range"
          options={priceRanges}
          value={priceRange}
          onChange={setPriceRange}
        />
      </div>

      {/* Room Grid */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`border border-border rounded-lg p-4 transition-smooth cursor-pointer ${
              selectedRoom?.id === room.id 
                ? 'border-primary bg-primary/5' 
                : room.status === 'available' ?'hover:border-primary/50 hover:bg-muted/50' :'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => handleRoomSelection(room)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{room.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {room.type.replace('_', ' ')} • Up to {room.capacity} guests
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">${room.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(room.status)}`}>
                    {getStatusText(room.status)}
                  </span>
                </div>
              </div>
            </div>
            
            {selectedRoom?.id === room.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Selected for booking</span>
                  <Icon name="Check" size={16} className="text-primary" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No rooms found matching your criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedFilter('all');
              setPriceRange('all');
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-2">Room Status:</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-muted-foreground">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;