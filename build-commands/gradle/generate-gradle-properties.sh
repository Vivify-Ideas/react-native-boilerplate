#!/bin/sh

envsubst '${MYAPP_UPLOAD_STORE_PASSWORD} ${MYAPP_UPLOAD_KEY_PASSWORD}' < ./build-commands/gradle/gradle.properties > android/gradle.properties