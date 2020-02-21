# Setup

## Download Raspbian Lite
[https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
unzip the image

## Partition
Use windows partition manager to clear all partitions on SD card

## Format
Format the SD drive
SD Card Formatter for windows

## Etch
Use etcher to etch raspbian lite onto the SD card
`2020-02-13-raspbian-buster-lite.img`

## HDMI
edit config.txt in the boot sector of the SD, uncomment`hdmi_safe=1`

## Boot
Boot the Raspberry Pi. login as `pi:raspberry`.

## Configure
```bash
sudo raspi-config
```
- Network Options
  - enable wifi
- Interfacing Options
  - enable ssh
  - enable remote GPIO
- Advanced
  - expand filesystem
- Update - update raspi-config

## Reboot
`sudo reboot`

## SSH in
```bash
ssh pi@<IP_ADDRESS>
```

## Install packages

```bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y python3-pip libpq-dev python3-venv python3-numpy libatlas-base-dev php php-sqlite3 apache2 supervisor npm git vim
```

## Setup Git
```bash
git config --global user.email "your_email@example.com"
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
cat < ~/.ssh/id_rsa.pub
# paste into github
# https://github.com/settings/keys
```

## git complete and git prompt

https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh

```bash
touch ~/.git-prompt.sh ~/.git-completion.bash
# vim them and add the source from raw on github
vim ~/.git-prompt.sh
vim ~/.git-completion.bash
```

## nvm
clone nvm
```bash
git clone https://github.com/nvm-sh/nvm.git
```

## .bash_profile
```bash
touch ~/.bash_profile
vim ~/.bash_profile
```

```bash
source ~/.git-prompt.sh
source ~/.git-completion.bash

export NVM_DIR="$HOME/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export GIT_PS1_SHOWDIRTYSTATE=true
export GIT_PS1_SHOWUNTRACKEDFILES=true
export GIT_PS1_SHOWUPSTREAM="auto"

PS1='\[\033[00m\][\[\033[01;32m\]\u@\h\[\033[00m\]] \[\e[0;45m\]$(__git_ps1 "(%s)")\[\e[0m\] \[\033[44m\]\w >\[\033[00m\] '

export PATH

alias ls='ls -la'

# Git related
alias gs='git status'
alias gd='git diff'
alias gl='git log'
```
Source the file

```bash
source ~/.bash_profile
```


# App Setup

## Clone the repo
```bash
cd ~/
mkdir Code
cd Code
git clone git@github.com:dethbird/transit-notifier.git
cd transit-notifier
git checkout ubuntu-server-raspberry-pi
```


## Create python3 virtual environment
```bash
python3.7 -m venv env
. env/bin/activate
```

## Build project
in the project folder with python venv activated:
```bash
. env/bin/activate
make env
```

## apache
```bash
sudo a2enmod rewrite
sudo a2enmod headers
```

## edit vhost
```bash
sudo vim /etc/apache2/sites-available/000-default.conf
```
put
```
<VirtualHost *:80>
        ServerName raspberrypi
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        Alias /home/pi/Code/transit-notifier/public /var/www/html

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
Symlink the document root
```bash
sudo rm -rf /var/www/html
sudo ln -s /home/pi/Code/transit-notifier/public /var/www/html
systemctl restart apache2
```
## supervisor on startup
```bash
sudo touch /etc/systemd/system/supervisord.service
sudo vim /etc/systemd/system/supervisord.service
```
put:
```
[Unit]
Description=Start Supervisor

[Service]
ExecStart=sudo /usr/bin/supervisord -c /home/pi/Code/transit-notifier/supervisord.conf

[Install]
WantedBy=multi-user.target
```
enable the service to start at startup
```bash
systemctl enable supervisord
```

## Reboot and confirm

```bash
sudo reboot
```

- apache should be available at http://raspberrypi on the local network
- supervisor should be running `transit-notifier` python index.py
