#!/bin/bash

while getopts "p:" option; do
  case $option in
    p)
      path=$OPTARG
    ;;
  esac
done

server='ap-user@192.168.1.211 -p 10322'
keep_releases=6
now=$(date +%Y%m%d%H%M)

if [[ `git status --porcelain` ]]; then
  echo 'Please commit your changes!'
else
  ssh $server "mkdir -p $path/$now"
  ssh $server "source ~/.nvm/nvm.sh &&
    cd $path/repo &&
    git checkout HEAD -- package.json pnpm-lock.yaml &&
    git pull &&
    ~/.local/share/pnpm/pnpm update &&
    NODE_OPTIONS=--max-old-space-size=4096 ~/.local/share/pnpm/pnpm build &&
    cp -r ./build/* $path/$now &&
    cd $path &&
    ls -t | grep -v repo | sed -e '1,${keep_releases}d' | xargs -r -d '\n' rm -r &&
    rm -f ./current &&
    ln -s ./$now ./current &&
    echo 'deployed to $now'"
fi
