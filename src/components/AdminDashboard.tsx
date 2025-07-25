import React from 'react';
import { Clock, Users, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppointments, useUpdateAppointmentStatus } from '@/hooks/useAppointments';
import { useDoctors } from '@/hooks/useDoctors';
import AppointmentCard from './AppointmentCard';
import MetricsCard from './MetricsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { data: appointments, isLoading: appointmentsLoading } = useAppointments();
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const updateAppointmentStatus = useUpdateAppointmentStatus();
  const { toast } = useToast();

  const handleUpdateAppointment = async (appointmentId: string, status: any) => {
    try {
      await updateAppointmentStatus.mutateAsync({ appointmentId, status });
      toast({
        title: "Appointment Updated",
        description: `Appointment status changed to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status",
        variant: "destructive",
      });
    }
  };

  if (appointmentsLoading || doctorsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Real-time clinic management overview</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const todayAppointments = appointments?.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.appointment_date === today;
  }) || [];

  const pendingAppointments = todayAppointments.filter(apt => apt.status === 'pending');
  const inProgressAppointments = todayAppointments.filter(apt => apt.status === 'in-progress');
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed');
  const emergencyAppointments = todayAppointments.filter(apt => apt.is_emergency);

  const metrics = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length.toString(),
      subtitle: "+12% from yesterday",
      icon: <Calendar className="h-5 w-5 text-white" />,
      iconColor: "bg-blue-500"
    },
    {
      title: "Pending Approvals",
      value: pendingAppointments.length.toString(),
      subtitle: `${pendingAppointments.length} need attention`,
      icon: <Clock className="h-5 w-5 text-white" />,
      iconColor: "bg-orange-500"
    },
    {
      title: "Active Doctors",
      value: doctors?.length.toString() || "0",
      subtitle: "All specialists available",
      icon: <Users className="h-5 w-5 text-white" />,
      iconColor: "bg-green-500"
    },
    {
      title: "Emergency Cases",
      value: emergencyAppointments.length.toString(),
      subtitle: emergencyAppointments.length > 0 ? "Requires immediate attention" : "No emergencies",
      icon: <AlertCircle className="h-5 w-5 text-white" />,
      iconColor: emergencyAppointments.length > 0 ? "bg-red-500" : "bg-green-500"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Real-time clinic management overview</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Live Appointments Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Appointments */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Appointments</h2>
            <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
              {pendingAppointments.length}
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingAppointments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No pending appointments</p>
              </div>
            ) : (
              pendingAppointments.map(appointment => (
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
                  isAdmin={true}
                  onUpdateStatus={handleUpdateAppointment}
                />
              ))
            )}
          </div>
        </div>

        {/* In Progress Appointments */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">In Progress</h2>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
              {inProgressAppointments.length}
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {inProgressAppointments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No appointments in progress</p>
              </div>
            ) : (
              inProgressAppointments.map(appointment => (
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
                  isAdmin={true}
                  onUpdateStatus={handleUpdateAppointment}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
