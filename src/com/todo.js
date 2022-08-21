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
   console.log(result);
   setDialog(false);
   setDetail(result);
}

function updateData(utype){
  var id = (detail)? detail.id: "";

  var data = qs.stringify({
  id: id,
  newname: newval,
  utype: utype.target.parentElement.className   
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
 



}


if(!list) return "No result found.";


return (

<>
<h1>TO DO</h1>
<Form/>

<ul className="list">
{/*

list.map(e=>
    <li className="list-item" key={e.id}> 
     <span> {e.name}</span> 
     <button id={e.id} onClick={ getDetail }>DETAIL</button>
    </li>
)

*/}

</ul>
<div className="wrapper" hidden={dialog}>
<div className="dialog-box" hidden={dialog}>
   <button className="cl-btn" onClick={ ()=>{ setDialog(true)  }}>X</button> 
  <div className="name">
      <div>Name: </div>
     { (nameedit) ? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={ (detail ? detail.name: "") }/> : <div> { (detail) ? detail.name: null }</div> } 
     { (!nameedit) ? <span onClick={ ()=>{ setEditModeForName(true) } }>edit</span>
      : <button onClick={ updateData }>Update</button> } 
   </div>
   <div className="email">
     <div> Email:</div>
    { (editemail) ? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={(detail)? detail.email: "" }/>:  <div> { (detail) ? detail.email: null }</div>}
    { (!editemail)? <span onClick={ ()=>{ setEditemail(true) } }>edit</span> : <button onClick={ updateData }>Update</button> } 
   </div>
   <div className="phone">
      <div>Phone:</div>
      { (editphone)? <input type="text" onChange={(e)=>{setNewval(e.target.value)} }  placeholder={(detail)? detail.phone: "" }/> : <div> { (detail) ? detail.phone: null }</div>} 
      { (!editphone)? <span onClick={()=>{setEditphone(true) } }>edit</span>: <button onClick={ updateData }>Update</button> }  
  </div>
</div>
</div>

</>
);

}
