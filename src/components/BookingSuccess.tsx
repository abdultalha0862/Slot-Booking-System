
import React from 'react';
import { Check, Calendar, Phone, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BookingSuccessProps {
  appointmentData: {
    patientName: string;
    doctorName: string;
    appointmentDate: string;
    timeSlot: string;
    queueNumber: number;
    patientPhone: string;
  };
  onBookAnother: () => void;
  onViewAppointments: () => void;
  onBackToHome: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  appointmentData,
  onBookAnother,
  onViewAppointments,
  onBackToHome
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const maskPhoneNumber = (phone: string) => {
    if (phone.length >= 4) {
      return `+91-XXXX-${phone.slice(-4)}`;
    }
    return '+91-XXXX-XXXX';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your slot has been successfully reserved</p>
        </div>

        {/* Appointment Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Queue Number: #{appointmentData.queueNumber}
              </div>
              <div className="text-gray-600">
                {formatDate(appointmentData.appointmentDate)} at {appointmentData.timeSlot}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Doctor</h3>
                <p className="text-gray-600">{appointmentData.doctorName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Time</h3>
                <p className="text-gray-600">{appointmentData.timeSlot}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Date</h3>
                <p className="text-gray-600">{formatDate(appointmentData.appointmentDate)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Queue Number</h3>
                <p className="text-gray-600">#{appointmentData.queueNumber}</p>
              </div>
            </div>

            {/* SMS Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">SMS Confirmation Sent</h4>
                  <p className="text-blue-700 text-sm">
                    An SMS confirmation has been sent to {maskPhoneNumber(appointmentData.patientPhone)} with your appointment details.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <p className="text-orange-800 text-sm">
                  Please arrive 10 minutes early with a valid ID. Need to reschedule? Call the clinic at +91-123-456-7890.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onBookAnother}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            Book Another Appointment
          </Button>
          
          <Button 
            onClick={onViewAppointments}
            variant="outline"
            className="w-full py-3"
          >
            <Calendar className="h-4 w-4 mr-2" />
            View All Appointments
          </Button>
          
          <Button 
            onClick={onBackToHome}
            variant="ghost"
            className="w-full py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Rating Section */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <Star className="h-5 w-5" />
              <span className="font-medium">Rate Your Booking Experience</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Bring a valid photo ID and any relevant medical documents</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Your queue number will be called in order of booking</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
