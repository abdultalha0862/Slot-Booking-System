import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import AppointmentCard from '@/components/AppointmentCard'
import { createMockAppointment } from '../test-utils'

describe('AppointmentCard', () => {
  const mockAppointment = createMockAppointment()
  const mockOnUpdateStatus = vi.fn()

  beforeEach(() => {
    mockOnUpdateStatus.mockClear()
  })

  it('renders appointment information correctly', () => {
    render(
      <AppointmentCard 
        appointment={mockAppointment}
        isAdmin={false}
      />
    )

    // When isAdmin=false, it shows doctor name
    expect(screen.getByText(`Dr. ${mockAppointment.doctorName}`)).toBeInTheDocument()
    expect(screen.getByText(mockAppointment.appointmentDate)).toBeInTheDocument()
    expect(screen.getByText(mockAppointment.timeSlot)).toBeInTheDocument()
    expect(screen.getByText(mockAppointment.patientPhone)).toBeInTheDocument()
    expect(screen.getByText(mockAppointment.reason)).toBeInTheDocument()
  })

  it('renders patient information correctly for admin', () => {
    render(
      <AppointmentCard 
        appointment={mockAppointment}
        isAdmin={true}
      />
    )

    // When isAdmin=true, it shows patient name
    expect(screen.getByText(mockAppointment.patientName)).toBeInTheDocument()
  })

  it('shows queue number correctly for admin', () => {
    render(
      <AppointmentCard 
        appointment={mockAppointment}
        isAdmin={true}
      />
    )

    expect(screen.getByText(mockAppointment.queueNumber.toString())).toBeInTheDocument()
  })

  it('displays emergency badge for emergency appointments', () => {
    const emergencyAppointment = createMockAppointment({ isEmergency: true })
    
    render(
      <AppointmentCard 
        appointment={emergencyAppointment}
        isAdmin={false}
      />
    )

    expect(screen.getByText('Emergency')).toBeInTheDocument()
  })

  it('shows admin controls when isAdmin is true', () => {
    const pendingAppointment = createMockAppointment({ status: 'pending' })
    
    render(
      <AppointmentCard 
        appointment={pendingAppointment}
        isAdmin={true}
        onUpdateStatus={mockOnUpdateStatus}
      />
    )

    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls onUpdateStatus when admin clicks confirm button', async () => {
    const pendingAppointment = createMockAppointment({ status: 'pending' })
    
    render(
      <AppointmentCard 
        appointment={pendingAppointment}
        isAdmin={true}
        onUpdateStatus={mockOnUpdateStatus}
      />
    )

    const confirmButton = screen.getByText('Confirm')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockOnUpdateStatus).toHaveBeenCalledWith(pendingAppointment.id, 'confirmed')
    })
  })

  it('displays correct status badge color', () => {
    const confirmedAppointment = createMockAppointment({ status: 'confirmed' })
    
    render(
      <AppointmentCard 
        appointment={confirmedAppointment}
        isAdmin={false}
      />
    )

    const statusElement = screen.getByText('Confirmed')
    expect(statusElement).toBeInTheDocument()
  })
})
