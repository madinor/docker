const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');
const { connect } = require('mongoose');

// init app
const app = express();
const port = process.env.PORT || 4000;

// connect to redis client
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));
redisClient.connect();

// connect db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const URI= `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const pgInstance  = new Client({
//     connectionString: URI,
// });
// pgInstance.connect()
// .then(() => console.log('DB connected to postgres DB'))
// .catch((err) => console.log('failed to connect to postgres DB:', err));


const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo'
const URI= `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose 
.connect(URI)
.then(() => console.log('DB connected'))
.catch((err) => console.log('failed to connect to DB:', err));


app.get('/', (req, res) => {
    redisClient.set('visits', 100);
    res.send('<h1> Hello World! using docker hub</h1>');
});

app.get('/data', async (req, res) => {
    const visits = await redisClient.get('visits');
    res.send(`<h1> Hello World!nor</h1><h2>${visits}</h2>`);
});

app.listen(port, () => console.log(`app is running on port: ${port}`));
