import express from 'express';
import {
	handler as ssrHandler
} from './dist/server/entry.mjs';
import * as fs from "fs";
import * as http from "http";
import * as https from "https";

const privateKey = fs.readFileSync('/shrty/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/shrty/fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate
};

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);

console.log("Server listening on port 80");
console.log("Server listening on port 443");