env: requirements.txt
	pip3 install -r requirements.txt
	python3 src/python/init.py
	yarn install
	curl -sS https://getcomposer.org/installer | php
	php composer.phar install
