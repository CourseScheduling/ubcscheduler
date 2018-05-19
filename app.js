const express = require('express')
const app = express()
const api = require('./api/router');

app.get('/', (req, res) => res.send('UBC Course API v1'))

app.listen(3001, () => console.log('Example app listening on port 3001!'))

app.use('/api/v1', api)