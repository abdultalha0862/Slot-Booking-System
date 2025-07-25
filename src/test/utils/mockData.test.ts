import { describe, it, expect } from 'vitest'
import { mockDoctors, mockAppointments, departments } from '@/data/mockData'

describe('Mock Data Validation', () => {
  describe('mockDoctors', () => {
    it('should have valid doctor data structure', () => {
      expect(Array.isArray(mockDoctors)).toBe(true)
      expect(mockDoctors.length).toBeGreaterThan(0)
      
      mockDoctors.forEach(doctor => {
        expect(doctor).toHaveProperty('id')
        expect(doctor).toHaveProperty('name')
        expect(doctor).toHaveProperty('specialty')
        expect(doctor).toHaveProperty('qualification')
        expect(doctor).toHaveProperty('experience_years')
        expect(doctor).toHaveProperty('consultation_fee')
        expect(doctor).toHaveProperty('rating')
        expect(doctor).toHaveProperty('bio')
        
        expect(typeof doctor.id).toBe('string')
        expect(typeof doctor.name).toBe('string')
        expect(typeof doctor.specialty).toBe('string')
        expect(typeof doctor.experience_years).toBe('number')
        expect(typeof doctor.consultation_fee).toBe('number')
        expect(typeof doctor.rating).toBe('number')
        
        expect(doctor.experience_years).toBeGreaterThan(0)
        expect(doctor.consultation_fee).toBeGreaterThan(0)
        expect(doctor.rating).toBeGreaterThanOrEqual(0)
        expect(doctor.rating).toBeLessThanOrEqual(5)
      })
    })
  })

  describe('mockAppointments', () => {
    it('should have valid appointment data structure', () => {
      expect(Array.isArray(mockAppointments)).toBe(true)
      expect(mockAppointments.length).toBeGreaterThan(0)
      
      mockAppointments.forEach(appointment => {
        expect(appointment).toHaveProperty('id')
        expect(appointment).toHaveProperty('doctorId')
        expect(appointment).toHaveProperty('doctorName')
        expect(appointment).toHaveProperty('patientName')
        expect(appointment).toHaveProperty('patientPhone')
        expect(appointment).toHaveProperty('patientAge')
        expect(appointment).toHaveProperty('appointmentDate')
        expect(appointment).toHaveProperty('timeSlot')
        expect(appointment).toHaveProperty('reason')
        expect(appointment).toHaveProperty('status')
        expect(appointment).toHaveProperty('queueNumber')
        expect(appointment).toHaveProperty('isEmergency')
        
        expect(typeof appointment.id).toBe('string')
        expect(typeof appointment.doctorId).toBe('string')
        expect(typeof appointment.patientName).toBe('string')
        expect(typeof appointment.patientAge).toBe('number')
        expect(typeof appointment.queueNumber).toBe('number')
        expect(typeof appointment.isEmergency).toBe('boolean')
        
        expect(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'])
          .toContain(appointment.status)
        
        expect(appointment.patientAge).toBeGreaterThan(0)
        expect(appointment.queueNumber).toBeGreaterThan(0)
        expect(appointment.patientPhone).toMatch(/^\+91\s\d{10}$/)
      })
    })
  })

  describe('departments', () => {
    it('should have valid department data structure', () => {
      expect(Array.isArray(departments)).toBe(true)
      expect(departments.length).toBeGreaterThan(0)
      
      departments.forEach(department => {
        expect(department).toHaveProperty('id')
        expect(department).toHaveProperty('name')
        expect(department).toHaveProperty('description')
        expect(department).toHaveProperty('is_active')
        
        expect(typeof department.id).toBe('string')
        expect(typeof department.name).toBe('string')
        expect(typeof department.description).toBe('string')
        expect(typeof department.is_active).toBe('boolean')
        
        expect(department.name.length).toBeGreaterThan(0)
        expect(department.description.length).toBeGreaterThan(0)
      })
    })

    it('should have all departments marked as active', () => {
      departments.forEach(department => {
        expect(department.is_active).toBe(true)
      })
    })

    it('should include expected medical departments', () => {
      const departmentNames = departments.map(dept => dept.name)
      
      expect(departmentNames).toContain('General Medicine')
      expect(departmentNames).toContain('Cardiology')
      expect(departmentNames).toContain('Dermatology')
      expect(departmentNames).toContain('Pediatrics')
      expect(departmentNames).toContain('Orthopedics')
      expect(departmentNames).toContain('Psychiatry')
    })
  })
})
