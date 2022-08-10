const express = require('express')
const app = express()
const db = require('./db'); 
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(db.fetch('key'))
})









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
