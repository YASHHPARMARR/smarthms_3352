import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingSummary = ({ guestData, selectedRoom, onPaymentComplete, onGenerateInvoice }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sendSMS, setSendSMS] = useState(false);
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [sendEmail, setSendEmail] = useState(true);

  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const calculateStayDuration = () => {
    if (!guestData.checkInDate || !guestData.checkOutDate) return 0;
    const checkIn = new Date(guestData.checkInDate);
    const checkOut = new Date(guestData.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateCosts = () => {
    const nights = calculateStayDuration();
    const roomRate = selectedRoom?.price || 0;
    const subtotal = roomRate * nights;
    
    const earlyCheckInFee = guestData.earlyCheckIn ? 25 : 0;
    const lateCheckOutFee = guestData.lateCheckOut ? 35 : 0;
    const airportPickupFee = guestData.airportPickup ? 45 : 0;
    
    const serviceCharges = earlyCheckInFee + lateCheckOutFee + airportPickupFee;
    const taxRate = 0.12; // 12% tax
    const tax = (subtotal + serviceCharges) * taxRate;
    const total = subtotal + serviceCharges + tax;

    return {
      nights,
      roomRate,
      subtotal,
      earlyCheckInFee,
      lateCheckOutFee,
      airportPickupFee,
      serviceCharges,
      tax,
      total
    };
  };

  const costs = calculateCosts();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    const paymentData = {
      method: paymentMethod,
      amount: costs.total,
      guestData,
      selectedRoom,
      deliveryOptions: {
        sms: sendSMS,
        whatsapp: sendWhatsApp,
        email: sendEmail
      }
    };
    
    onPaymentComplete(paymentData);
  };

  const handleGenerateInvoice = () => {
    const invoiceData = {
      guestData,
      selectedRoom,
      costs,
      deliveryOptions: {
        sms: sendSMS,
        whatsapp: sendWhatsApp,
        email: sendEmail
      }
    };
    
    onGenerateInvoice(invoiceData);
  };

  if (!selectedRoom) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 h-full">
        <h2 className="text-xl font-semibold text-foreground mb-6">Booking Summary</h2>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a room to view booking summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <h2 className="text-xl font-semibold text-foreground mb-6">Booking Summary</h2>
      
      {/* Guest Information */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Guest Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="text-foreground">{guestData.firstName} {guestData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="text-foreground">{guestData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="text-foreground">{guestData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests:</span>
            <span className="text-foreground">{guestData.guestCount}</span>
          </div>
        </div>
      </div>

      {/* Room Information */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Room Details</h3>
        <div className="border border-border rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{selectedRoom.name}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedRoom.type.replace('_', ' ')}
              </p>
              <p className="text-sm text-primary font-medium">${selectedRoom.price}/night</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Duration */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Stay Duration</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in:</span>
            <span className="text-foreground">
              {guestData.checkInDate ? new Date(guestData.checkInDate).toLocaleDateString() : 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out:</span>
            <span className="text-foreground">
              {guestData.checkOutDate ? new Date(guestData.checkOutDate).toLocaleDateString() : 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-foreground">Total nights:</span>
            <span className="text-foreground">{costs.nights}</span>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Cost Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room ({costs.nights} nights)</span>
            <span className="text-foreground">${costs.subtotal.toFixed(2)}</span>
          </div>
          
          {costs.earlyCheckInFee > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Early check-in</span>
              <span className="text-foreground">${costs.earlyCheckInFee.toFixed(2)}</span>
            </div>
          )}
          
          {costs.lateCheckOutFee > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Late check-out</span>
              <span className="text-foreground">${costs.lateCheckOutFee.toFixed(2)}</span>
            </div>
          )}
          
          {costs.airportPickupFee > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Airport pickup</span>
              <span className="text-foreground">${costs.airportPickupFee.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (12%)</span>
            <span className="text-foreground">${costs.tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${costs.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <Select
          label="Payment Method"
          options={paymentMethods}
          value={paymentMethod}
          onChange={setPaymentMethod}
          required
        />
      </div>

      {/* Invoice Delivery Options */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Invoice Delivery</h3>
        <div className="space-y-3">
          <Checkbox
            label="Send via Email"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
          />
          <Checkbox
            label="Send via SMS"
            checked={sendSMS}
            onChange={(e) => setSendSMS(e.target.checked)}
          />
          <Checkbox
            label="Send via WhatsApp"
            checked={sendWhatsApp}
            onChange={(e) => setSendWhatsApp(e.target.checked)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={handlePayment}
          iconName="CreditCard"
          iconPosition="left"
          disabled={!paymentMethod}
        >
          Process Payment
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleGenerateInvoice}
          iconName="FileText"
          iconPosition="left"
        >
          Generate Invoice
        </Button>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Secure Payment</p>
            <p>Your payment information is encrypted and secure. We never store your card details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;