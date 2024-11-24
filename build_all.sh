#!/bin/bash

set -e

IMAGE_LIST=(
  "microservice-discovery:1.0,./back/discovery"
  "microservice-gateway:1.0,./back/gateway"
  "microservice-generate-picture-ms:1.0,./back/generate-picture-ms"
  "microservice-generate-properties:1.0,./back/generate-properties"
  "microservice-generate-text-ms:1.0,./back/generate-text-ms"
  "microservice-mono:1.0,./back/mono"
  "microservice-front:1.0,./front"
)

for ITEM in "${IMAGE_LIST[@]}"; do
  IMAGE_TAG=$(echo $ITEM | cut -d, -f1)
  BUILD_PATH=$(echo $ITEM | cut -d, -f2)

  echo "Calling build.sh to build image: ${IMAGE_TAG} from path ${BUILD_PATH}"
  ./build.sh ${IMAGE_TAG} ${BUILD_PATH}
done
