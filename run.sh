#!/usr/bin/bash

cd client
grunt serve &

cd ../server
nodemon --harmony app.js &
