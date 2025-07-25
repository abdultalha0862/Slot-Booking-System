import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data helpers for tests
export const createMockDoctor = (overrides = {}) => ({
  id: '1',
  name: 'Dr. Test Doctor',
  specialty: 'General Medicine',
  qualification: 'MBBS, MD',
  experience_years: 5,
  consultation_fee: 500,
  rating: 4.5,
  bio: 'Test doctor bio',
  avatar_url: 'https://example.com/avatar.jpg',
  ...overrides,
})

export const createMockAppointment = (overrides = {}) => ({
  id: '1',
  doctorId: '1',
  doctorName: 'Dr. Test Doctor',
  patientName: 'Test Patient',
  patientPhone: '+91 9876543210',
  patientAge: 30,
  appointmentDate: new Date().toISOString().split('T')[0],
  timeSlot: '10:00 AM',
  reason: 'Test appointment',
  symptoms: 'Test symptoms',
  status: 'pending' as const,
  queueNumber: 1,
  isEmergency: false,
  ...overrides,
})

export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  phone: '+91 9876543210',
  age: 30,
  password: 'hashedpassword',
  created_at: new Date().toISOString(),
  ...overrides,
})
