import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({ onBookingSubmit, selectedRoom, guestData, setGuestData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const roomTypeOptions = [
    { value: 'deluxe', label: 'Deluxe Room' },
    { value: 'suite', label: 'Suite' },
    { value: 'standard', label: 'Standard Room' },
    { value: 'premium', label: 'Premium Room' }
  ];

  const guestCountOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5+', label: '5+ Guests' }
  ];

  const handleInputChange = (field, value) => {
    setGuestData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!guestData.firstName) newErrors.firstName = 'First name is required';
      if (!guestData.lastName) newErrors.lastName = 'Last name is required';
      if (!guestData.email) newErrors.email = 'Email is required';
      if (!guestData.phone) newErrors.phone = 'Phone number is required';
      if (!guestData.idType) newErrors.idType = 'ID type is required';
      if (!guestData.idNumber) newErrors.idNumber = 'ID number is required';
    } else if (step === 2) {
      if (!guestData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
      if (!guestData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';
      if (!guestData.roomType) newErrors.roomType = 'Room type is required';
      if (!guestData.guestCount) newErrors.guestCount = 'Guest count is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onBookingSubmit(guestData);
    }
  };

  const idTypeOptions = [
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: 'Driver\'s License' },
    { value: 'national_id', label: 'National ID' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Guest Booking</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            1
          </div>
          <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            2
          </div>
          <div className={`w-8 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            3
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Guest Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={guestData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={guestData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={guestData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={guestData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="ID Type"
                options={idTypeOptions}
                value={guestData.idType}
                onChange={(value) => handleInputChange('idType', value)}
                error={errors.idType}
                required
              />
              
              <Input
                label="ID Number"
                type="text"
                placeholder="Enter ID number"
                value={guestData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                error={errors.idNumber}
                required
              />
            </div>

            <Input
              label="Address"
              type="text"
              placeholder="Enter address (optional)"
              value={guestData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Booking Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Check-in Date"
                type="date"
                value={guestData.checkInDate}
                onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                error={errors.checkInDate}
                required
              />
              
              <Input
                label="Check-out Date"
                type="date"
                value={guestData.checkOutDate}
                onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
                error={errors.checkOutDate}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Room Type"
                options={roomTypeOptions}
                value={guestData.roomType}
                onChange={(value) => handleInputChange('roomType', value)}
                error={errors.roomType}
                required
              />
              
              <Select
                label="Number of Guests"
                options={guestCountOptions}
                value={guestData.guestCount}
                onChange={(value) => handleInputChange('guestCount', value)}
                error={errors.guestCount}
                required
              />
            </div>

            <Input
              label="Special Requests"
              type="text"
              placeholder="Any special requests or preferences (optional)"
              value={guestData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            />

            <div className="space-y-3">
              <Checkbox
                label="Early check-in (if available)"
                checked={guestData.earlyCheckIn}
                onChange={(e) => handleInputChange('earlyCheckIn', e.target.checked)}
              />
              
              <Checkbox
                label="Late check-out (additional charges may apply)"
                checked={guestData.lateCheckOut}
                onChange={(e) => handleInputChange('lateCheckOut', e.target.checked)}
              />
              
              <Checkbox
                label="Airport pickup service"
                checked={guestData.airportPickup}
                onChange={(e) => handleInputChange('airportPickup', e.target.checked)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Additional Information</h3>
            
            <Input
              label="Emergency Contact Name"
              type="text"
              placeholder="Enter emergency contact name"
              value={guestData.emergencyContactName}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            />

            <Input
              label="Emergency Contact Phone"
              type="tel"
              placeholder="Enter emergency contact phone"
              value={guestData.emergencyContactPhone}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Vehicle Make/Model"
                type="text"
                placeholder="e.g., Toyota Camry (optional)"
                value={guestData.vehicleModel}
                onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              />
              
              <Input
                label="License Plate"
                type="text"
                placeholder="Enter license plate (optional)"
                value={guestData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="I agree to the hotel terms and conditions"
                checked={guestData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
              />
              
              <Checkbox
                label="I would like to receive promotional offers via email"
                checked={guestData.receiveOffers}
                onChange={(e) => handleInputChange('receiveOffers', e.target.checked)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        {currentStep < 3 ? (
          <Button
            variant="default"
            onClick={handleNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={handleSubmit}
            iconName="Check"
            iconPosition="left"
          >
            Complete Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;