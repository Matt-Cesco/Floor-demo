#!/usr/bin/env bash

git fetch;
git pull;

npm run build;
pm2 restart all;