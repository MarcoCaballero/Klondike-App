#!/bin/bash

DEPLOYMENT_NAME="klondike-deployment"
NAMESPACE="klondike-ns"
IMAGE_REPOSITORY="badibadi"
IMAGE_NAME="klondike-app"
IMAGE_TAG="0.0.1"

_help() {
cat << EOF
Usage: ${0##*/} <args>
    -h, --help             Display help.
    -d, --deploy           Deploy.
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
    local command="helm install helm --name $DEPLOYMENT_NAME \
        --debug --wait"

    echo "Command to run: $command"
    output=$(${command} 2>&1)

    [ $? -ne 0 ] && echo "Output: ${output}" && echo "Ops! Something went wrong..." && _clean && exit 1
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
        -d|--build)
            _build
            shift
            ;;
        -c|--clean)
            _clean
            shift
            ;;
        ?*)
            printf 'Unknown option \"%s\", try %s -h \n' "$1" "${0##*/}" >&2
            break
            ;;
    esac
done

exit