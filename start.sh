#!/bin/bash
# This is used by DevDockerfile
npm install
pm2 start ./bin/www --no-daemon
