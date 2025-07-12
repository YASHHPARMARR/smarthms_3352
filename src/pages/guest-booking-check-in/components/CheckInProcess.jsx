import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CheckInProcess = ({ guestData, selectedRoom, onCheckInComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [idPhoto, setIdPhoto] = useState(null);
  const [guestPhoto, setGuestPhoto] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [cameraType, setCameraType] = useState(''); // 'id' or 'guest'
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'id') {
          setIdPhoto(e.target.result);
        } else {
          setGuestPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (type) => {
    setCameraType(type);
    setIsUsingCamera(true);
    // In a real app, this would open camera interface
    // For demo, we'll simulate camera capture
    setTimeout(() => {
      const mockPhoto = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
      
      if (type === 'id') {
        setIdPhoto(mockPhoto);
      } else {
        setGuestPhoto(mockPhoto);
      }
      setIsUsingCamera(false);
    }, 2000);
  };

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    const mockQRCode = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+`;
    setQrCode(mockQRCode);
  };

  const handleNext = () => {
    if (currentStep === 1 && (!idPhoto || !guestPhoto)) {
      alert('Please upload both ID and guest photos');
      return;
    }
    
    if (currentStep === 2) {
      generateQRCode();
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handleComplete = () => {
    const checkInData = {
      guestData,
      selectedRoom,
      idPhoto,
      guestPhoto,
      qrCode,
      checkInTime: new Date().toISOString(),
      roomKey: `QR-${selectedRoom.id}-${Date.now()}`
    };
    
    onCheckInComplete(checkInData);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Check-in Process</h2>
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

      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-foreground">Photo Verification</h3>
          
          {/* ID Photo Upload */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">ID Document Photo</h4>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              {idPhoto ? (
                <div className="text-center">
                  <img
                    src={idPhoto}
                    alt="ID Document"
                    className="max-w-full max-h-48 mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setIdPhoto(null)}
                    className="mt-4"
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="FileImage" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Upload ID document photo</p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Upload File
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCameraCapture('id')}
                      iconName="Camera"
                      iconPosition="left"
                      loading={isUsingCamera && cameraType === 'id'}
                    >
                      Take Photo
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'id')}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Guest Photo Upload */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Guest Photo</h4>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              {guestPhoto ? (
                <div className="text-center">
                  <img
                    src={guestPhoto}
                    alt="Guest"
                    className="max-w-full max-h-48 mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setGuestPhoto(null)}
                    className="mt-4"
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="User" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Take guest photo for verification</p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => cameraInputRef.current?.click()}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Upload File
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCameraCapture('guest')}
                      iconName="Camera"
                      iconPosition="left"
                      loading={isUsingCamera && cameraType === 'guest'}
                    >
                      Take Photo
                    </Button>
                  </div>
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'guest')}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-foreground">Verification Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Guest Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground">{guestData.firstName} {guestData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID Type:</span>
                  <span className="text-foreground capitalize">{guestData.idType?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID Number:</span>
                  <span className="text-foreground">{guestData.idNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room:</span>
                  <span className="text-foreground">{selectedRoom.name}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Verification Status</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">ID document uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Guest photo captured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Information verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-foreground">Digital Room Key</h3>
          
          <div className="text-center">
            {qrCode && (
              <div className="inline-block p-6 bg-white rounded-lg border border-border">
                <img
                  src={qrCode}
                  alt="Room Key QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            )}
            
            <div className="mt-6 space-y-2">
              <p className="text-lg font-medium text-foreground">Room {selectedRoom.id}</p>
              <p className="text-muted-foreground">Scan this QR code to access your room</p>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                <Icon name="Shield" size={16} />
                <span>Secure Digital Key</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Check-in Complete!</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your room is ready for occupancy</li>
              <li>• QR code is valid for your entire stay</li>
              <li>• Guest portal access has been created</li>
              <li>• Welcome email sent to {guestData.email}</li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => prev - 1)}
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
            variant="success"
            onClick={handleComplete}
            iconName="Check"
            iconPosition="left"
          >
            Complete Check-in
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckInProcess;