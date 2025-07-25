
import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isAdmin: boolean;
  showLanding?: boolean;
  onSignIn?: () => void;
  onAdminPortal?: () => void;
  onUserPortal?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeView, 
  setActiveView, 
  isAdmin,
  showLanding = false,
  onSignIn,
  onAdminPortal,
  onUserPortal
}) => {
  if (showLanding) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <span className="text-xl font-bold text-gray-900">DocBook</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">Emergency: 108</span>
              </div>
              <Button 
                onClick={onUserPortal}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                User Portal
              </Button>
              <Button 
                onClick={onAdminPortal}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Admin Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default Navigation;
