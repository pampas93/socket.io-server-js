# Simple Socket.io Server with proxy
* Simple node server with socket.io listening on 3000 port
* But this cannot run alone, since socket.io cpp client needs to connect to proxy server with HTTP upgrade
* nginx configuration file [link](https://gist.github.com/pampas93/23fdc263f7a017b4b391e3d90c6f8912)

### Build setup
* Clone this repository locally and `npm install`
* Run the local server `npm start` and visit  `localhost:3000` - To make sure node works fine
* Install nginx and setup nginx.conf (check NGINX details below)
* Run nginx with `nginx.exe` (I'm running on windows) and goto `localhost:8090`
* Voila! Server is up and running and now, socket.io cpp client can connect to the server

### NGINX details
* Download nginx from official site, and setup. (I'm running Nginx for windows, but linux is preferred)
* Edit nginx.conf file to create a proxy server and HTTP upgrade - [GIST file](https://gist.github.com/pampas93/23fdc263f7a017b4b391e3d90c6f8912)
#### nginx.conf
```
worker_processes 1;

events {
        worker_connections 1024;
}
http {
        include mime.types;
        default_type application/octet-stream;
        sendfile on;
        keepalive_timeout 65;
        gzip on;
server {
        listen 8090;
        server_name localhost;
        location / {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_http_version 1.1;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass http://localhost:3000;
        }
  }
}
```

------------
### Resources
- [Nginx for windows setup](https://vexxhost.com/resources/tutorials/nginx-windows-how-to-install/)
- [Nginx setup for socket.io + node](https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/)
