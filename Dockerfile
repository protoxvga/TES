# Use PHP with Apache as the base image
FROM php:8.2-apache as web

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Install Additional System Dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    curl \
    zip \
    gnupg \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/* && a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_pgsql zip

# Configure Apache DocumentRoot to point to Laravel's public directory
# and update Apache configuration files
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
