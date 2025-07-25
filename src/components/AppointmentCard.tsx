
import React from 'react';
import { Clock, User, Phone, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  timeSlot: string;
  status: AppointmentStatus;
  queueNumber: number;
  reason: string;
  isEmergency?: boolean;
}

interface AppointmentCardProps {
  appointment: Appointment;
  isAdmin?: boolean;
  onUpdateStatus?: (appointmentId: string, status: AppointmentStatus) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  isAdmin = false, 
  onUpdateStatus 
}) => {
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {isAdmin && (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{appointment.queueNumber}</span>
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">
                  {isAdmin ? appointment.patientName : `Dr. ${appointment.doctorName}`}
                </h3>
                {appointment.isEmergency && (
                  <Badge className="bg-red-100 text-red-800 text-xs">Emergency</Badge>
                )}
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{appointment.appointmentDate}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{appointment.timeSlot}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{appointment.patientPhone}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{appointment.reason}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(appointment.status)}>
              {getStatusText(appointment.status)}
            </Badge>
            
            {isAdmin && appointment.status === 'pending' && (
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateStatus?.(appointment.id, 'confirmed')}
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateStatus?.(appointment.id, 'cancelled')}
                >
                  Cancel
                </Button>
              </div>
            )}
            
            {isAdmin && appointment.status === 'confirmed' && (
              <Button
                size="sm"
                onClick={() => onUpdateStatus?.(appointment.id, 'in-progress')}
              >
                Start
              </Button>
            )}
            
            {isAdmin && appointment.status === 'in-progress' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateStatus?.(appointment.id, 'completed')}
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
