import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 1704

app.get('/', function(req, res) {
  res.send('<h1>hello world</h1>')
})

app.listen(port, hostname, () => {
  console.log(`hello http://${hostname}:${port}/`)
})