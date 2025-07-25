
import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentCard from './AppointmentCard';
import { Skeleton } from '@/components/ui/skeleton';

const PatientAppointments: React.FC = () => {
  const { data: appointments, isLoading, error } = useAppointments();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your upcoming and past appointments</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading appointments. Please try again.</p>
      </div>
    );
  }

  const upcomingAppointments = appointments?.filter(
    apt => apt.status !== 'completed' && apt.status !== 'cancelled'
  ) || [];
  
  const pastAppointments = appointments?.filter(
    apt => apt.status === 'completed' || apt.status === 'cancelled'
  ) || [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past appointments</p>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming appointments</p>
            <p className="text-sm mt-1">Book your first appointment to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={{
                  id: appointment.id,
                  doctorName: appointment.doctors?.name || 'Unknown Doctor',
                  patientName: appointment.patients?.name || 'Unknown Patient',
                  patientPhone: appointment.patients?.phone || '',
                  appointmentDate: appointment.appointment_date,
                  timeSlot: appointment.time_slot,
                  status: appointment.status,
                  queueNumber: appointment.queue_number,
                  reason: appointment.reason,
                  isEmergency: appointment.is_emergency,
                }}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={{
                  id: appointment.id,
                  doctorName: appointment.doctors?.name || 'Unknown Doctor',
                  patientName: appointment.patients?.name || 'Unknown Patient',
                  patientPhone: appointment.patients?.phone || '',
                  appointmentDate: appointment.appointment_date,
                  timeSlot: appointment.time_slot,
                  status: appointment.status,
                  queueNumber: appointment.queue_number,
                  reason: appointment.reason,
                  isEmergency: appointment.is_emergency,
                }}
                isAdmin={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
