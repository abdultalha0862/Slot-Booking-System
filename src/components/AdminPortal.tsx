import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  FileText, 
  Clock,
  AlertTriangle,
  CalendarDays,
  UserCheck,
  RefreshCw,
  Moon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppointments } from '@/hooks/useAppointments';
import { useAppointmentNotifications, useRegisteredUsers } from '@/hooks/useAppointments';
import { useDoctors } from '@/hooks/useDoctors';
import { useToast } from '@/hooks/use-toast';

interface AdminPortalProps {
  onLogout: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: appointments, isLoading: appointmentsLoading, refetch } = useAppointments();
  const { data: doctors } = useDoctors();
  const { data: registeredUsers, isLoading: usersLoading } = useRegisteredUsers();
  const { toast } = useToast();
  
  // Set up real-time notifications for new appointments
  useAppointmentNotifications();

  // Update timestamp when appointments change
  React.useEffect(() => {
    if (appointments) {
      setLastUpdate(new Date());
      console.log('📊 Admin portal received appointments:', appointments.length);
    }
  }, [appointments]);

  // Auto-refresh every 30 seconds to ensure data is current
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing admin data...');
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: currentView === 'dashboard' },
    { id: 'appointments', label: 'Appointments', icon: Clock, active: currentView === 'appointments' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, active: currentView === 'calendar' },
    { id: 'patients', label: 'Patients', icon: Users, active: currentView === 'patients' },
    { id: 'reports', label: 'Reports', icon: FileText, active: currentView === 'reports' },
    { id: 'settings', label: 'Settings', icon: Settings, active: currentView === 'settings' }
  ];

  // Calculate dashboard metrics with better date handling
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Filter appointments by date
  const getAppointmentsByDate = (date: Date) => {
    const dateString = formatDate(date);
    return appointments?.filter(apt => apt.appointment_date === dateString) || [];
  };

  const todayAppointments = getAppointmentsByDate(today);
  const tomorrowAppointments = getAppointmentsByDate(tomorrow);
  const yesterdayAppointments = getAppointmentsByDate(yesterday);
  const selectedDateAppointments = getAppointmentsByDate(selectedDate);

  // Calculate metrics
  const totalPatients = appointments?.length || 0;
  const pendingAppointments = todayAppointments.filter(apt => apt.status === 'pending').length;
  const totalRevenue = todayAppointments.reduce((sum, apt) => {
    const doctor = doctors?.find(doc => doc.id === apt.doctor_id);
    return sum + (doctor?.consultation_fee || 0);
  }, 0);

  const handleRefresh = async () => {
    console.log('🔄 Refreshing admin dashboard data...');
    setIsRefreshing(true);
    
    try {
      await refetch();
      console.log('✅ Admin dashboard data refreshed, appointments count:', appointments?.length || 0);
      toast({
        title: "Refreshed",  
        description: `Dashboard updated with ${appointments?.length || 0} appointments`,
      });
    } catch (error) {
      console.error('❌ Error refreshing data:', error);
      toast({
        title: "Refresh Failed",
        description: "Could not refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Header with Date Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your clinic management dashboard</p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-2 bg-white rounded-lg border p-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates Active</span>
            </div>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm" 
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Date Filters */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={formatDate(selectedDate) === formatDate(yesterday) ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate(yesterday)}
        >
          Yesterday ({yesterdayAppointments.length})
        </Button>
        <Button 
          variant={formatDate(selectedDate) === formatDate(today) ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate(today)}
        >
          Today ({todayAppointments.length})
        </Button>
        <Button 
          variant={formatDate(selectedDate) === formatDate(tomorrow) ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDate(tomorrow)}
        >
          Tomorrow ({tomorrowAppointments.length})
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Registered Users</p>
                <p className="text-2xl font-bold text-gray-900">{registeredUsers?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CalendarDays className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingAppointments}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-purple-600 font-bold text-lg">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Appointments Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Appointments for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long', 
              day: 'numeric' 
            })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Live Queue</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {appointmentsLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Loading appointments...</span>
            </div>
          ) : selectedDateAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <CalendarDays className="h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                No appointments scheduled for {selectedDate.toLocaleDateString()}
              </p>
              {formatDate(selectedDate) === formatDate(today) && (
                <p className="text-sm text-gray-400 mt-2">
                  Appointments will appear here as users book them
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateAppointments
                .sort((a, b) => a.queue_number - b.queue_number)
                .map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">#{appointment.queue_number}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patients?.name}</p>
                      <p className="text-sm text-gray-600">Dr. {appointment.doctors?.name}</p>
                      <p className="text-xs text-gray-500">{appointment.reason}</p>
                      {appointment.is_emergency && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full mt-1">
                          🚨 Emergency
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time_slot}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {appointment.patients?.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Information Panel */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-blue-800">Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Appointments</p>
              <p className="font-semibold text-blue-900">{appointments?.length || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Today's Appointments</p>
              <p className="font-semibold text-blue-900">{todayAppointments.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Pending Approval</p>
              <p className="font-semibold text-blue-900">{pendingAppointments}</p>
            </div>
            <div>
              <p className="text-gray-600">Loading Status</p>
              <p className="font-semibold text-blue-900">{appointmentsLoading ? 'Loading...' : 'Ready'}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="text-xs text-gray-600">
              📊 Data Source: Supabase Database • 
              🔄 Real-time: Enabled • 
              ⏰ Last Update: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Emergency Queue</p>
                <p className="text-sm text-gray-600">Manage urgent appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Schedule Management</p>
                <p className="text-sm text-gray-600">Manage doctor schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Patient Records</p>
                <p className="text-sm text-gray-600">Access patient database</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRegisteredUsers = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registered Users</h1>
          <p className="text-gray-600">All users who have registered on the platform</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Total Users: {registeredUsers?.length || 0}</span>
        </div>
      </div>

      {usersLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading registered users...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Appointments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registeredUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">Age: {user.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.appointments?.length || 0} appointments
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.appointments && user.appointments.length > 0 ? (
                        <div>
                          {new Date(Math.max(...user.appointments.map(apt => new Date(apt.created_at).getTime()))).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-gray-400">No appointments</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {(!registeredUsers || registeredUsers.length === 0) && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No registered users</h3>
              <p className="mt-1 text-sm text-gray-500">
                Users will appear here once they register on the platform.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return renderRegisteredUsers();
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {sidebarItems.find(item => item.id === currentView)?.label}
            </h1>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">DocBook</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Moon className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Panel</h2>
            <p className="text-sm text-gray-600">Clinic Management</p>
          </div>
          <nav className="px-3">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
