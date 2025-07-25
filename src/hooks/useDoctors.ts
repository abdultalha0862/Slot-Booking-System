
import { useQuery } from '@tanstack/react-query';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  rating: number;
  bio: string | null;
  avatar_url: string | null;
  department_id: string | null;
  is_active: boolean;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD Internal Medicine',
    experience_years: 8,
    consultation_fee: 500,
    rating: 4.8,
    bio: 'Dr. Sarah Johnson is a dedicated general practitioner with extensive experience in preventive care and chronic disease management.',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    department_id: null,
    is_active: true,
  },
];

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDoctors;
    },
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const doctor = mockDoctors.find(d => d.id === id);
      if (!doctor) throw new Error('Doctor not found');
      return doctor;
    },
    enabled: !!id,
  });
};
