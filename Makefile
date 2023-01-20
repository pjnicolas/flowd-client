.PHONY: up down logs build install

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

build:
	docker-compose build

install:
	docker-compose run --rm app npm install
