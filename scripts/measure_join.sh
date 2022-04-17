#!/bin/bash

set -euxo pipefail
SCRIPT_DIR=$(dirname $0)
WORK_DIR=$(pwd)

rm -f NestedLoop.dat && touch NestedLoop.dat
rm -f Hash.dat && touch Hash.dat

seq 100 100 5000 | while read n; do node -r esbuild-register src/index.ts measure join $n NL >>NestedLoop.dat; done
seq 100 100 5000 | while read n; do node -r esbuild-register src/index.ts measure join $n H >>Hash.dat; done
