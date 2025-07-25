
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserPortal from '../components/UserPortal';
import AdminPortal from '../components/AdminPortal';
import AdminLogin from '../components/AdminLogin';
import BookingForm from '../components/BookingForm';
import BookingSuccess from '../components/BookingSuccess';
import LandingPage from '../components/LandingPage';
import Navigation from '../components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'user' | 'admin' | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [userPortalView, setUserPortalView] = useState('doctors');
  const [lastBookedAppointment, setLastBookedAppointment] = useState<any>(null);
  const { toast } = useToast();

  const handleSignIn = (type: 'user' | 'admin') => {
    setUserType(type);
    if (type === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('user');
      setUserPortalView('doctors');
    }
  };

  const handleSignUp = () => {
    setAuthView('signin');
    toast({
      title: "Account Created!",
      description: "Please sign in with your new account.",
    });
  };

  const handleLogout = async () => {
    setUserType(null);
    setCurrentView('landing');
  };

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (appointmentData: any) => {
    setShowBookingForm(false);
    setLastBookedAppointment(appointmentData);
    setCurrentView('booking-success');
  };

  const handleBookNow = () => {
    setCurrentView('auth');
    setAuthView('signin');
  };

  const handleEmergencyBooking = () => {
    setCurrentView('auth');
    setAuthView('signin');
    toast({
      title: "Emergency Booking",
      description: "Please sign in first to book an emergency appointment.",
      variant: "destructive",
    });
  };

  const handleUserPortal = () => {
    setCurrentView('auth');
    setAuthView('signin');
  };

  const handleAdminPortal = () => {
    setCurrentView('admin-login');
  };

  const handleAdminLogin = (email: string, password: string) => {
    if (email === 'admin@docbook.com' && password === 'admin123') {
      handleSignIn('admin');
      toast({
        title: "Admin Login Successful!",
        description: "Welcome to DocBook Admin Dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };

  const handleBookAnotherFromSuccess = () => {
    setCurrentView('user');
    setUserPortalView('doctors');
  };

  const handleViewAppointmentsFromSuccess = () => {
    setCurrentView('user');
    setUserPortalView('appointments');
  };

  const handleBackToHomeFromSuccess = () => {
    setCurrentView('landing');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return (
          <>
            <Navigation 
              activeView={currentView}
              setActiveView={setCurrentView}
              isAdmin={false}
              showLanding={true}
              onUserPortal={handleUserPortal}
              onAdminPortal={handleAdminPortal}
            />
            <LandingPage 
              onBookNow={handleBookNow}
              onEmergencyBooking={handleEmergencyBooking}
            />
          </>
        );
      case 'admin-login':
        return (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onBack={() => setCurrentView('landing')}
          />
        );
      case 'auth':
        return authView === 'signin' ? (
          <SignIn 
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAuthView('signup')}
          />
        ) : (
          <SignUp 
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView('signin')}
          />
        );
      case 'user':
        return (
          <UserPortal
            onBookAppointment={handleBookAppointment}
            onLogout={handleLogout}
            currentView={userPortalView}
            setCurrentView={setUserPortalView}
          />
        );
      case 'admin':
        return (
          <AdminPortal onLogout={handleLogout} />
        );
      case 'booking-success':
        return lastBookedAppointment ? (
          <BookingSuccess
            appointmentData={lastBookedAppointment}
            onBookAnother={handleBookAnotherFromSuccess}
            onViewAppointments={handleViewAppointmentsFromSuccess}
            onBackToHome={handleBackToHomeFromSuccess}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}

      {showBookingForm && selectedDoctor && (
        <BookingForm
          doctor={selectedDoctor}
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default Index;
