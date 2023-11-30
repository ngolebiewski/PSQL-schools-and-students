const express = require('express');
const router = express.Router();

const PORT = 3000;

// HTML ROUTE
router.get('/', (req, res) => {
  res.send('<h1>hello student teacher world</h1>')});

console.log('I am the HTML ROUTE and I am working');

// API ROUTING

module.exports = router