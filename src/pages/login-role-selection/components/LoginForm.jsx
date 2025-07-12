import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(formData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          error={validationErrors.email}
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={validationErrors.password}
          required
          disabled={isLoading}
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          disabled={isLoading}
        >
          <Icon 
            name={showPassword ? "EyeOff" : "Eye"} 
            size={20} 
          />
        </button>
      </div>

      {/* Global Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
          <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;