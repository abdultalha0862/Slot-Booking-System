
import { useQuery } from '@tanstack/react-query';

export interface Department {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Cardiology',
    description: 'Heart and cardiovascular care',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Neurology',
    description: 'Brain and nervous system care',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Orthopedics',
    description: 'Bone and joint care',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Pediatrics',
    description: 'Children healthcare',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDepartments.filter(dept => dept.is_active);
    },
  });
};
