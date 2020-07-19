#!/bin/sh
echo -en "\033[37;1;42m Check start page: \033[0m"
curl -H "Host: docker.marsel.host" --silent --show-error --fail -I app:3000
