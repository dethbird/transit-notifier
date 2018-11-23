env: requirements.txt
	pip3 install -r requirements.txt
	yarn install
	curl -sS https://getcomposer.org/installer | php
	php composer.phar install
	python3 src/python/init.py
