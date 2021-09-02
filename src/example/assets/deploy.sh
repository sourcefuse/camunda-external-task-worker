#!/bin/sh
CAMUNDA_URL=$1;
ASSETS_FOLDER=$2;

sleep 15;

curl --location --request POST ${CAMUNDA_URL}'/engine-rest/deployment/create' \
--form 'upload=@'${ASSETS_FOLDER}'/order.bpmn'

curl --location --request POST ${CAMUNDA_URL}'/engine-rest/deployment/create' \
--form 'upload=@'${ASSETS_FOLDER}'/loan-process.bpmn'
