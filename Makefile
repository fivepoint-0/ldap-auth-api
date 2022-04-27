.PHONY: all

ORIGINAL_PORT = $(shell echo `cat .env | head -n 1 | cut -d '=' -f 2`)
IMAGE_NAME := ${or ${IMAGE_NAME},session_api}

# Code block `check_defined` from https://gist.github.com/bbl/bf4bf5875d0c705c4cd78d264f98a8b1
check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
      $(error Undefined $1$(if $2, ($2))))

change-api-port: .env docker-compose.yml Dockerfile public/js/client.js
	$(call check_defined, API_PORT)
	@echo "Original port: ${ORIGINAL_PORT}"
	@echo "New port:      ${API_PORT}"
	@sed -i 's/=${ORIGINAL_PORT}/=${API_PORT}/g' .env
	@sed -i 's/${ORIGINAL_PORT}:${ORIGINAL_PORT}/${API_PORT}:${API_PORT}/g' docker-compose.yml
	@sed -i 's/EXPOSE ${ORIGINAL_PORT}/EXPOSE ${API_PORT}/g' Dockerfile
	@sed -i 's/:${ORIGINAL_PORT}/:${API_PORT}/g' public/js/client.js

up:
	docker-compose up -d

down:
	docker-compose down

bbb:
	docker build --no-cache . -t ${IMAGE_NAME}