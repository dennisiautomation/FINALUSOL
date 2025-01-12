#!/bin/bash

# Update system packages
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y \
    nginx \
    php8.1-fpm \
    php8.1-mysql \
    php8.1-mbstring \
    php8.1-xml \
    php8.1-curl \
    mysql-server \
    certbot \
    python3-certbot-nginx \
    nodejs \
    npm

# Configure Nginx
cat > /etc/nginx/sites-available/usol << 'EOL'
server {
    listen 80;
    server_name 77.37.43.78;
    root /var/www/usol/public;

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
EOL

# Enable site
ln -s /etc/nginx/sites-available/usol /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Create web directory
mkdir -p /var/www/usol
chown -R www-data:www-data /var/www/usol
chmod -R 755 /var/www/usol

# Restart services
systemctl restart nginx
systemctl restart php8.1-fpm

# Install Node.js dependencies globally
npm install -g pm2

# Configure MySQL
mysql -e "CREATE DATABASE IF NOT EXISTS u850202022_Usolproducao;"
mysql -e "CREATE USER IF NOT EXISTS 'u850202022_Usolproducao'@'localhost' IDENTIFIED BY 'Laura0202@@@';"
mysql -e "GRANT ALL PRIVILEGES ON u850202022_Usolproducao.* TO 'u850202022_Usolproducao'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "VPS setup completed!"