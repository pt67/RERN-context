const express = require('express')
const app = express()
const db = require('./db'); 
const port = 5000

app.get('/', (req, res) => { 

  db.fetch('key').then(e=>res.send(e));

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
