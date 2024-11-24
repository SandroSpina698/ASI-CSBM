#!/bin/bash

set -e

IMAGE_LIST=(
  "theoahga/microservice-discovery:1.0,./back/discovery"
  "theoahga/microservice-gateway:1.0,./back/gateway"
  "theoahga/microservice-generate-picture-ms:1.0,./back/generate-picture-ms"
  "theoahga/microservice-generate-properties:1.0,./back/generate-properties"
  "theoahga/microservice-generate-text-ms:1.0,./back/generate-text-ms"
  "theoahga/microservice-mono:1.0,./back/mono"
  "theoahga/microservice-front:1.0,./front"
)

for ITEM in "${IMAGE_LIST[@]}"; do
  IMAGE_TAG=$(echo $ITEM | cut -d, -f1)
  BUILD_PATH=$(echo $ITEM | cut -d, -f2)

  echo "Calling build.sh to build image: ${IMAGE_TAG} from path ${BUILD_PATH}"
  ./build.sh ${IMAGE_TAG} ${BUILD_PATH}
done
