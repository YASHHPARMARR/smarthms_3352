import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TaskModal = ({ isOpen, onClose, task, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roomNumber: '',
    priority: 'medium',
    category: 'other',
    assignedTo: '',
    estimatedTime: '',
    dueDate: '',
    notes: '',
    photos: []
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        roomNumber: task.roomNumber || '',
        priority: task.priority || 'medium',
        category: task.category || 'other',
        assignedTo: task.assignedTo || '',
        estimatedTime: task.estimatedTime || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        notes: task.notes || '',
        photos: task.photos || []
      });
    }
  }, [task]);

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent Priority' }
  ];

  const categoryOptions = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'other', label: 'Other' }
  ];

  const technicianOptions = [
    { value: '', label: 'Unassigned' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'mike-wilson', label: 'Mike Wilson' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'david-brown', label: 'David Brown' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({
        ...task,
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1050 p-4">
      <div className="bg-card rounded-lg shadow-prominent max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Wrench" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Create New Task' : 
                 mode === 'edit' ? 'Edit Task' : 'Task Details'}
              </h2>
              {task && (
                <p className="text-sm text-muted-foreground">
                  Task #{task.id} • Room {task.roomNumber}
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={mode === 'view'}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={mode === 'view'}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Describe the maintenance issue..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Room Number"
                  value={formData.roomNumber}
                  onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                  disabled={mode === 'view'}
                  required
                />
                <Input
                  label="Estimated Time (hours)"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  disabled={mode === 'view'}
                  min="0.5"
                  step="0.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => handleInputChange('category', value)}
                  disabled={mode === 'view'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Assign to Technician"
                  options={technicianOptions}
                  value={formData.assignedTo}
                  onChange={(value) => handleInputChange('assignedTo', value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  disabled={mode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  disabled={mode === 'view'}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Any additional notes or special instructions..."
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Photos
                </label>
                {mode !== 'view' && (
                  <div className="mb-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-center">
                        <Icon name="Camera" size={24} className="mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload photos</p>
                      </div>
                    </label>
                  </div>
                )}

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-24 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={photo}
                            alt={`Task photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {mode !== 'view' && (
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-error text-error-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Task History (View Mode) */}
              {mode === 'view' && task && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Task History
                  </label>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{formatDate(task.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="font-medium">{formatDate(task.updatedAt)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium capitalize">{task.status.replace('-', ' ')}</span>
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-medium">{formatDate(task.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {mode !== 'view' && (
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
            >
              <Icon name="Save" size={16} className="mr-2" />
              {mode === 'create' ? 'Create Task' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;