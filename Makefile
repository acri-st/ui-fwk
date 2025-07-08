DEPLOY := "local"
UI_FWK_HOST := "http://localhost:8200"

setup:
	@if [ "$(DEPLOY)" = "local" ]; then \
		echo "Checking if nodejs and npm are installed..."; \
		command -v node >/dev/null 2>&1 || { echo "Error: nodejs is not installed."; exit 1; }; \
		command -v npm >/dev/null 2>&1 || { echo "Error: npm is not installed."; exit 1; }; \
		echo "Installing dependencies..."; \
		npm install; \
	else \
		echo "Checking if docker is installed..."; \
		command -v docker >/dev/null 2>&1 || { echo "Error: docker is not installed."; exit 1; }; \
	fi;
build:
	npm run build

start:
	@if [ "$(DEPLOY)" = "local" ]; then \
		echo "Starting local environment using nodejs..."; \
		npm run dev; \
	else \
		echo "Running docker compose..."; \
		docker compose up --build; \
	fi;

stop:
	@if [ "$(DEPLOY)" = "local" ]; then \
		echo "Nothing to stop..."; \
	else \
		echo "Stopping docker compose..."; \
		docker compose down; \
	fi;

clean:
	@echo "Removing node_modules..."
	@sudo rm -rf node_modules
	@echo "Removing dist..."
	@sudo rm -rf dist


	
# ================================
# -- TESTS
# ================================
make test: 
	@TEST_FILTER=e2e make run_robot_test

test_build:
	@docker build -t test-image -f test.Dockerfile .

run_robot_test: test_build
	@mkdir -p ${PWD}/report
	@chmod -R 777 ${PWD}/report
	@echo "UI_FWK_HOST=$(UI_FWK_HOST)"

	@docker run -ti \
		-v ${PWD}/tests:/tests -v ${PWD}/report:/report -w / --network host \
		-e UI_FWK_HOST=${UI_FWK_HOST} \
		test-image \
		robot --removekeywords name:SetVariable --outputdir report --include $(TEST_FILTER) /tests

