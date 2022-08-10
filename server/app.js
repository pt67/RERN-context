const express = require('express')
const app = express()
const db = require('./db'); 
const port = 5000

app.get('/', (req, res) => {
  db.fetch('key').then(e=> console.log(e));  
  
  res.send(db.fetch('key'));

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
