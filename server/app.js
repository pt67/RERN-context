const express = require('express')
const app = express()
const db = require('./db'); 
const port = 5000

app.get('/', (req, res) => { 

  db.fetch('key').then(e=>res.send(e));

})


app.get('/create', (req, res) => {
  
  db.create('aeroplane');
  res.send("created.");

})




app.get('/remove', (req, res) => {

 db.remove('key').then(e=>res.send('deleted.'));

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
