#!/bin/bash

# Usage: `./build.sh mako`

if [ -z "$1" ]; then
  echo "Build target not specified."
  exit 1
fi
if [ ! -e "./variations/$1" ]; then
  echo "Build target not found."
  exit 1
fi
rm -rf ./.build
mkdir ./.build
rsync -av --exclude='.*' --exclude='variations/' --exclude='crawlCharactorImgs.js' --exclude='*.sh' --exclude='README.md' ./ ./.build
cp -r ./variations/$1/* ./.build
echo "Successfully built $1."
