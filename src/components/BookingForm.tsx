import React, { useState } from 'react';
import { Calendar, Clock, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateAppointment } from '@/hooks/useAppointments';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultation_fee: number;
}

interface BookingFormProps {
  doctor: Doctor;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ doctor, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientPhone: '',
    appointmentDate: '',
    timeSlot: '',
    reason: '',
    symptoms: '',
    isEmergency: false
  });

  const createAppointment = useCreateAppointment();
  const { toast } = useToast();

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const appointmentData = await createAppointment.mutateAsync({
        doctorId: doctor.id,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        patientAge: parseInt(formData.patientAge),
        appointmentDate: formData.appointmentDate,
        timeSlot: formData.timeSlot,
        reason: formData.reason,
        symptoms: formData.symptoms,
        isEmergency: formData.isEmergency,
      });

      // Transform the data to match the expected format
      const transformedData = {
        patientName: appointmentData.patients?.name || formData.patientName,
        doctorName: appointmentData.doctors?.name || doctor.name,
        appointmentDate: appointmentData.appointment_date,
        timeSlot: appointmentData.time_slot,
        queueNumber: appointmentData.queue_number,
        patientPhone: appointmentData.patients?.phone || formData.patientPhone,
      };

      onSubmit(transformedData);
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with Dr. ${doctor.name} has been scheduled for ${formData.appointmentDate} at ${formData.timeSlot}. Queue number: ${appointmentData.queue_number}`,
      });
    } catch (error: any) {
      let message = "Failed to create appointment. Please try again.";
      if (error?.message) {
        message = error.message;
      }
      toast({
        title: "Booking Failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Book Appointment</CardTitle>
            <p className="text-gray-600 mt-1">
              with Dr. {doctor.name} - {doctor.specialty}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.isEmergency && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Emergency Appointment - Priority Booking</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleChange('patientName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="patientAge">Age</Label>
                <Input
                  id="patientAge"
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) => handleChange('patientAge', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="patientPhone">Phone Number</Label>
              <Input
                id="patientPhone"
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleChange('patientPhone', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointmentDate">Date</Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => handleChange('appointmentDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Select onValueChange={(value) => handleChange('timeSlot', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) => handleChange('reason', e.target.value)}
                placeholder="e.g., Regular checkup, Consultation"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="symptoms">Symptoms (Optional)</Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => handleChange('symptoms', e.target.value)}
                placeholder="Describe your symptoms..."
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergency"
                checked={formData.isEmergency}
                onChange={(e) => handleChange('isEmergency', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="emergency" className="text-red-600 font-medium">
                Mark as Emergency (Priority Booking)
              </Label>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Consultation Fee:</span>
                <span className="text-lg font-bold text-green-600">₹{doctor.consultation_fee}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={createAppointment.isPending}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {createAppointment.isPending ? 'Booking...' : 'Book Appointment'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
