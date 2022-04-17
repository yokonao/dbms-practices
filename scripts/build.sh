#! /bin/bash

set -euxo pipefail
SCRIPT_DIR=$(dirname $0)
WORK_DIR=$(pwd)

rm -rf dist
node $SCRIPT_DIR/build.js
sed -e $'1s/^/#! \/usr\/bin\/env node\\\n\\\n/' dist/index.js > tree-practices
