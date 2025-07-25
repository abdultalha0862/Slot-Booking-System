
import React from 'react';
import { Star, Clock, Calendar, Award, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  consultation_fee: number;
  rating: number;
  qualification: string;
  bio: string;
  avatar_url?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full transform translate-x-10 -translate-y-10"></div>
      
      <CardContent className="p-8 relative">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {doctor.avatar_url ? (
                <img 
                  src={doctor.avatar_url} 
                  alt={doctor.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {doctor.name}
              </h3>
              <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-semibold text-blue-700">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <Stethoscope className="h-4 w-4 text-blue-600 mr-2" />
              <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
            </div>
            
            <p className="text-gray-600 font-medium mb-4">{doctor.qualification}</p>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">{doctor.experience_years} years exp</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Available Now</span>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4 leading-relaxed line-clamp-2">{doctor.bio}</p>
            
            <div className="flex items-center justify-between mt-6">
              <div>
                <span className="text-2xl font-bold text-green-600">₹{doctor.consultation_fee}</span>
                <span className="text-sm text-gray-600 ml-1">/ consultation</span>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-green-700">Available Today</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50/50 border-t border-gray-100">
        <Button 
          onClick={() => onBookAppointment(doctor)}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Book Appointment Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
