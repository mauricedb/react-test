@IF EXIST node_modules GOTO start-server
	call npm install

:start-server
start jsx --watch wwwroot/app/ wwwroot/build/ --extension jsx
explorer http://localhost:8080
npm start
