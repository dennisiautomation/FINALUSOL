#!/bin/bash

# Deploy application
echo "Deploying application..."

# Create deployment directory
DEPLOY_DIR="/var/www/usol"
mkdir -p $DEPLOY_DIR

# Copy files
cp -r ./* $DEPLOY_DIR/

# Install dependencies
cd $DEPLOY_DIR
npm install
npm run build

# Set permissions
chown -R www-data:www-data $DEPLOY_DIR
chmod -R 755 $DEPLOY_DIR

# Restart services
systemctl restart nginx
systemctl restart php8.1-fpm

echo "Deployment completed!"