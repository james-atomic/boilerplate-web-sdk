#!/bin/sh

cd ../src/keys

ssh-keygen -t rsa -P "" -b 4096 -E SHA512 -m PKCS8 -f boilerplate-example.key
ssh-keygen -e -m PKCS8 -f boilerplate-example.key > boilerplate-example.key.pub

mv boilerplate-example.key ./src/keys/boilerplate-example.key
mv boilerplate-example.key.pub ./src/keys/boilerplate-example.key.pub