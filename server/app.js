const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const db = require('./db'); 
const port = 5000;
var cors = require('cors')

app.use(cors());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(bodyParser.json());


app.get('/', (req, res) => { 

  db.fetch('key').then(e=>res.send(e));

})


app.get('/create', (req, res) => {
  
  db.create('aeroplane');
  res.send("created.");

});

app.post('/build', urlencodedParser, (req, res) => {
 console.log(req.body);

 db.create(req.body);  

 res.json({status: "Success."});

})


app.post('/update', urlencodedParser, (req, res) => {
   console.log(req.body);
   let type = req.body.utype;
   let id = req.body.id;
   let newname = req.body.newname;

   db.update(type, id, newname);

})




app.get('/remove', (req, res) => {

 db.remove('key').then(e=>res.send('deleted.'));

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
