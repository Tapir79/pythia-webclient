# ---- Docker container metadata ---- #
PACKAGE       := webclient
CONTAINER     := pythia-$(PACKAGE)
REGISTRY      := $(QA_DOCKER_REGISTRY)
TAG           ?= latest

# ---- files to include in change detection, default is all versioned files ---- #
DEPS = $(shell git ls-files -z)

# ---- build metadata ---- #
COMMIT := $(shell git rev-parse HEAD)
EMAIL  := $(shell git config user.email)
NAME   := $(shell git config user.name)
DATE   := $(shell date +"%Y%m%dT%H%M")

### clean build test publish-dev publish-prod
.PHONY: clean
clean:
	rm .built version.json || true

# build target delegates to .built to ensure build is done only once no matter which targets are called
.PHONY: build
build: .built

# .built assembles but does not test the project; upon successful completion .built metafile is created
.built: . $(DEPS)
	npm install
	npm run build
	touch $@

# test requires .built metafile to exist
.PHONY: test
test: .built
	npm run test

# publish container to specific registry
.PHONY: publish
publish: docker
	@echo "Tagging '$(CONTAINER)' as '$(TAG)' and pushing into $(REGISTRY)"
	docker tag $(CONTAINER) $(REGISTRY)/$(CONTAINER):$(TAG)
	docker push $(REGISTRY)/$(CONTAINER):$(TAG) || echo "hint: use 'docker login $(REGISTRY)' to authenticate"

# build the actual package with some injected metadata in version.json
.PHONY: docker
docker: version.json

# build package with injected version.json metadata
version.json: .built
	@echo "{\"package\": \"$(PACKAGE)\", \
			\"commit\": \"$(COMMIT)\", \
			\"date\": \"$(DATE)\", \
			\"by\": {\
				\"name\": \"$(NAME)\", \
				\"email\": \"$(EMAIL)\"\
			}}" | python -m json.tool > $@
	docker build -t $(CONTAINER) --no-cache --pull=true . || rm $@
