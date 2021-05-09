#!/bin/bash
echo "------> listing contents of repo"

if [ -f .env  ]
then
  echo ".env found"
  while read p; do
    echo "$p"
  done <.env
fi
if [ -f .config  ]
then
  echo ".config found"
  while read p; do
    echo "$p"
  done <.config
fi