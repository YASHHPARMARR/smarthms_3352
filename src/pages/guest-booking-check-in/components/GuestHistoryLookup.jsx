import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const GuestHistoryLookup = ({ onGuestSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockGuestHistory = [
    {
      id: 'G001',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      idType: 'passport',
      idNumber: 'P123456789',
      totalStays: 5,
      lastStay: '2024-05-15',
      preferredRoomType: 'deluxe',
      loyaltyStatus: 'Gold',
      totalSpent: 2450.00,
      address: '123 Main St, New York, NY 10001',
      emergencyContactName: 'Jane Smith',
      emergencyContactPhone: '+1-555-0124',
      vehicleModel: 'Toyota Camry',
      licensePlate: 'ABC-123',
      specialRequests: 'Late checkout, extra towels',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 'G002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0456',
      idType: 'drivers_license',
      idNumber: 'DL987654321',
      totalStays: 3,
      lastStay: '2024-06-20',
      preferredRoomType: 'suite',
      loyaltyStatus: 'Silver',
      totalSpent: 1890.00,
      address: '456 Oak Ave, Los Angeles, CA 90210',
      emergencyContactName: 'Mike Johnson',
      emergencyContactPhone: '+1-555-0457',
      vehicleModel: 'Honda Accord',
      licensePlate: 'XYZ-789',
      specialRequests: 'Ground floor room, no smoking',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 'G003',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      phone: '+1-555-0789',
      idType: 'passport',
      idNumber: 'P987654321',
      totalStays: 8,
      lastStay: '2024-07-01',
      preferredRoomType: 'premium',
      loyaltyStatus: 'Platinum',
      totalSpent: 4200.00,
      address: '789 Pine St, Chicago, IL 60601',
      emergencyContactName: 'Lisa Brown',
      emergencyContactPhone: '+1-555-0790',
      vehicleModel: 'BMW X5',
      licensePlate: 'BMW-001',
      specialRequests: 'High floor, city view, early check-in',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockGuestHistory.filter(guest => 
        guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.phone.includes(searchQuery) ||
        guest.idNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleGuestSelect = (guest) => {
    const guestData = {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
      idType: guest.idType,
      idNumber: guest.idNumber,
      address: guest.address,
      emergencyContactName: guest.emergencyContactName,
      emergencyContactPhone: guest.emergencyContactPhone,
      vehicleModel: guest.vehicleModel,
      licensePlate: guest.licensePlate,
      specialRequests: guest.specialRequests,
      roomType: guest.preferredRoomType,
      guestCount: '2',
      checkInDate: '',
      checkOutDate: '',
      earlyCheckIn: false,
      lateCheckOut: false,
      airportPickup: false,
      agreeTerms: true,
      receiveOffers: true
    };
    
    onGuestSelect(guestData);
  };

  const getLoyaltyColor = (status) => {
    switch (status) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Guest History Lookup</h2>
      
      {/* Search Section */}
      <div className="space-y-4 mb-6">
        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, email, phone, or ID number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button
            variant="default"
            onClick={handleSearch}
            loading={isSearching}
            iconName="Search"
            iconPosition="left"
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Search for returning guests to auto-fill their information
        </p>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Search Results ({searchResults.length})</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults.map((guest) => (
              <div
                key={guest.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => handleGuestSelect(guest)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={guest.avatar}
                      alt={`${guest.firstName} ${guest.lastName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {guest.firstName} {guest.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">{guest.email}</p>
                        <p className="text-sm text-muted-foreground">{guest.phone}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLoyaltyColor(guest.loyaltyStatus)}`}>
                          {guest.loyaltyStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Total Stays:</span>
                        <p className="font-medium text-foreground">{guest.totalStays}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Stay:</span>
                        <p className="font-medium text-foreground">
                          {new Date(guest.lastStay).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Preferred Room:</span>
                        <p className="font-medium text-foreground capitalize">
                          {guest.preferredRoomType}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Spent:</span>
                        <p className="font-medium text-foreground">${guest.totalSpent.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    {guest.specialRequests && (
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">Special Requests:</span>
                        <p className="text-xs text-foreground">{guest.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Click to select this guest</span>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No guests found</p>
          <p className="text-sm text-muted-foreground">
            Try searching with a different name, email, or phone number
          </p>
        </div>
      )}

      {/* Empty State */}
      {!searchQuery && searchResults.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Search for returning guests</p>
          <p className="text-sm text-muted-foreground">
            Enter a name, email, phone number, or ID to find existing guest records
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-primary">{mockGuestHistory.length}</p>
            <p className="text-xs text-muted-foreground">Total Guests</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">
              {mockGuestHistory.reduce((sum, guest) => sum + guest.totalStays, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Stays</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">
              ${mockGuestHistory.reduce((sum, guest) => sum + guest.totalSpent, 0).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHistoryLookup;