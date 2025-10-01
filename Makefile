run:
	docker compose -f local.yaml up -d --remove-orphans

build:
	docker compose -f local.yaml build --no-cache

makeMigrations:
	docker exec -it photosite_server npx drizzle-kit generate

migrate:
	docker exec -it photosite_server npx drizzle-kit migrate

log-server:
	docker logs photosite_server

log-client:
	docker logs photosite_client

down-v:
	docker compose -f local.yaml down -v

down:
	docker compose -f local.yaml down
