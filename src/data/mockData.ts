
export const mockDoctors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD Internal Medicine',
    experience_years: 8,
    consultation_fee: 500,
    rating: 4.8,
    bio: 'Dr. Sarah Johnson is a dedicated general practitioner with extensive experience in preventive care and chronic disease management. She believes in providing personalized healthcare solutions.',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockAppointments = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'John Doe',
    patientPhone: '+91 9876543210',
    patientAge: 35,
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    reason: 'Regular checkup',
    symptoms: 'General wellness check',
    status: 'pending' as const,
    queueNumber: 1,
    isEmergency: false
  },
  {
    id: '2',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Jane Smith',
    patientPhone: '+91 9876543211',
    patientAge: 42,
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    reason: 'Follow-up consultation',
    symptoms: 'Blood pressure monitoring',
    status: 'confirmed' as const,
    queueNumber: 2,
    isEmergency: false
  },
  {
    id: '3',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Alice Johnson',
    patientPhone: '+91 9876543212',
    patientAge: 28,
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM',
    reason: 'Health consultation',
    symptoms: 'General health assessment',
    status: 'in-progress' as const,
    queueNumber: 3,
    isEmergency: false
  }
];

export const departments = [
  {
    id: '1',
    name: 'General Medicine',
    description: 'Comprehensive primary healthcare for adults',
    is_active: true
  },
  {
    id: '2',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system care',
    is_active: true
  },
  {
    id: '3',
    name: 'Dermatology',
    description: 'Skin, hair, and nail treatments',
    is_active: true
  },
  {
    id: '4',
    name: 'Pediatrics',
    description: 'Healthcare for infants, children, and adolescents',
    is_active: true
  },
  {
    id: '5',
    name: 'Orthopedics',
    description: 'Bone, joint, and muscle treatments',
    is_active: true
  },
  {
    id: '6',
    name: 'Psychiatry',
    description: 'Mental health and behavioral disorders',
    is_active: true
  }
];
