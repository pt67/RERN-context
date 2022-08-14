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

function fetch(val){
 return client.get(val);
}

function remove(val){
 return client.del(val);
}


module.exports = {
 
create,
fetch,
remove

};
