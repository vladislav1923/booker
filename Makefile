database:
	docker-compose -f docker-compose.db.yml up

prepare:
	docker network create app_network

start:
	docker-compose up

dev:
	npm run dev