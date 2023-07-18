import express, { Express } from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app: Express = express();

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// router
app.use('/api/', router());


// db

// Server
const port = process.env.EXPRESS_PORT || 8080;
app.listen(port, () => {
	console.log(`⚡️[Technical Test]: Server is running at http://localhost:${port}`);
});
