docker-compose down;

touch ./.env-prod && echo "PRIVATE_KEY=$(cat /etc/letsencrypt/live/shrty.it/privkey.pem | base64 | tr -d '\n')" >> ./.env-prod && echo "CERTIFICATE=$(cat /etc/letsencrypt/live/shrty.it/fullchain.pem | base64 | tr -d '\n')" >> ./.env-prod && docker-compose -f docker-compose.prod.yml --env-file ./.env-prod up -d;