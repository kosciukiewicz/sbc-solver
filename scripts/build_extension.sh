#!/bin/bash

rm -r ./build
yarn build

rm -r ./chrome_extension/react_app
mkdir ./chrome_extension/react_app
cp -r ./build/* ./chrome_extension/react_app/
