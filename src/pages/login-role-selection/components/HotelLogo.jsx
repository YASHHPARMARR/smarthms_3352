import React from 'react';
import Icon from '../../../components/AppIcon';

const HotelLogo = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-moderate">
        <Icon name="Building2" size={32} color="white" />
      </div>
      
      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        SmartHMS
      </h1>
      
      {/* Tagline */}
      <p className="text-muted-foreground text-lg">
        Hotel Management System
      </p>
      
      {/* Subtitle */}
      <p className="text-sm text-muted-foreground mt-2">
        Streamline operations with intelligent automation
      </p>
    </div>
  );
};

export default HotelLogo;