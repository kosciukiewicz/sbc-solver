#!/bin/bash

# This script builds react app and attach static files to chrome extension

# Constants
GREEN='\033[0;32m'
NO_COLOR='\033[m'

# Clean before build
echo -n 'Cleaning before build... '
rm -r ./build 2>/dev/null
rm -r ./chrome_extension/react_app 2>/dev/null
echo -e "${GREEN}Done${NO_COLOR}"

# Build react app
echo -n 'Building react app... '
yarn build >> /dev/null
echo -e "${GREEN}Done${NO_COLOR}"

# Copy react app contents to chrome extension
echo -n 'Copying build react app contents... '
mkdir ./chrome_extension/react_app
cp -r ./build/* ./chrome_extension/react_app/
echo -e "${GREEN}Done${NO_COLOR}"

# Inject build static files to chrom extension 
echo -n 'Injecting static files to chrome extension... '

MAIN_JS_ID=$(find ./chrome_extension/react_app/static/js | grep -E 'main.*.js$' | xargs basename | cut -d '.' -f 2)
MAIN_CSS_ID=$(find ./chrome_extension/react_app/static/css | grep -E 'main.*.css$' | xargs basename | cut -d '.' -f 2)
MAIN_WORKER_ID=$(find ./chrome_extension/react_app/static/js | grep -E 'worker.js$' | xargs basename | cut -d '.' -f 2)
ENGINE_ID=$(find ./chrome_extension/react_app/static/media | grep -E '.wasm$' | xargs basename | cut -d '.' -f 2)

sed -i'' \
 -e "s/main.*.js/main.${MAIN_JS_ID}.js/" \
 -e "s/main.*.css/main.${MAIN_CSS_ID}.css/" \
 -e "s/solverWorker.*.worker.js/solverWorker.${MAIN_WORKER_ID}.worker.js/" \
 ./chrome_extension/manifest.json

sed -i'' \
 -e "s/sbc_optimization_engine_bg.*.wasm/sbc_optimization_engine_bg.${ENGINE_ID}.wasm/" \
 -e "s/solverWorker.*.worker.js/solverWorker.${MAIN_WORKER_ID}.worker.js/" \
 ./chrome_extension/background.js 

echo -e "${GREEN}Done${NO_COLOR}"
