import express from 'express';
import {
	handler as ssrHandler
} from './dist/server/entry.mjs';
import * as fs from "fs";
import * as http from "http";
import * as https from "https";

const privateKey = fs.readFileSync('/etc/letsencrypt/live/shrty.it/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/shrty.it/fullchain.pem', 'utf8');

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