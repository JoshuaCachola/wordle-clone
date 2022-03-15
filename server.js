const express = require('express');
const port = process.env.PORT || 4321;
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

const words = fs.readFileSync('./public/words', 'utf8').split(/\r?\n/);
let word = words[0];

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
