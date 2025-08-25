# Twiga Landing Page

## About Twiga

Twiga is an AI-powered teaching companion designed specifically for Tanzanian educators. Winner of the Meta Llama Impact Grant Award 2024, Twiga empowers teachers with AI-driven lesson support, educational resources, and guidance delivered directly through WhatsApp.

## Repository Overview

**This repository contains the landing page and admin dashboard for Twiga** - not the main application. This is a marketing/registration website built with Next.js that:

- Showcases Twiga's features and benefits
- Handles teacher registration with database storage and validation
- Provides an admin dashboard for managing registrations
- Serves as the public-facing website for onboarding new users
- Includes Docker support for easy deployment

> 📱 **Looking for the main Twiga app?** The core WhatsApp-based AI teaching companion is available at [https://github.com/Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga).

## Landing Page Features

- **Teacher Registration System**: Streamlined onboarding process with database storage and validation
- **Admin Dashboard**: Secure admin interface for managing teacher registrations
- **Database Integration**: PostgreSQL database with Drizzle ORM for data persistence
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Information Showcase**: Feature highlights, impact metrics, and testimonials

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL (for local development) or Docker

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tanzania-AI-Community/twiga-landing-page.git
   cd twiga-landing-page
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your database and admin credentials. See [Environment Setup](#environment-setup) below.

4. **Option A: Development with Docker (Recommended)**

   ```bash
   # Start the application with Docker (includes PostgreSQL)
   pnpm run docker:start:dev
   ```

   **Option B: Local Development**

   ```bash
   # Make sure PostgreSQL is running locally, then:
   pnpm run db:migrate
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

The application uses environment variables for configuration. Create a `.env.local` file with the following:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/twiga_db

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### Database Setup

The application uses PostgreSQL with Drizzle ORM for data persistence. Teacher registrations are stored in the database with the following fields:

- Full Name
- School Name
- Email Address
- WhatsApp Number
- Registration Status (pending, approved, rejected)
- Created/Updated timestamps

### Admin Dashboard

Access the admin dashboard at `/admin` to:

- View all teacher registrations
- Manage registration status
- Export registration data
- Monitor application usage

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Environment**: @t3-oss/env-nextjs for type-safe environment variables
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```text
twiga-site/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with toast provider
│   └── page.tsx           # Home page
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section
│   │   ├── Features.tsx   # Features showcase
│   │   ├── Registration.tsx # Registration form
│   │   └── ...
│   └── ui/                # Reusable UI components
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🔧 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Database operations
pnpm run db:generate    # Generate migration files
pnpm run db:migrate     # Run database migrations
pnpm run db:studio      # Open Drizzle Studio

# Docker operations
pnpm run docker:start       # Start production containers
pnpm run docker:start:dev   # Start development containers
pnpm run docker:stop        # Stop all containers
pnpm run docker:logs        # View container logs
pnpm run docker:migrate     # Run migrations in Docker
pnpm run docker:status      # Check container status
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Related Repositories:**

- 🚀 **Main Twiga Application**: [Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga)
- 🌐 **Landing Page**: This repository

---

**Made with ❤️ for Tanzanian educators**
