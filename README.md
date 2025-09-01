# Twiga Admin Dashboard

## About Twiga

Twiga is an AI-powered teaching companion designed specifically for Tanzanian educators. Winner of the Meta Llama Impact Grant Award 2024, Twiga empowers teachers with AI-driven lesson support, educational resources, and guidance delivered directly through WhatsApp.

## Repository Overview

**This repository contains the admin dashboard for managing Twiga users** - it connects to the main Twiga project database. This admin interface built with Next.js provides:

- **User Management**: View and manage all Twiga users from the core database
- **Access Control**: Block, rate limit, or activate users as needed
- **Role Management**: Assign admin or teacher roles to users
- **User Analytics**: Monitor user states, activity, and onboarding progress
- **Database Integration**: Direct connection to the main Twiga PostgreSQL database

> 📱 **Looking for the main Twiga app?** The core WhatsApp-based AI teaching companion is available at [https://github.com/Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga).

## Admin Dashboard Features

- **User State Management**: Activate, block, or rate-limit users
- **Role Assignment**: Promote users to admin or assign teacher roles
- **User Search & Filtering**: Find users by name, WhatsApp ID, school, or state
- **Analytics Dashboard**: View user statistics and activity metrics
- **Database Integration**: Direct connection to existing Twiga database
- **Docker Support**: Easy deployment with Docker and Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Access to your Twiga project database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tanzania-AI-Community/twiga-admin-dashboard.git
   cd twiga-admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   **Important**: Configure your Twiga project database connection:

   ```env
   # Connect to your existing Twiga database
   DATABASE_URL="postgresql://username:password@host:port/twiga_core_db"

   # Set admin credentials
   ADMIN_USERNAME="twiga_admin"
   ADMIN_PASSWORD="your_secure_password"
   ```

4. **Test database connection**

   ```bash
   pnpm run test:db
   ```

5. **Ensure database schema (optional)**

   If connecting to a new database or want to verify the schema:

   ```bash
   pnpm run setup:db
   ```

6. **Start the application**

   ```bash
   pnpm dev
   ```

7. **Access the admin dashboard**

   - Open http://localhost:3000/admin
   - Login with your admin credentials
   - Manage users at http://localhost:3000/admin/dashboard

## 🎯 Available Scripts

- `pnpm run test:db` - Test database connection and show user count
- `pnpm run setup:db` - Ensure users table exists with correct schema
- `pnpm run sample:data` - Create sample users (only on empty database)
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server

## 📊 User Management Features

### Dashboard Overview

- **User Statistics**: Total users, active, onboarding, new, blocked, rate-limited
- **Recent Activity**: Latest user registrations and activity
- **Quick Actions**: Bulk user management operations

### User Actions

- **Activate**: Set users to active state for full access
- **Block**: Completely block users from the system
- **Rate Limit**: Limit user's message frequency
- **Role Management**: Assign admin or teacher roles
- **View Details**: See user's classes, school, and activity

### Search & Filtering

- **Search**: Name, WhatsApp ID, school name, region
- **Filter by State**: All, active, onboarding, new, blocked, rate_limited
- **Date Range**: Filter by registration date
- **Export Options**: Download user data (coming soon)

## 🔧 Environment Configuration

Required environment variables:

```env
# Database - Your existing Twiga database
DATABASE_URL="postgresql://user:pass@host:port/database"

# Admin Access
ADMIN_USERNAME="your_admin_username"
ADMIN_PASSWORD="your_secure_password"

# App Config
APP_PORT=3000
NODE_ENV=development
```

## 🐳 Docker Deployment

For production deployment:

```bash
# Development with Docker
pnpm run docker:start:dev

# Production with Docker
pnpm run docker:start

# View logs
pnpm run docker:logs

# Stop containers
pnpm run docker:stop
```

## 📋 Database Schema

The admin dashboard works with the existing `users` table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  wa_id VARCHAR(20) NOT NULL UNIQUE,
  state VARCHAR(50) NOT NULL DEFAULT 'new',
  onboarding_state VARCHAR(50) DEFAULT 'new',
  role VARCHAR(20) NOT NULL DEFAULT 'teacher',
  class_info JSONB,
  school_name VARCHAR(100),
  birthday DATE,
  region VARCHAR(50),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 🛡️ Security

- **Environment Variables**: All sensitive config via environment variables
- **Admin Authentication**: Secure admin login with session management
- **Database Security**: Read-only access recommended for production
- **HTTPS**: Enable HTTPS in production environments

## 🔧 Troubleshooting

### Database Connection Issues

1. Verify `DATABASE_URL` format and credentials
2. Check database server allows connections from your IP
3. Ensure `users` table exists: `pnpm run setup:db`
4. Test connection: `pnpm run test:db`

### No Users Showing

1. Verify users exist in database: `pnpm run test:db`
2. Check if connected to correct database
3. Verify table schema matches expected format

### Admin Login Problems

1. Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
2. Clear browser cookies
3. Verify environment variables are loaded

## 📚 Additional Resources

- **Detailed Setup**: See [SETUP.md](./SETUP.md) for comprehensive instructions
- **Main Twiga Project**: [https://github.com/Tanzania-AI-Community/twiga](https://github.com/Tanzania-AI-Community/twiga)
- **Docker Guide**: See Docker section above for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For issues and questions:

1. Check the [troubleshooting section](#🔧-troubleshooting)
2. Review [SETUP.md](./SETUP.md) for detailed instructions
3. Open an issue on GitHub for bugs or feature requests

---

**Tanzania AI Community** | Building AI solutions for African education

```bash
cp .env.example .env.local
```

**Important**: Configure your Twiga project database connection. See [Environment Setup](#environment-setup) below.

4. **Start the application**

   ```bash
   # For development
   pnpm dev

   # Or with Docker
   pnpm run docker:start:dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

The application connects to your existing Twiga project database. Create a `.env.local` file with the following:

```env
# Database Configuration - Connect to your Twiga project database
DATABASE_URL=postgresql://username:password@host:port/twiga_core_db

# Admin Credentials (Change these for production)
ADMIN_USERNAME=twiga_admin
ADMIN_PASSWORD=your_secure_password

# Application Configuration
APP_PORT=3000
NODE_ENV=development
```

### Database Connection

This admin dashboard connects directly to your existing Twiga project database and provides management for the `users` table with the following capabilities:

- **User State Management**: View and modify user states (active, blocked, rate_limited, onboarding, new)
- **Role Management**: Assign admin or teacher roles to users
- **User Analytics**: Monitor user activity, onboarding progress, and class assignments
- **Search & Filtering**: Find users by name, WhatsApp ID, school, region, or state

### User Management Features

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
