# transit-notifier
---

## Linux Box Setup

### Hardware/OS
4GB RAM, 32GB HD, 64bit
Install ubuntu ubuntu-18.10-desktop-amd64.iso

Minimal intstall

Create ubuntu user `transit`, do not require password to login

### Install packages
```bash
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install openssh-server
sudo apt-get install net-tools
# at this point you can ssh into the box
sudo apt-get install -y python3-pip
sudo apt-get install php
sudo apt-get install php-sqlite3
sudo apt-get install git-core
sudo apt-get install apache2
sudo apt-get install supervisor
sudo apt-get install vim

```

### node
```bash
# yarn
sudo apt-get install npm
sudo npm install -g yarn
# other node stuff
sudo apt-get install nodejs
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### apache
```bash
sudo a2enmod rewrite # enable mod rewrite
sudo a2enmod headers # mod headers
service apache2 reload
sudo vim /etc/apache2/sites-available/000-default.conf
```

```
<VirtualHost *:80>
        ServerName 192.168.86.56
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        Alias /home/transit/Code/transit-notifier/public /var/www/html

        <Directory /var/www/html>
            Options FollowSymLinks
            AllowOverride All
            Order allow,deny
            Allow from all
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

```

#### Symlink the document root
```
sudo ln -s /home/transit/Code/transit-notifier/public /var/www/html
```

### Startup Apps
In startup apps, add:
```bash
supervisord -c /home/cobblestone/Code/public-transit-notifier/supervisord.conf
```



### Git
```bash
git config --global user.email "your_email@example.com"
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
cat < ~/.ssh/id_rsa.pub
# paste into github https://github.com/settings/keys
```

#### clone repo
```bash
cd ~/
mkdir Code
cd Code
git clone git@github.com:dethbird/transit-notifier.git
cd transit-notifier
```

## Make

### env
Create database, pip install, yarn stuff
```bash
make env
```
## Development
### VM Development
On VirtualBox Linux VM, set network adapter from NAT to Bridged

### Phillips Hue Emulator
requires java
```bash
sudo apt-get install default-jre
```
Download from [https://steveyo.github.io/Hue-Emulator/](https://steveyo.github.io/Hue-Emulator/)

```bash
java -jar HueEmulator-v0.8.jar
```

Browse to [http://localhost:8000/api/newdeveloper](http://localhost:8000/api/newdeveloper)
