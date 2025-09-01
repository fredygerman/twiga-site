# Twiga Admin Dashboard Setup Instructions

## Prerequisites

1. **Node.js 18+** and **pnpm** installed
2. **Access to your Twiga project database** (PostgreSQL connection string)
3. **Admin credentials** for the dashboard

## Quick Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual database credentials:

```env
# Database Configuration - Replace with your Twiga project database
DATABASE_URL="postgresql://username:password@host:port/twiga_core_db"

# Admin Credentials (Change these for production!)
ADMIN_USERNAME="twiga_admin"
ADMIN_PASSWORD="your_secure_password_here"

# Application Configuration
APP_PORT=3000
NODE_ENV=development
```

### 3. Test Database Connection

Before starting the application, test your database connection:

```bash
pnpm run test:db
```

This should output:

- ✅ Database connection successful!
- 📊 Total users in database: [number]
- 📋 Recent users (limited to 5)

### 4. Start the Application

```bash
# Development mode
pnpm dev

# Or with Docker
pnpm run docker:start:dev
```

### 5. Access the Admin Dashboard

1. Open http://localhost:3000
2. Go to `/admin` to access the login page
3. Use your `ADMIN_USERNAME` and `ADMIN_PASSWORD` to log in
4. You'll be redirected to `/admin/dashboard` where you can manage users

## Features Available

### User Management Dashboard

- **View All Users**: See all users from your Twiga database
- **User States**: Monitor user states (active, onboarding, new, blocked, rate_limited)
- **Role Management**: Assign admin or teacher roles
- **Search & Filter**: Find users by name, WhatsApp ID, school, region, or state
- **User Analytics**: View statistics and activity metrics

### User Actions

- **Activate Users**: Set users to active state
- **Block Users**: Block problematic users
- **Rate Limit**: Apply rate limiting to users
- **Role Assignment**: Promote users to admin or assign teacher roles

### Filters and Search

- Search by: Name, WhatsApp ID, School Name, Region
- Filter by: User State (all, active, onboarding, new, blocked, rate_limited)
- Date Range: Filter by user creation date

## Database Schema

The admin dashboard connects to your existing `users` table with these fields:

```sql
- id: Primary key
- name: User's name
- wa_id: WhatsApp ID (unique identifier)
- state: User state (new, onboarding, active, blocked, rate_limited)
- onboarding_state: Onboarding progress
- role: User role (teacher, admin)
- class_info: JSON field with class assignments
- school_name: School affiliation
- birthday: User's birthday
- region: Geographic region
- last_message_at: Last activity timestamp
- created_at: Account creation timestamp
- updated_at: Last update timestamp
```

## Security Notes

1. **Change default admin credentials** before deploying to production
2. **Use environment variables** for all sensitive configuration
3. **Secure your database connection** with proper network rules
4. **Enable HTTPS** in production environments

## Troubleshooting

### Database Connection Issues

1. Verify your `DATABASE_URL` is correct
2. Ensure your database server allows connections from your IP
3. Check if the database and `users` table exist
4. Run `pnpm run test:db` to diagnose connection issues

### Admin Login Issues

1. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env.local`
2. Clear browser cookies if experiencing session issues
3. Check console logs for authentication errors

### User Data Not Showing

1. Verify your database contains the `users` table
2. Check if there are any users in the database
3. Verify the table schema matches the expected format

## Docker Deployment

If you prefer to use Docker:

```bash
# Start in development mode
pnpm run docker:start:dev

# Start in production mode
pnpm run docker:start

# View logs
pnpm run docker:logs

# Stop containers
pnpm run docker:stop
```

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify your database connection with `pnpm run test:db`
3. Ensure your environment variables are correctly configured
4. Check that your database schema matches the expected format
