const redis = require('redis'); 


const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();


function create(val){
 client.set('key', val);

}

function fetch(val){
 return client.get(val);
}


module.exports = {
 
create,
fetch

};
