DOCKER = docker compose -f docker-compose.yml
DOCKER_DEV = docker compose -f docker-compose.dev.yml

dev-build:
	$(DOCKER_DEV) up --build
dev:
	$(DOCKER_DEV) up
prod-build:
	$(DOCKER) up --build
prod:
	$(DOCKER) up
