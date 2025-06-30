# Sal-lmjarab Healthcare Platform

A comprehensive healthcare platform built with React, TypeScript, and Supabase.

## Demo Accounts

For testing purposes, you can use these demo accounts:

### Patient Account
- **Email:** patient@demo.com
- **Password:** demo123
- **Role:** Patient
- **Features:** Access patient dashboard, book appointments, view medical records

### Doctor/Provider Account
- **Email:** doctor@demo.com
- **Password:** demo123
- **Role:** Provider
- **Features:** Access provider dashboard, manage appointments, view patient information

### Admin Account
- **Email:** admin@demo.com
- **Password:** demo123
- **Role:** Administrator
- **Features:** Access admin panel, manage users, moderate reviews

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sal-lmjarab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migrations in the `supabase/migrations` folder
   - Create the demo users in your Supabase Auth dashboard (or use the registration flow)

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Creating Demo Users in Supabase

To create the demo users in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create users with these credentials:
   - patient@demo.com (password: demo123)
   - doctor@demo.com (password: demo123)
   - admin@demo.com (password: demo123)

4. After creating the auth users, the user profiles will be automatically created when they first log in.

## Features

- **Multi-role Authentication:** Support for patients, providers, and administrators
- **Patient Dashboard:** Appointment management, medical records, provider search
- **Provider Dashboard:** Patient management, appointment scheduling, profile management
- **Admin Panel:** User management, review moderation, system administration
- **Advanced Search:** AI-powered search with location awareness
- **Review System:** Patient reviews with sentiment analysis
- **Messaging:** Secure communication between patients and providers
- **Appointment Scheduling:** Real-time booking system
- **Medical Records:** Secure patient data management

## Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** React Context API
- **Routing:** React Router v6
- **UI Components:** Custom components with Tailwind CSS
- **Icons:** Lucide React
- **Maps:** Mapbox GL JS
- **AI Integration:** OpenAI API for chatbot and search

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme, Language)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
└── lib/                # Utility libraries
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.