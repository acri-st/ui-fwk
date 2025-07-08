#!/bin/sh
echo "Starting nginx"
nginx

echo "Starting framework"
    
echo "[FWK] installing packages"
cd /frontend/ && npm i

echo "[FWK] starting dev"
npm run dev

inotifywait -m -e modify /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf | while read path action file; do
    echo "Configuration change detected: $action $file"
    nginx -s reload
done