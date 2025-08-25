#!/bin/bash

# Twiga Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to start services
start_services() {
    print_status "Starting Twiga services..."
    check_docker
    
    if [ "$1" = "dev" ]; then
        print_status "Starting in development mode..."
        docker-compose --profile dev up -d postgres
        sleep 5
        docker-compose --profile dev up -d dev
    else
        print_status "Starting in production mode..."
        docker-compose up -d
    fi
    
    print_success "Services started successfully!"
    print_status "Database: postgresql://postgres:password@localhost:5432/twiga_db"
    print_status "Application: http://localhost:3000"
    print_status "Admin: http://localhost:3000/admin"
}

# Function to stop services
stop_services() {
    print_status "Stopping Twiga services..."
    docker-compose down
    print_success "Services stopped successfully!"
}

# Function to view logs
view_logs() {
    if [ -n "$1" ]; then
        docker-compose logs -f "$1"
    else
        docker-compose logs -f
    fi
}

# Function to run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10
    
    # Generate migrations if not exists
    if [ ! -d "./drizzle" ]; then
        print_status "Generating migrations..."
        pnpm drizzle-kit generate
    fi
    
    # Run migrations
    print_status "Applying migrations..."
    pnpm drizzle-kit migrate
    
    print_success "Migrations completed successfully!"
}

# Function to reset database
reset_database() {
    print_warning "This will destroy all data in the database. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Resetting database..."
        docker-compose down
        docker volume rm twiga-site_postgres_data 2>/dev/null || true
        docker-compose up -d postgres
        sleep 10
        run_migrations
        print_success "Database reset completed!"
    else
        print_status "Database reset cancelled."
    fi
}

# Function to show status
show_status() {
    print_status "Docker services status:"
    docker-compose ps
}

# Function to show help
show_help() {
    echo "Twiga Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start [dev]     Start services (add 'dev' for development mode)"
    echo "  stop           Stop all services"
    echo "  restart        Restart all services"
    echo "  logs [service] View logs (optionally for specific service)"
    echo "  migrate        Run database migrations"
    echo "  reset-db       Reset database (destroys all data)"
    echo "  status         Show services status"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start dev   # Start in development mode"
    echo "  $0 start       # Start in production mode"
    echo "  $0 logs app    # View application logs"
    echo "  $0 migrate     # Run database migrations"
}

# Main script logic
case "${1:-help}" in
    start)
        start_services "$2"
        ;;
    stop)
        stop_services
        ;;
    restart)
        stop_services
        start_services "$2"
        ;;
    logs)
        view_logs "$2"
        ;;
    migrate)
        run_migrations
        ;;
    reset-db)
        reset_database
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
