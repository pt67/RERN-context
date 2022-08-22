const redis = require('redis'); 


const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

let data = [];
function create(val){
 data.push(val);

 client.set('key', JSON.stringify(data))
.then(e=>console.log("success- 200"))
.catch(err=>console.log(err));

}

async function update(vtype, vid, newval){  //name, uid, newname
  var getsrc = await client.get('key');
  var getall = JSON.parse(getsrc);
  console.log(vtype);
 
  switch(vtype){
     case 'name':
     getall.find(e=>e.id ===vid).name = newval;
     break;
     case 'email':
     getall.find(e=>e.id ===vid).email = newval;
     break;
     case 'phone':
     getall.find(e=>e.id ===vid).phone = newval
     break; 
  }
  client.set("key", JSON.stringify(getall))
  .then(e=>console.log("update success."))
  .catch(err=>console.log(err));
}

function fetch(val){
 return client.get(val);
}

async function remove(val){
  var getsrc = await client.get('key');
  var dall = JSON.parse(getsrc);

  let delone = dall.find(e=>e.id === val);
  let findindex= dall.indexOf(delone);
  dall.splice(findindex, 1);

 client.set("key", JSON.stringify(dall))
 .then(e=>console.log("Deleted."))
 .catch(err=>console.log(err));
}


module.exports = {
 
create,
fetch,
remove,
update
};
