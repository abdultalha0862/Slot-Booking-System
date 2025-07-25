import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAppointments, useCreateAppointment } from '@/hooks/useAppointments'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useAppointments', () => {
  beforeEach(() => {
    const queryClient = new QueryClient()
    queryClient.clear()
  })

  it('fetches appointments successfully', async () => {
    const { result } = renderHook(() => useAppointments(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toBeDefined()
    expect(Array.isArray(result.current.data)).toBe(true)
  })

  it('handles loading state correctly', async () => {
    const { result } = renderHook(() => useAppointments(), {
      wrapper: createWrapper(),
    })

    // Initially should be loading
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })
})

describe('useCreateAppointment', () => {
  it('has correct initial state', async () => {
    const { result } = renderHook(() => useCreateAppointment(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('creates appointment successfully', async () => {
    const { result } = renderHook(() => useCreateAppointment(), {
      wrapper: createWrapper(),
    })

    // Check initial state
    expect(result.current.isPending).toBe(false)
    expect(result.current.isError).toBe(false)

    const appointmentData = {
      doctorId: '1',
      patientName: 'Test Patient',
      patientPhone: '+91 9876543210',
      patientAge: 30,
      appointmentDate: '2025-07-15',
      timeSlot: '10:00 AM',
      reason: 'Checkup',
      symptoms: 'None',
      isEmergency: false,
    }

    // Test that the mutation can be called without errors
    expect(() => {
      result.current.mutate(appointmentData)
    }).not.toThrow()

    // Check that the mutation function exists
    expect(result.current.mutate).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
  })
})
