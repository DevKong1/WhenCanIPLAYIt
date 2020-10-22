# WhenCanIPLAYIt

## Deployment via Docker
Navigate into /src 
Assert the .env variable FRONTEND_URL in Apiservice is set to http://localhost:3030
and execute 
```
docker build . -t app
```
Run the container with
```
docker run -d -p 3030:3030 app
```
The application will start at http://localhost:3030
## Deployment via Vue-Cli
Navigate into /src
Assert the .env variable FRONTEND_URL in Apiservice is set to http://localhost:8080
Start each Service from /Backend with
```
node ./index.js
```
Start the fronend with 
```
npm run serve
```
The application will start at http://localhost:8080

## Media
Any Media can be downloaded at https://drive.google.com/file/d/1M4xbcCWL8Vlh_xOkFDqjaGXH5fxdpQrp
