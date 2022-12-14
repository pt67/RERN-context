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
  
  let data = {id: '9261e90c-83ce-4cec-9ad3-c5375444ac76', name: 'sonam', email: 'sonam!@gmail.com', phone: '23234213'};
  db.create(data);
  res.send("created.");

});

app.post('/build', urlencodedParser, (req, res) => {
 console.log(req.body);

 db.create(req.body);  

 res.json({status: "Success."});

})


app.post('/update', urlencodedParser, (req, res) => {
  // console.log(req.body);
   db.update(req.body.utype, req.body.id, req.body.newval);
})




app.post('/remove', urlencodedParser, (req, res) => {
 
console.log(req.body);

   res.send(req.body);

 db.remove(req.body.id);

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
