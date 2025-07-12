import React, { useState } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingForm from './components/BookingForm';
import RoomAvailabilityCalendar from './components/RoomAvailabilityCalendar';
import BookingSummary from './components/BookingSummary';
import CheckInProcess from './components/CheckInProcess';
import GuestHistoryLookup from './components/GuestHistoryLookup';

const GuestBookingCheckIn = () => {
  const [currentView, setCurrentView] = useState('booking'); // 'booking' or 'checkin'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showGuestLookup, setShowGuestLookup] = useState(false);
  const [guestData, setGuestData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: '',
    idNumber: '',
    address: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    guestCount: '',
    specialRequests: '',
    earlyCheckIn: false,
    lateCheckOut: false,
    airportPickup: false,
    emergencyContactName: '',
    emergencyContactPhone: '',
    vehicleModel: '',
    licensePlate: '',
    agreeTerms: false,
    receiveOffers: false
  });

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleGuestSelect = (selectedGuestData) => {
    setGuestData(selectedGuestData);
    setShowGuestLookup(false);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    // In a real app, this would submit to API
    alert('Booking submitted successfully! Proceeding to payment...');
  };

  const handlePaymentComplete = (paymentData) => {
    console.log('Payment completed:', paymentData);
    // In a real app, this would process payment
    alert('Payment processed successfully! Guest portal access created.');
  };

  const handleGenerateInvoice = (invoiceData) => {
    console.log('Generating invoice:', invoiceData);
    // In a real app, this would generate PDF and send via selected channels
    alert('Invoice generated and sent successfully!');
  };

  const handleCheckInComplete = (checkInData) => {
    console.log('Check-in completed:', checkInData);
    // In a real app, this would update room status and create guest session
    alert('Check-in completed successfully! Guest can now access their room.');
    
    // Reset form for next guest
    setCurrentView('booking');
    setSelectedRoom(null);
    setGuestData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idType: '',
      idNumber: '',
      address: '',
      checkInDate: '',
      checkOutDate: '',
      roomType: '',
      guestCount: '',
      specialRequests: '',
      earlyCheckIn: false,
      lateCheckOut: false,
      airportPickup: false,
      emergencyContactName: '',
      emergencyContactPhone: '',
      vehicleModel: '',
      licensePlate: '',
      agreeTerms: false,
      receiveOffers: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Guest Booking & Check-in</h1>
              <p className="text-muted-foreground mt-2">
                Manage guest reservations and check-in process
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={currentView === 'booking' ? 'default' : 'outline'}
                onClick={() => setCurrentView('booking')}
                iconName="Calendar"
                iconPosition="left"
              >
                New Booking
              </Button>
              
              <Button
                variant={currentView === 'checkin' ? 'default' : 'outline'}
                onClick={() => setCurrentView('checkin')}
                iconName="UserCheck"
                iconPosition="left"
              >
                Check-in
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowGuestLookup(!showGuestLookup)}
                iconName="Search"
                iconPosition="left"
              >
                Guest Lookup
              </Button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Icon name="Home" size={16} />
            <span>/</span>
            <span>Guest Management</span>
            <span>/</span>
            <span className="text-foreground">
              {currentView === 'booking' ? 'Booking' : 'Check-in'}
            </span>
          </nav>

          {/* Guest Lookup Modal */}
          {showGuestLookup && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Guest History Lookup</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowGuestLookup(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="p-6">
                  <GuestHistoryLookup onGuestSelect={handleGuestSelect} />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          {currentView === 'booking' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel - Booking Form */}
              <div className="lg:col-span-4">
                <BookingForm
                  onBookingSubmit={handleBookingSubmit}
                  selectedRoom={selectedRoom}
                  guestData={guestData}
                  setGuestData={setGuestData}
                />
              </div>

              {/* Center Panel - Room Availability */}
              <div className="lg:col-span-5">
                <RoomAvailabilityCalendar
                  onRoomSelect={handleRoomSelect}
                  selectedRoom={selectedRoom}
                  checkInDate={guestData.checkInDate}
                  checkOutDate={guestData.checkOutDate}
                />
              </div>

              {/* Right Panel - Booking Summary */}
              <div className="lg:col-span-3">
                <BookingSummary
                  guestData={guestData}
                  selectedRoom={selectedRoom}
                  onPaymentComplete={handlePaymentComplete}
                  onGenerateInvoice={handleGenerateInvoice}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <CheckInProcess
                guestData={guestData}
                selectedRoom={selectedRoom}
                onCheckInComplete={handleCheckInComplete}
              />
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Today's Bookings</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">18</p>
                  <p className="text-sm text-muted-foreground">Check-ins Today</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">6</p>
                  <p className="text-sm text-muted-foreground">Pending Check-ins</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="UserX" size={24} className="text-error" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Check-outs Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestBookingCheckIn;