const express = require('express');
const port = process.env.PORT || 4321;
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

// creates an array from reading the words from file
const words = fs.readFileSync('./public/words', 'utf8').split(/\r?\n/);
// server sends out the first word in the list
let word = words[0];

// IIFE to update word every 5 minutes
(() => setInterval(() => {
  const randomIdx = Math.floor(Math.random() * words.length);
  word = words[randomIdx]
}, 1000 * 60 * 5))();

app.get('/', (_, res) => {
  res.send({word});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})
