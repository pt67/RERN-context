import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Form from './form';

export default function Todo(){


const nameref = useRef();
const [list, setList] = useState(null);
const [detail, setDetail] = useState(null);
const [dialog, setDialog] = useState(true);
const [nameedit, setEditModeForName] = useState(false);
const [editemail, setEditemail] = useState(false);
const [editphone, setEditphone] = useState(false);

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

function editModename(e){
  setEditModeForName(true);
  
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
      <div>Name: </div>
     { (nameedit) ? <input type="text"/> : <div> { (detail) ? detail.name: null }</div> } 
     { (!nameedit) ? <span onClick={ editModename }>edit</span>
      : <button>Update</button> } 
   </div>
   <div className="email">
     <div> Email:</div>
    { (editemail) ? <input type="text"/>:  <div> { (detail) ? detail.email: null }</div>}
    { (!editemail)? <span onClick={ ()=>{ setEditemail(true) } }>edit</span> : <button>Update</button> } 
   </div>
   <div className="phone">
      <div>Phone:</div>
      { (editphone)? <input type="text"/> : <div> { (detail) ? detail.phone: null }</div>} 
      { (!editphone)? <span onClick={()=>{setEditphone(true) } }>edit</span>: <button>Update</button> }  
  </div>
</div>
</div>

</>
);

}
