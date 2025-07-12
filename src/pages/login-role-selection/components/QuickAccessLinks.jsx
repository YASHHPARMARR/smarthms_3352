import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessLinks = ({ onForgotPassword, isLoading }) => {
  const navigate = useNavigate();

  const handleGuestPortal = () => {
    // Mock guest portal access - in real app this would authenticate as guest
    navigate('/admin-dashboard');
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Quick Access
          </span>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleGuestPortal}
          disabled={isLoading}
          className="justify-start h-12"
        >
          <Icon name="User" size={18} className="mr-3" />
          <div className="text-left">
            <div className="font-medium">Guest Portal</div>
            <div className="text-xs text-muted-foreground">Quick access</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onForgotPassword}
          disabled={isLoading}
          className="justify-start h-12"
        >
          <Icon name="HelpCircle" size={18} className="mr-3" />
          <div className="text-left">
            <div className="font-medium">Forgot Password</div>
            <div className="text-xs text-muted-foreground">Reset access</div>
          </div>
        </Button>
      </div>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <button
          onClick={() => {}}
          className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          disabled={isLoading}
        >
          Need help? Contact support
        </button>
        
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} SmartHMS</span>
          <span>•</span>
          <button className="hover:text-foreground transition-smooth">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-smooth">
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessLinks;