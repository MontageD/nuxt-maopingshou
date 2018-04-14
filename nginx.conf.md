
upstream mywww {
 server 127.0.0.1:3000;
}

upstream mydata {
   server 127.0.0.1:6667;
}

server {
  listen 80;
  return 301 https://$host$request_uri;
}

//  部署主域名信息
server {
    listen 443 ssl default_server;     // 默认
    server_name  www.***.com ***.com;   // 填写需要绑定的域名，用***代替.com 域名


    ssl off;    #关闭ssl支持
    ssl_certificate   cert/214596475630812.pem;
    ssl_certificate_key  cert/214596475630812.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';


  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://localhost:3000/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
  }
 
}



# 服务器接口数据的域名部署
server {
  listen 443  ssl;
  server_name  data.***.com;


  ssl off;    #开启ssl支持
  ssl_certificate   cert/214596475630812.pem;
  ssl_certificate_key  cert/214596475630812.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';


  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://localhost:6667/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
  }


 
}



