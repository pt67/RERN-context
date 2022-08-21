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
  console.log(JSON.parse(getsrc));
 
  var updated = getall.find(e=>e.id ===vid).vtype = newval;
  client.set("key", JSON.stringify(updated))
  .then(e=>console.log("update success."))
  .catch(err=>console.log(err));
}

function fetch(val){
 return client.get(val);
}

function remove(val){
 return client.del(val);
}


module.exports = {
 
create,
fetch,
remove,
update
};
