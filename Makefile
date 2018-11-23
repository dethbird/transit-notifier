env: requirements.txt
	pip3 install -r requirements.txt
	yarn install
	python3 src/python/init.py
