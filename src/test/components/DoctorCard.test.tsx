import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../test-utils'
import DoctorCard from '@/components/DoctorCard'
import { createMockDoctor } from '../test-utils'

describe('DoctorCard', () => {
  const mockDoctor = createMockDoctor()
  const mockOnBookAppointment = vi.fn()

  beforeEach(() => {
    mockOnBookAppointment.mockClear()
  })

  it('renders doctor information correctly', () => {
    render(
      <DoctorCard 
        doctor={mockDoctor} 
        onBookAppointment={mockOnBookAppointment} 
      />
    )

    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument()
    expect(screen.getByText(mockDoctor.specialty)).toBeInTheDocument()
    expect(screen.getByText(`${mockDoctor.experience_years} years exp`)).toBeInTheDocument()
    expect(screen.getByText(`₹${mockDoctor.consultation_fee}`)).toBeInTheDocument()
  })

  it('calls onBookAppointment when book button is clicked', () => {
    render(
      <DoctorCard 
        doctor={mockDoctor} 
        onBookAppointment={mockOnBookAppointment} 
      />
    )

    const bookButton = screen.getByText('Book Appointment Now')
    fireEvent.click(bookButton)

    expect(mockOnBookAppointment).toHaveBeenCalledTimes(1)
    expect(mockOnBookAppointment).toHaveBeenCalledWith(mockDoctor)
  })

  it('displays doctor rating correctly', () => {
    render(
      <DoctorCard 
        doctor={mockDoctor} 
        onBookAppointment={mockOnBookAppointment} 
      />
    )

    expect(screen.getByText(mockDoctor.rating.toString())).toBeInTheDocument()
  })

  it('shows availability status', () => {
    render(
      <DoctorCard 
        doctor={mockDoctor} 
        onBookAppointment={mockOnBookAppointment} 
      />
    )

    expect(screen.getByText('Available Now')).toBeInTheDocument()
    expect(screen.getByText('Available Today')).toBeInTheDocument()
  })
})
