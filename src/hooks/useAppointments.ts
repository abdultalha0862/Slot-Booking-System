import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_date: string;
  time_slot: string;
  reason: string;
  symptoms: string | null;
  status: AppointmentStatus;
  queue_number: number;
  is_emergency: boolean;
  created_at: string;
  updated_at: string;
  doctors?: {
    name: string;
    specialty: string;
  };
  patients?: {
    name: string;
    phone: string;
    age: number;
  };
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
  created_at: string;
  appointments?: Appointment[];
}

// Mock data storage
let mockAppointments: Appointment[] = [];
let mockUsers: RegisteredUser[] = [];
let appointmentIdCounter = 1;
let userIdCounter = 1;
let globalQueueCounter = 1; // Global queue counter for first-come-first-serve

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAppointments;
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData: {
      doctorId: string;
      patientName: string;
      patientPhone: string;
      patientAge: number;
      appointmentDate: string;
      timeSlot: string;
      reason: string;
      symptoms?: string;
      isEmergency: boolean;
    }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Assign queue number based on first-come-first-serve
      const queueNumber = globalQueueCounter;
      globalQueueCounter++; // Increment for next appointment

      const newAppointment: Appointment = {
        id: appointmentIdCounter.toString(),
        doctor_id: appointmentData.doctorId,
        patient_id: `patient_${appointmentIdCounter}`,
        appointment_date: appointmentData.appointmentDate,
        time_slot: appointmentData.timeSlot,
        reason: appointmentData.reason,
        symptoms: appointmentData.symptoms || null,
        status: 'pending',
        queue_number: queueNumber,
        is_emergency: appointmentData.isEmergency,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        doctors: {
          name: 'Sarah Johnson',
          specialty: 'General Medicine',
        },
        patients: {
          name: appointmentData.patientName,
          phone: appointmentData.patientPhone,
          age: appointmentData.patientAge,
        },
      };

      mockAppointments.push(newAppointment);
      appointmentIdCounter++;
      
      console.log(`📋 New appointment created with queue number: ${queueNumber}`);
      console.log(`📊 Total appointments: ${mockAppointments.length}`);
      
      return newAppointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, status }: { appointmentId: string; status: AppointmentStatus }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const appointmentIndex = mockAppointments.findIndex(apt => apt.id === appointmentId);
      if (appointmentIndex === -1) throw new Error('Appointment not found');
      
      mockAppointments[appointmentIndex].status = status;
      mockAppointments[appointmentIndex].updated_at = new Date().toISOString();
      
      return mockAppointments[appointmentIndex];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

export const useUserAppointments = () => {
  return useQuery({
    queryKey: ['userAppointments'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Return all appointments for demo purposes
      return mockAppointments;
    },
  });
};

export const useAppointmentNotifications = () => {
  // Empty implementation for mock data
};

export const useRegisteredUsers = () => {
  return useQuery({
    queryKey: ['registered-users'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Add appointments data to each user
      const usersWithAppointments = mockUsers.map(user => ({
        ...user,
        appointments: mockAppointments.filter(apt => apt.patients?.phone === user.phone)
      }));
      return usersWithAppointments;
    },
  });
};

// User management functions
export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      phone: string;
      age: number;
      password: string;
    }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        throw new Error('User already registered with this email');
      }

      const newUser: RegisteredUser = {
        id: userIdCounter.toString(),
        name: userData.name,
        email: userData.email.toLowerCase(),
        phone: userData.phone,
        age: userData.age,
        password: userData.password, // In real app, this would be hashed
        created_at: new Date().toISOString(),
      };

      mockUsers.push(newUser);
      userIdCounter++;
      
      console.log(`👤 New user registered: ${userData.email}`);
      console.log(`📊 Total registered users: ${mockUsers.length}`);
      
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registered-users'] });
    },
  });
};

export const useAuthenticateUser = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo admin credentials
      if (credentials.email === 'admin@docbook.com' && credentials.password === 'admin123') {
        return { userType: 'admin' as const, user: null };
      }

      // Check registered users
      const user = mockUsers.find(
        u => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
      );

      if (user) {
        return { userType: 'user' as const, user };
      }

      // Fallback for demo purposes - accept any email/password for users
      if (credentials.email && credentials.password) {
        return { userType: 'user' as const, user: null };
      }

      throw new Error('Invalid credentials');
    },
  });
};
