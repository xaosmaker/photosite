#! /bin/sh


kubectl create secret generic ticketing-secrets \
  --from-env-file=./.envs/.local.env \
  --dry-run=client -o yaml > ticketing-secrets.yaml

