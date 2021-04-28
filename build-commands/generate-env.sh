#!/bin/sh

vars=$(env | grep "^[A-Za-z]" | sed "s/\([A-Za-z_]\+\)=.*/\1/" | sort)
subst=$(printf '${%s} ' $vars)
envsubst "$subst" < ./build/.env.${1}.template > .env
