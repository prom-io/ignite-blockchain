up: docker-up
down: docker-down
build: docker-build
restart: docker-down docker-up
init: docker-down-clear docker-build docker-up

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

ignite-dds-wait-db:
	until docker-compose exec -T ignite-dds-postgres pg_isready --timeout=0 --dbname=app ; do sleep 1 ; done
