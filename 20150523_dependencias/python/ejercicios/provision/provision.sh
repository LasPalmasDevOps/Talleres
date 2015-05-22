#!/bin/bash

# Update and install basic packages
apt-get update -y
apt-get upgrade -y
apt-get install -y vim python-dev libjpeg-dev libpng12-dev virtualenvwrapper git ssh docker.io libmysqlclient-dev \
	gettext apache2 libapache2-mod-php5 php5-gd php5-curl php5-mcrypt php5-mysql php5-cli php5-common php5-json \
	npm nodejs

# Install and configure MySQL
debconf-set-selections <<< 'mysql-server mysql-server/root_password password vagrant'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password vagrant'
apt-get -y install mysql-server

# Install and configure phpmyadmin
debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean true'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password vagrant'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'
apt-get -y install phpmyadmin

# Link MySQL configuration
ln -s /vagrant/provisioning/vagrant-my.cnf /home/vagrant/.my.cnf
ln -s /vagrant/provisioning/vagrant-my.cnf /root/.my.cnf

# Link vagrant folder
ln -s /vagrant /home/vagrant/code

