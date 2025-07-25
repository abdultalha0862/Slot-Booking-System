
import React from 'react';
import { useDoctors } from '@/hooks/useDoctors';
import DoctorCard from './DoctorCard';
import { Skeleton } from '@/components/ui/skeleton';

interface DoctorListProps {
  onBookAppointment: (doctor: any) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ onBookAppointment }) => {
  const { data: doctors, isLoading, error } = useDoctors();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Doctor</h1>
          <p className="text-gray-600">Meet our experienced medical professional</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-8 w-full mt-4" />
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
        <p className="text-red-600">Error loading doctors. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Doctor</h1>
        <p className="text-gray-600">Meet our experienced medical professional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={onBookAppointment}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
