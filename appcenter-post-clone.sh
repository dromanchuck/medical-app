#!/usr/bin/env bash

echo "REACT_API_URL=$REACT_API_URL" >> .env

echo "Uninstalling all CocoaPods versions"
sudo gem uninstall cocoapods --all --executables

COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock`

echo "Installing CocoaPods version $COCOAPODS_VER"
sudo gem install cocoapods -v $COCOAPODS_VER