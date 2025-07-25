import { http, HttpResponse } from 'msw'
import { mockDoctors, mockAppointments, departments } from '../../data/mockData'

export const handlers = [
  // Mock API endpoints for testing
  http.get('/api/doctors', () => {
    return HttpResponse.json(mockDoctors)
  }),

  http.get('/api/appointments', () => {
    return HttpResponse.json(mockAppointments)
  }),

  http.post('/api/appointments', async ({ request }) => {
    const newAppointment = await request.json() as any
    const appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'pending',
      queueNumber: mockAppointments.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return HttpResponse.json(appointment, { status: 201 })
  }),

  http.patch('/api/appointments/:id', async ({ params, request }) => {
    const { id } = params
    const updates = await request.json() as any
    const appointment = mockAppointments.find(apt => apt.id === id)
    
    if (!appointment) {
      return HttpResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    const updatedAppointment = { ...appointment, ...updates, updated_at: new Date().toISOString() }
    return HttpResponse.json(updatedAppointment)
  }),

  http.get('/api/departments', () => {
    return HttpResponse.json(departments)
  }),

  // Authentication endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const credentials = await request.json() as any
    if (credentials.email === 'admin@docbook.com' && credentials.password === 'admin123') {
      return HttpResponse.json({ 
        user: { id: '1', email: 'admin@docbook.com', role: 'admin' },
        token: 'mock-jwt-token'
      })
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const userData = await request.json() as any
    return HttpResponse.json({
      user: { id: Date.now().toString(), ...userData },
      token: 'mock-jwt-token'
    }, { status: 201 })
  }),
]
