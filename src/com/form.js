import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { v4 } from 'uuid';


export default function Form(){

const [name, setName] = useState();
const [email, setEmail] = useState();
const [phone, setPhone] = useState();
const [display, setDisplay] = useState(true);
const [created, setCreated] = useState(null);

function formHandle(e){
e.preventDefault();

//console.log(v4());

var data = qs.stringify({
  id: v4(),
  name: name,
  email: email,
  phone: phone 
});

var config = {
  method: 'post',
  url: 'http://localhost:5000/build',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}


return (
<>
<button className="btn" onClick={ ()=>{ setDisplay(false) }  }>CREATE</button>
<div className="form-dialog" hidden={display}>
<button onClick={ ()=>{setDisplay(true)} } className="cl-btn">X</button>
<form method="POST" onSubmit={ formHandle  }>
<input type="text" placeholder="Name" onChange={ (e)=>setName(e.target.value) }/>
<input type="email" placeholder="Email" onChange={ (e)=>setEmail(e.target.value) }/>
<input type="phone" placeholder="Phone" onChange={ (e)=>setPhone(e.target.value) }/>
<input className="btn" onClick={ ()=>{setCreated("Success")}  } type="submit" value={ (created)? created: "Create" }/>
</form>
</div>
</>
);
}
