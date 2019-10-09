const request = require('request');
const express = require('express');
const app = express();

const WORDS_API_URL = 'http://app.linkedin-reach.io';
const PORT = 5000;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);

	next();
});

app.get('/words', (req, res) => {
	const url = `${WORDS_API_URL}${req.originalUrl}`;

	request.get(url, (err, response, body) => {
		res.send(body);
	});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist'));
}

app.listen(PORT);

console.log(`LinkedIn-REACH Words proxy API is now running at: http://localhost:${PORT}`);
