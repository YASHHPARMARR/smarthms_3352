import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RoleSelector = ({ availableRoles, onRoleSelect, onBack, isLoading }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roleOptions = [
    { value: 'admin', label: 'Administrator', description: 'Full system access and management' },
    { value: 'receptionist', label: 'Receptionist', description: 'Guest check-in/out and bookings' },
    { value: 'room-service', label: 'Room Service Manager', description: 'Food orders and guest services' },
    { value: 'maintenance', label: 'Maintenance Manager', description: 'Facility repairs and upkeep' },
    { value: 'security', label: 'Security Manager', description: 'Guest safety and access control' },
    { value: 'guest', label: 'Guest Portal', description: 'Self-service guest access' }
  ].filter(role => availableRoles.includes(role.value));

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  const getRoleIcon = (roleValue) => {
    const roleIcons = {
      'admin': 'Shield',
      'receptionist': 'UserCheck',
      'room-service': 'Coffee',
      'maintenance': 'Wrench',
      'security': 'Lock',
      'guest': 'User'
    };
    return roleIcons[roleValue] || 'User';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Select Your Role
        </h2>
        <p className="text-muted-foreground">
          Choose the role you want to access for this session
        </p>
      </div>

      {/* Role Selection */}
      <div>
        <Select
          label="Available Roles"
          description="Select the role that matches your current responsibilities"
          options={roleOptions}
          value={selectedRole}
          onChange={handleRoleChange}
          placeholder="Choose your role..."
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>

      {/* Selected Role Preview */}
      {selectedRole && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={getRoleIcon(selectedRole)} 
                size={20} 
                className="text-primary" 
              />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {roleOptions.find(r => r.value === selectedRole)?.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {roleOptions.find(r => r.value === selectedRole)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back
        </Button>
        
        <Button
          variant="default"
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          loading={isLoading}
          className="flex-1"
        >
          Continue
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;