
.PHONY: build typescript rollup


build: rollup typescript

typescript:
	node_modules/.bin/tsc
	
rollup:
	node_modules/.bin/rollup -c