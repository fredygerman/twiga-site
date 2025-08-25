#!/bin/bash
set -e

# Create the twiga_db database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Database is already created by POSTGRES_DB environment variable
    -- This script can be used for additional setup if needed
    
    -- Enable extensions if needed
    -- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Grant permissions
    GRANT ALL PRIVILEGES ON DATABASE twiga_db TO postgres;
EOSQL

echo "Database initialization completed!"
