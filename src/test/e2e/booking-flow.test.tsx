import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import LandingPage from '@/components/LandingPage'
import DoctorList from '@/components/DoctorList'

describe('E2E: Application Components', () => {
  it('should render landing page correctly', async () => {
    const mockOnBookNow = vi.fn()
    const mockOnEmergencyBooking = vi.fn()
    
    render(
      <LandingPage 
        onBookNow={mockOnBookNow}
        onEmergencyBooking={mockOnEmergencyBooking}
      />
    )

    // Check if main elements are rendered - use more specific selector
    expect(screen.getByRole('heading', { name: /your health/i })).toBeInTheDocument()
  })

  it('should render doctor list correctly', async () => {
    const mockOnBookAppointment = vi.fn()
    
    render(
      <DoctorList onBookAppointment={mockOnBookAppointment} />
    )

    // Should show loading or doctor information
    expect(screen.getByText(/our doctor/i)).toBeInTheDocument()
  })

  it('should handle basic user interactions', async () => {
    const mockOnBookNow = vi.fn()
    const mockOnEmergencyBooking = vi.fn()
    
    render(
      <LandingPage 
        onBookNow={mockOnBookNow}
        onEmergencyBooking={mockOnEmergencyBooking}
      />
    )

    // Should render without errors - use more specific selector
    expect(screen.getByRole('button', { name: /book appointment now/i })).toBeInTheDocument()
  })
})
