
.PHONY: build typescript rollup test benchmark


build: rollup typescript test benchmark

typescript:
	node node_modules/.bin/tsc
	
rollup:
	node node_modules/.bin/rollup -c

test:
	node node_modules/.bin/mocha -R Spec -r should

benchmark:
	node benchmark/benchmark.js