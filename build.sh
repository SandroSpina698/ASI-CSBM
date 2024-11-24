#!/bin/bash

set -e

if [ $# -ne 2 ]; then
  echo "Error: You must provide both the image tag (e.g., image:1.1) and the build path (e.g., ./microservice-chat)."
  exit 1
fi

IMAGE_TAG=$1
IMAGE_NAME=$(echo $IMAGE_TAG | cut -d: -f1)
TAG=$(echo $IMAGE_TAG | cut -d: -f2)
BUILD_PATH=$2

echo "Building Docker image... (${IMAGE_NAME}:${TAG}) from path ${BUILD_PATH}"
docker build -t ${IMAGE_NAME}:${TAG} ${BUILD_PATH}
