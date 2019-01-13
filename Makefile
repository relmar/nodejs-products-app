include .env

.PHONY: up down stop prune ps shell drush logs

default: up

OSFLAG         :=
ifeq ($(OS),Windows_NT)
  OSFLAG = win
else
  UNAME_S := $(shell uname -s)
  ifeq ($(UNAME_S),Linux)
    OSFLAG = linux
  endif
  ifeq ($(UNAME_S),Darwin)
    OSFLAG = osx
    GREP_FINDINGS := $(shell grep -R 'docker-sync' docker-compose.osx.yml)
  endif
endif

macossync:
ifeq ($(OSFLAG),osx)
ifneq ($(GREP_FINDINGS), )
	@echo "Attaching entry for MacOS docker-sync"
	sed -i '' 's/docker-sync/$(PROJECT_NAME)-sync/g' docker-compose.osx.yml
endif
endif

up: macossync
	@echo "Starting up containers for $(PROJECT_NAME)..."
 #	docker-compose pull
	docker-compose -f docker-compose.yml up -d --remove-orphans

down: stop

stop:
	@echo "Stopping containers for $(PROJECT_NAME)..."
	#@docker-compose stop
	@docker-compose -f docker-compose.yml stop

prune:
	@echo "Removing containers for $(PROJECT_NAME)..."
	@docker-compose -f docker-compose.yml down -v

ps:
	@docker ps --filter name='$(PROJECT_NAME)*'

shell:
	docker exec -e COLUMNS="`tput cols`" -e LINES="`tput lines`" -ti $(PROJECT_NAME)_php sh

npm:
	docker exec $(PROJECT_NAME)_fed /bin/bash -c "cd $(FED_ROOT); npm $(filter-out $@,$(MAKECMDGOALS))"

logs:
	@docker-compose -f docker-compose.yml logs -f $(filter-out $@,$(MAKECMDGOALS))

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
