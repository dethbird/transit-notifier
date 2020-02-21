# sudo rm -rf database
.PHONY: env
env: requirements.txt
	rm -rf database | true
	mkdir database | true
	pip install --upgrade pip
	pip install -r requirements.txt
	python src/python/init.py
	sudo npm install -g yarn
	yarn install
	curl -sS https://getcomposer.org/installer | php
	php composer.phar install
	chmod 755 public
	chmod 644 public/.htaccess public/index.php
	sudo chown -R www-data:www-data database # so apache can write to sqlite

run: supervisord.conf
	supervisord -c supervisord.conf
