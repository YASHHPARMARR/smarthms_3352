import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddRoomModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    floor: '',
    price: '',
    amenities: [],
    description: ''
  });

  const [errors, setErrors] = useState({});

  const roomTypeOptions = [
    { value: 'Deluxe AC', label: 'Deluxe AC' },
    { value: 'Deluxe Non-AC', label: 'Deluxe Non-AC' },
    { value: 'Suite AC', label: 'Suite AC' },
    { value: 'Suite Non-AC', label: 'Suite Non-AC' }
  ];

  const floorOptions = [
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
    { value: '4', label: 'Floor 4' }
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'tv', label: 'Television' },
    { value: 'minibar', label: 'Mini Bar' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'jacuzzi', label: 'Jacuzzi' },
    { value: 'kitchenette', label: 'Kitchenette' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.number.trim()) {
      newErrors.number = 'Room number is required';
    }

    if (!formData.type) {
      newErrors.type = 'Room type is required';
    }

    if (!formData.floor) {
      newErrors.floor = 'Floor is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newRoom = {
        id: Date.now(),
        number: formData.number,
        type: formData.type,
        floor: parseInt(formData.floor),
        price: parseFloat(formData.price),
        status: 'Available',
        housekeepingStatus: 'Clean',
        lastCleaned: new Date().toISOString(),
        amenities: formData.amenities,
        description: formData.description,
        guest: null,
        checkIn: null,
        checkOut: null,
        maintenance: null
      };

      onSave(newRoom);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      number: '',
      type: '',
      floor: '',
      price: '',
      amenities: [],
      description: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1030 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Room</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Room Number */}
          <Input
            label="Room Number"
            type="text"
            placeholder="e.g., 101, A-205"
            value={formData.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            error={errors.number}
            required
          />

          {/* Room Type */}
          <Select
            label="Room Type"
            options={roomTypeOptions}
            value={formData.type}
            onChange={(value) => handleInputChange('type', value)}
            error={errors.type}
            placeholder="Select room type"
            required
          />

          {/* Floor */}
          <Select
            label="Floor"
            options={floorOptions}
            value={formData.floor}
            onChange={(value) => handleInputChange('floor', value)}
            error={errors.floor}
            placeholder="Select floor"
            required
          />

          {/* Price */}
          <Input
            label="Price per Night"
            type="number"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            error={errors.price}
            min="0"
            step="0.01"
            required
          />

          {/* Amenities */}
          <Select
            label="Amenities"
            options={amenityOptions}
            value={formData.amenities}
            onChange={(value) => handleInputChange('amenities', value)}
            multiple
            placeholder="Select amenities"
            description="Choose available amenities for this room"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Optional room description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;