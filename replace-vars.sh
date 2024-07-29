#!/bin/bash

# Export environment variables
export ENV_AT_SECRET=${AT_SECRET}
export ENV_AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export ENV_AWS_REGION=${AWS_REGION}
export ENV_AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
export ENV_DATABASE_URL=${DATABASE_URL}
export ENV_ECR_REPOSITORY=${ECR_REPOSITORY}
export ENV_EMAIL_OPTIONS_FROM=${EMAIL_OPTIONS_FROM}
export ENV_RT_SECRET=${RT_SECRET}
export ENV_SENDGRID_API_KEY=${SENDGRID_API_KEY}
export ENV_TK_EMAIL_SECRET=${TK_EMAIL_SECRET}

export ENV_LIGHTSAIL_SERVICE_NAME=${LIGHTSAIL_SERVICE_NAME}
export ENV_API_CORREIOS_URL=${API_CORREIOS_URL}
export ENV_APP_PORT=${APP_PORT}
export ENV_ENV=${ENV}
export ENV_FRONTEND_RECOVER_PASSWORD_URL=${FRONTEND_RECOVER_PASSWORD_URL}
export ENV_FRONT_END_URL=${FRONT_END_URL}
export ENV_IMAGE_TAG=${IMAGE_TAG}
export ENV_JWT_ACCESS_LIFETIME=${JWT_ACCESS_LIFETIME}
export ENV_JWT_REFRESH_LIFETIME=${JWT_REFRESH_LIFETIME}
export ENV_TK_EMAIL_LIFETIME=${TK_EMAIL_LIFETIME}

export IMAGEM_DO_CONTAINER=${ECR_REPOSITORY}

escape_sed() {
    echo "$1" | sed -e 's/[\/&]/\\&/g'
}

KEYS=(
    "ENV_AT_SECRET"
    "ENV_AWS_ACCESS_KEY_ID"
    "ENV_AWS_REGION"
    "ENV_AWS_SECRET_ACCESS_KEY"
    "ENV_DATABASE_URL"
    "ENV_ECR_REPOSITORY"
    "ENV_EMAIL_OPTIONS_FROM"
    "ENV_RT_SECRET"
    "ENV_SENDGRID_API_KEY"
    "ENV_TK_EMAIL_SECRET"
    "ENV_LIGHTSAIL_SERVICE_NAME"
    "ENV_API_CORREIOS_URL"
    "ENV_APP_PORT"
    "ENV_ENV"
    "ENV_FRONTEND_RECOVER_PASSWORD_URL"
    "ENV_FRONT_END_URL"
    "ENV_IMAGE_TAG"
    "ENV_JWT_ACCESS_LIFETIME"
    "ENV_JWT_REFRESH_LIFETIME"
    "ENV_TK_EMAIL_LIFETIME"
    "IMAGEM_DO_CONTAINER"
)

for KEY in "${KEYS[@]}"; do
    VALUE=$(escape_sed "${!KEY}")
    awk -v key="$KEY" -v value="$VALUE" '{ gsub(key, value); print }' $CONFIG_FILE > temp.json && mv temp.json $CONFIG_FILE
done
