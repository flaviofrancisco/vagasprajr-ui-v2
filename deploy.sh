#!/bin/bash

# Navigate to the specified directory
cd /home/flavio/workspace/vagas-pra-jr-web-v2

# Pull the latest changes from the main branch
git pull origin main

# Build the Docker images
docker-compose build --no-cache

# Stop any running containers
docker-compose down

# Start the containers in detached mode
docker-compose up -d