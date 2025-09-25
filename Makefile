run:
	docker compose -f local.yaml up -d --remove-orphans

build:
	docker compose -f local.yaml build --no-cache
