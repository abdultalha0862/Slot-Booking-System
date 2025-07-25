
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DoctorList from './DoctorList';
import PatientAppointments from './PatientAppointments';

interface UserPortalProps {
  onBookAppointment: (doctor: any) => void;
  onLogout: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const UserPortal: React.FC<UserPortalProps> = ({ 
  onBookAppointment, 
  onLogout,
  currentView,
  setCurrentView 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">DocBook</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('doctors')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentView === 'doctors'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Find Doctors
              </button>
              <button
                onClick={() => setCurrentView('appointments')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentView === 'appointments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Appointments
              </button>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">Emergency: 108</span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'doctors' ? (
          <DoctorList onBookAppointment={onBookAppointment} />
        ) : (
          <PatientAppointments />
        )}
      </div>
    </div>
  );
};

export default UserPortal;
