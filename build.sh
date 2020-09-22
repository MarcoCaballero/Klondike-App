#!/bin/bash

DEPLOYMENT_NAME="klondike-deployment"
NAMESPACE="klondike-ns"
IMAGE_REPOSITORY="badibadi"
RELEASE_REPOSITORY="marcocab"
IMAGE_NAME="klondike-app"
APP_SERVICE="klondike-app-service"
IMAGE_TAG="0.0.1"
DEV="dev"
LATEST="latest"

_help() {
cat << EOF
Usage: ${0##*/} <args>
    -h, --help             Display help.
    -d, --deploy           Deploy.
    -l, --launch           Expose application service for minikube.
    -b, --build            Build app.
    -c, --clean            Clean up deployment. 
EOF
}

_clean() {
    echo "CLEANING DEPLOYMENT\n"
    helm delete --purge ${DEPLOYMENT_NAME}
}

_deploy() {
    echo "HELM DEPENDENCY UPDATE\n"
    helm dep update helm
    [ $? -ne 0 ] && echo "Ops! Something went wrong..." && exit 1
    
    echo "HELM DEPLOY\n"
    local command="helm install helm/ --name $DEPLOYMENT_NAME --debug --wait --namespace $NAMESPACE"

    echo "Command to run: $command"
    output=$(${command} 2>&1)

    [ $? -ne 0 ] && echo "Output: ${output}" && echo "Ops! Something went wrong..." && _clean && exit 1
    echo "Output: ${output}"

}

_launch() {

    echo "MINIKUBE SERVICE\n"
    local command=" minikube service $APP_SERVICE"

    echo "Command to run: $command"
    output=$(${command} 2>&1)

    [ $? -ne 0 ] && echo "Output: ${output}" && echo "Ops! Something went wrong..." && exit 1
    echo "Output: ${output}"
}

_build() {

    echo "DOCKER BUILD\n"
    local command="docker build . --tag $IMAGE_REPOSITORY/$IMAGE_NAME:$IMAGE_TAG"

    echo "Command to run: $command"
    output=$(${command} 2>&1)

    [ $? -ne 0 ] && echo "Output: ${output}" && echo "Ops! Something went wrong..." && exit 1
    echo "Output: ${output}"
}

_release_ci() {
    # Private travis env variables $DOCKER_USERNAME, $DOCKER_PASSWORD
    echo "RELEASE CI\n"
    echo "Build image $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV ...\n" 
    docker build -t $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV .

    echo "Tag image $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV --> $RELEASE_REPOSITORY/$IMAGE_NAME:$LATEST...\n" 
    docker tag $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV $RELEASE_REPOSITORY/$IMAGE_NAME:$LATEST

    echo "Login into docker hub. ...\n" 
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin 
    
    echo "Push $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV...\n" 
    docker push $RELEASE_REPOSITORY/$IMAGE_NAME:$DEV

    echo "Push $RELEASE_REPOSITORY/$IMAGE_NAME:$LATEST...\n" 
    docker push $RELEASE_REPOSITORY/$IMAGE_NAME:$LATEST
}

[ $# -eq 0 ] && echo "No args, no party. Try ${0##*/} -h" && exit 0

while [ $# -ne 0 ]; do
    case "${1:-}" in
        -h|--help)
            _help
            exit
            ;;
        -d|--deploy)
            _deploy
            shift
            ;;
        -b|--build)
            _build
            shift
            ;;
        -l|--launch)
            _launch
            shift
            ;;
        -c|--clean)
            _clean
            shift
            ;;
        -rci|--release-ci)
            _release_ci
            shift
            ;;
        ?*)
            printf 'Unknown option \"%s\", try %s -h \n' "$1" "${0##*/}" >&2
            break
            ;;
    esac
done

exit