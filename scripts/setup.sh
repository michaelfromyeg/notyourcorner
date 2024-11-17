#!/bin/bash

pushd client || exit

brew install nvm
nvm install --lts
nvm use --lts

popd || exit

pushd server || exit

brew install python@3.12
python3.12 -m venv env

source env/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

popd || exit
