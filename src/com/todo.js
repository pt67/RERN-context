import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './form';

export default function Todo(){

const [list, setList] = useState(null);
const [detail, setDetail] = useState(null);
const [dialog, setDialog] = useState(true);

useEffect(()=>{

async function fetchData(){
const url = await axios.get('http://localhost:5000');
console.log(url.data);
setList(url.data);


}

fetchData();


}, []);


function getDetail(e){
   e.preventDefault();
   let result = list.find(d=>d.id === e.target.id);
   console.log(result);
   setDialog(false);
   setDetail(result);
}


if(!list) return "No result found.";


return (

<>
<h1>TO DO</h1>
<Form/>

<ul className="list">
{

list.map(e=>
    <li className="list-item" key={e.id}> 
     <span> {e.name}</span> 
     <button id={e.id} onClick={ getDetail }>DETAIL</button>
    </li>
)

}

</ul>
<div className="wrapper" hidden={dialog}>
<div className="dialog-box" hidden={dialog}>
   <button className="cl-btn" onClick={ ()=>{ setDialog(true)  }}>X</button> 
  <div className="name">
      <div>Name: </div><div> { (detail) ? detail.name: null }</div> 
   </div>
   <div className="email">
     <div> Email:</div><div> { (detail) ? detail.email: null }</div> 
   </div>
   <div className="phone">
      <div>Phone:</div><div> { (detail) ? detail.phone: null }</div> 
   </div>
</div>
</div>

</>
);

}
