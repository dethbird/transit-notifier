# sudo rm -rf database
env: requirements.txt
	pip3 install -r requirements.txt
	mkdir database
	python3 src/python/init.py
	yarn install
	curl -sS https://getcomposer.org/installer | php
	php composer.phar install
	chmod 755 public
	chmod 644 public/.htaccess public/index.php
	sudo chown -R www-data:www-data database # so apache can write to sqlite
