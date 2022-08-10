const redis = require('redis'); 


const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();


function create(val){
 client.set('key', val);

}

function fetch(val){
 client.get(val).then(e=>console.log(e));
}


module.exports = {
 
create,
fetch

};
