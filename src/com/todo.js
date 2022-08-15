import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './form';

export default function Todo(){

const [list, setList] = useState(null);

useEffect(()=>{

async function fetchData(){
const url = await axios.get('http://localhost:5000');
console.log(url.data);
setList(url.data);


}

fetchData();


}, []);

if(!list) return "No result found.";


return (

<>
<h1>TO DO</h1>
<Form/>

<ul>
{

list.map(e=>
    <li key={e.id}> {e.name} </li>
)

}
</ul>


</>
);

}
