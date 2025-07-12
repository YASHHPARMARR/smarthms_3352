import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      description: 'Your data is protected'
    },
    {
      icon: 'Lock',
      text: 'Secure Login',
      description: 'Industry standard security'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified System',
      description: 'Trusted by hotels worldwide'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Trusted & Secure Platform
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon 
                name={feature.icon} 
                size={14} 
                className="text-success" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {feature.text}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityIndicators;