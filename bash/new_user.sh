#!/usr/bin/env bash

echo 'Creating application user and db'

mongo app_db \
        --host ${MONGO_HOSTNAME} \
        --port ${MONGO_PORT} \
        -u ${MONGO_USERNAME} \
        -p ${MONGO_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${APP_MONGO_USER}', pwd: '${APP_MONGO_PASS}', roles:[{role:'dbOwner', db: '${MONGO_DB}'}]});"