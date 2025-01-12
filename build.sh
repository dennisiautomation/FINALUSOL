#!/bin/bash

# Instalar dependências
npm install

# Fazer build do projeto
npm run build

# Criar arquivo .htaccess na pasta dist
cat > dist/.htaccess << 'EOL'
RewriteEngine On
RewriteBase /

# Redirecionar para HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirecionar todas as requisições para index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Headers de segurança
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:;"
</IfModule>

# Compressão Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript
</IfModule>

# Cache de arquivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOL

echo "Build completo! Arquivos gerados na pasta 'dist'"