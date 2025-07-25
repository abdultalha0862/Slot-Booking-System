# 🏥 DocBook - Modern Clinic Management System

<div align="center">
  <img src="public/medical-icon.svg" alt="DocBook Logo" width="80" height="80">
  
  <p align="center">
    <strong>A comprehensive clinic appointment booking and management platform</strong>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/Tailwind-3.4.11-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  </p>
  
  <p align="center">
    <a href="#" target="_blank">
      <img src="https://img.shields.io/badge/🚀 Live Demo-Coming Soon-success?style=for-the-badge" alt="Live Demo">
    </a>
  </p>
</div>

---

## ✨ Overview

**DocBook** is a modern, full-featured clinic management system designed to streamline healthcare operations. Built with cutting-edge web technologies, it provides an intuitive interface for both patients and healthcare administrators.

## 🌐 Live Demo

🚀 **[View Live Application](https://docbook.abdultalha.tech/)** 

> Experience DocBook in action! Try out the patient booking system and explore the admin dashboard with sample data.

**Demo Credentials:**
- **Admin Login:** `admin@docbook.com` / `admin123`
- **Patient Access:** Any email/password combination for demo purposes

### 🎯 Key Features

- **📅 Smart Appointment Booking** - Instant slot reservation with real-time availability
- **⚡ Queue Management** - Live queue tracking with automatic numbering system
- **👩‍⚕️ Admin Dashboard** - Comprehensive clinic management tools
- **🚨 Emergency Prioritization** - Special handling for urgent medical cases
- **📱 Responsive Design** - Seamless experience across all devices
- **🔐 Secure Authentication** - Separate portals for patients and administrators

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd docbook

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
docbook/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AdminDashboard.tsx
│   │   ├── BookingForm.tsx
│   │   ├── DoctorList.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useAppointments.ts
│   │   ├── useDoctors.ts
│   │   └── ...
│   ├── pages/               # Route components
│   ├── data/                # Mock data and types
│   ├── lib/                 # Utility functions
│   └── test/                # Test files
├── public/                  # Static assets
└── ...config files
```

---

## 🎨 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library

### State Management
- **TanStack Query** - Powerful data fetching and caching
- **React Hooks** - Built-in state management

### UI/UX
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

### Testing
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple testing utilities
- **jsdom** - Browser environment simulation

---

## 💻 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run all tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report
npm run test:watch      # Watch mode testing

# Specific Test Suites
npm run test:components # Component tests
npm run test:hooks      # Hook tests
npm run test:integration # Integration tests
npm run test:e2e        # End-to-end tests

# Deployment
npm run deploy:check    # Pre-deployment validation
```

---

## 🏥 Features in Detail

### For Patients
- **Easy Registration** - Quick account creation
- **Doctor Discovery** - Browse available specialists
- **Instant Booking** - Real-time appointment scheduling
- **Queue Tracking** - Live updates on appointment status
- **Emergency Booking** - Priority scheduling for urgent cases
- **Appointment History** - Track past and upcoming appointments

### For Administrators
- **Live Dashboard** - Real-time clinic overview
- **Appointment Management** - Full appointment lifecycle control
- **Patient Database** - Comprehensive patient records
- **Queue Management** - Monitor and control patient flow
- **Analytics & Reports** - Insights into clinic operations
- **Emergency Handling** - Special workflows for urgent cases

---

## 🎯 Core Functionality

### Appointment Booking Flow
1. **Patient Registration** - Create account or sign in
2. **Doctor Selection** - Choose from available specialists
3. **Time Slot Selection** - Pick convenient appointment time
4. **Information Collection** - Provide medical details
5. **Confirmation** - Receive appointment confirmation with queue number
6. **Queue Updates** - Real-time status updates

### Admin Management
1. **Dashboard Overview** - Key metrics and statistics
2. **Appointment Processing** - Approve, modify, or cancel appointments
3. **Queue Control** - Manage patient flow and priorities
4. **Patient Records** - Access comprehensive patient database
5. **Reporting** - Generate insights and analytics

---

## 🧪 Testing

DocBook includes comprehensive testing coverage:

- **Unit Tests** - Individual component testing
- **Integration Tests** - Feature workflow testing
- **Hook Tests** - Custom hook functionality
- **E2E Tests** - Complete user journey testing

```bash
# Run specific test categories
npm run test:components    # UI component tests
npm run test:hooks        # Custom hook tests
npm run test:integration  # Feature integration tests
npm run test:utils        # Utility function tests
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Pre-deployment Checklist
```bash
npm run deploy:check  # Runs linting, type-checking, tests, and build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **React Community** - For the amazing ecosystem

---

<div align="center">
  <p>Made with ❤️ for better healthcare management</p>
  <p><strong>DocBook Team</strong></p>
</div>
