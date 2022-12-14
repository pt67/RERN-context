import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Form from './form';
import qs from 'qs';

export default function Todo(){

const getText = useRef();
const [list, setList] = useState(null);
const [detail, setDetail] = useState(null);
const [dialog, setDialog] = useState(true);
const [nameedit, setEditModeForName] = useState(false);
const [editemail, setEditemail] = useState(false);
const [editphone, setEditphone] = useState(false);
const [update, setUpdate] = useState(true);

//update 
const [newval, setNewval] = useState(null);


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
   console.log(list.indexOf(result));
   setDialog(false);
   setDetail(result);
}

function delData(e){
   e.preventDefault();
   let result = list.find(d=>d.id === e.target.id);
   let findindex= list.indexOf(result);
   list.splice(findindex,1);
   console.log(list);
  
  var config = {
  method: 'post',
  url: 'http://localhost:5000/remove',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : qs.stringify({ id: e.target.id })
}; 

  axios(config)
.then(function (response) {
  
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

window.location.reload();

}


function updateData(type){
  var id = (detail)? detail.id: "";
//  var utype = type.target.parentElement.className;

//  var setdata = list.find(l=>l.id === id).name = newval;   

//  console.log(list);
   

  var data = qs.stringify({
  id: id,
  newval: newval,
  utype: type.target.parentElement.className   
});

var config = {
  method: 'post',
  url: 'http://localhost:5000/update',
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

setUpdate(false);
window.location.reload(); 

}


if(!list) return "No result found.";


return (

<>
<h1>CONTACTS</h1>
<Form/>

<ul className="list">
{

list.map(e=>
    <li className="list-item" key={e.id}> 
     <span> {e.name}</span> 
     <button id={e.id} onClick={ getDetail }>DETAIL</button>
     <button id={e.id} onClick={ delData }>Delete</button>
    </li>
)

}

</ul>
<div className="wrapper" hidden={dialog}>
<div className="dialog-box" hidden={dialog}>
   <button className="cl-btn" onClick={ ()=>{ setDialog(true)  }}>X</button> 
  <div className="name">
      <div>Name: </div>
     { (nameedit) ? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={ (detail ? detail.name: "") }/> : <div> { (detail) ? detail.name: null }</div> } 
     { (!nameedit) ? <span onClick={ ()=>{ setEditModeForName(true) } }>edit</span>
      : <button onClick={ updateData }>
      {(update)? "Update": "Success"  }</button> } 
   </div>
   <div className="email">
     <div> Email:</div>
    { (editemail) ? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={(detail)? detail.email: "" }/>:  <div> { (detail) ? detail.email: null }</div>}
    { (!editemail)? <span onClick={ ()=>{ setEditemail(true) } }>edit</span> : <button onClick={ updateData }>
   {(update)? "Update": "Success"  } </button> } 
   </div>
   <div className="phone">
      <div>Phone:</div>
      { (editphone)? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={(detail)? detail.phone: "" }/> : <div> { (detail) ? detail.phone: null }</div>} 
      { (!editphone)? <span onClick={()=>{setEditphone(true) } }>edit</span>: 
      <button onClick={ updateData }> {(update)? "Update": "Success"  } </button> }  
  </div>
</div>
</div>

</>
);

}
