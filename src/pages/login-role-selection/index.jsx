import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import HotelLogo from './components/HotelLogo';
import LoginForm from './components/LoginForm';
import RoleSelector from './components/RoleSelector';
import QuickAccessLinks from './components/QuickAccessLinks';
import SecurityIndicators from './components/SecurityIndicators';

const LoginRoleSelection = () => {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' or 'role-selection'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCredentials, setUserCredentials] = useState(null);
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();

  // Role mappings for navigation
  const roleRoutes = {
    'admin': '/admin-dashboard',
    'receptionist': '/guest-booking-check-in',
    'room_service_manager': '/room-service-management',
    'maintenance_manager': '/maintenance-task-management',
    'security_manager': '/admin-dashboard',
    'guest': '/admin-dashboard'
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    clearError();

    try {
      const result = await signIn(formData.email, formData.password);

      if (!result?.success) {
        setError(result?.error || authError || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // Login successful - navigate based on user role
      // For now, navigate to admin dashboard for all users
      // In future versions, role-based routing will be implemented
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    setIsLoading(true);

    try {
      // Simulate role setup delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to appropriate dashboard based on role
      navigate(roleRoutes[selectedRole] || '/admin-dashboard');
    } catch (err) {
      setError('Role selection failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setError('');
    setUserCredentials(null);
    clearError();
  };

  const handleForgotPassword = () => {
    // For demo purposes, show available credentials
    alert('Password reset functionality is available. For demo purposes, use the provided mock credentials below.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-prominent p-8">
          {/* Logo Section */}
          <HotelLogo />

          {/* Form Content */}
          <div className="space-y-6">
            {currentStep === 'login' ? (
              <>
                {/* Login Form */}
                <LoginForm
                  onLogin={handleLogin}
                  isLoading={isLoading}
                  error={error || authError}
                />

                {/* Quick Access Links */}
                <QuickAccessLinks
                  onForgotPassword={handleForgotPassword}
                  isLoading={isLoading}
                />
              </>
            ) : (
              /* Role Selection */
              <RoleSelector
                availableRoles={userCredentials?.roles || []}
                onRoleSelect={handleRoleSelection}
                onBack={handleBackToLogin}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Security Indicators */}
          {currentStep === 'login' && <SecurityIndicators />}
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Demo Credentials (Supabase):</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Admin:</strong> admin@smarthms.com / admin123</p>
            <p><strong>Receptionist:</strong> receptionist@smarthms.com / reception123</p>
            <p><strong>Room Service:</strong> roomservice@smarthms.com / service123</p>
            <p><strong>Maintenance:</strong> maintenance@smarthms.com / maintain123</p>
            <p><strong>Security:</strong> security@smarthms.com / secure123</p>
            <p><strong>Guest:</strong> guest@smarthms.com / guest123</p>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            <p>🔗 Now powered by Supabase authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRoleSelection;