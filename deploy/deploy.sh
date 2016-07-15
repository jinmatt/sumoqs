#!/bin/bash

case $1 in
  production)
    MARATHON_URL='http://52.41.38.163/service/marathon'
    FILE='production.json'
    APP_NAME="production-sumoqs-app"
    ;;
  staging)
    MARATHON_URL="http://52.41.38.163/service/marathon"
    FILE='staging.json'
    APP_NAME="staging-sumoqs-app"
    ;;
  *)
    echo "Error: Unknown command $1"
    echo "Supported argumants are production and staging"
    exit 1
esac

case $2 in
  init)
    URL="$MARATHON_URL/v2/apps"
    METHOD="POST"
    ;;
  update)
    URL="$MARATHON_URL/v2/apps/$APP_NAME"
    METHOD="PUT"
    ;;
  *)
    echo "Error: Unknown command $2"
    echo "Supported argumants are init and update"
    exit 1
esac

TAG="$3"
if [ -z "$TAG" ]
then
  echo "Error: Docker image tag is required"
  exit 1
fi

DCOS_TOKEN=$(dcos config show core.dcos_acs_token)

JSON_CMD="cat $FILE | sed 's/#tag#/$TAG/g' | sed 's/#app_name#/$APP_NAME/g'"
CMD="$JSON_CMD | curl -X $METHOD -H 'Content-Type: application/json' -H 'Authorization:curl token=$DCOS_TOKEN' $URL -d@-"
eval $CMD
