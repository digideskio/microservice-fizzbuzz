# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  config.vm.network "private_network", type: "dhcp"

  config.vm.define "entryway" do |entryway|
    entryway.vm.box = "ubuntu/trusty64"
    entryway.vm.hostname = 'entryway'
    entryway.vm.network "forwarded_port", guest: 8000, host: 8000
    entryway.vm.synced_folder "./entryway", "/entryway"
    entryway.vm.provision "shell", inline: <<-SHELL
      curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
      apt-get install -y nodejs
      npm install npm@3 -g
      cd /entryway
      cp upstart.conf /etc/init/entryway.conf
      rm -rf node_modules && npm install
      start entryway
    SHELL
  end

  config.vm.define "mysql" do |mysql|
    mysql.vm.box = "ubuntu/trusty64"
    mysql.vm.hostname = 'mysql'
    # mysql.vm.network "forwarded_port", guest: 3306, host: 3306
    mysql.vm.provision "shell", inline: <<-SHELL
      debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
      debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
      sudo apt-get update -y
      sudo apt-get install -y mysql-server libmysqlclient-dev
      echo "CREATE USER 'rails'@'localhost'; CREATE DATABASE activerecord_unittest  DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci; CREATE DATABASE activerecord_unittest2 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci; GRANT ALL PRIVILEGES ON activerecord_unittest.* to 'rails'@'localhost'; GRANT ALL PRIVILEGES ON activerecord_unittest2.* to 'rails'@'localhost'; GRANT ALL PRIVILEGES ON inexistent_activerecord_unittest.* to 'rails'@'localhost';" | mysql -uroot -proot
    SHELL
  end

  config.vm.define "cache" do |cache|
    cache.vm.box = "ubuntu/trusty64"
    cache.vm.hostname = 'cache'
    cache.vm.network :forwarded_port, guest: 3000, host: 3000
    cache.vm.synced_folder "./cache", "/cache"
    cache.vm.provision "shell", inline: <<-SHELL
      apt-get install -y curl
      curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
      apt-add-repository -y ppa:brightbox/ruby-ng
      apt-get update -y
      apt-get install -y ruby2.3 ruby2.3-dev libxml2 libxml2-dev zlib1g zlib1g-dev libxslt1-dev libncurses5-dev sqlite3 libsqlite3-dev nodejs
      npm install npm@3 -g
      update-alternatives --set ruby /usr/bin/ruby2.3
      update-alternatives --set gem /usr/bin/gem2.3
      gem install bundler rails
      update-locale LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 LC_ALL=en_US.UTF-8
    SHELL
  end
end
