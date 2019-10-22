/**
 * @Date:   2019-10-22T11:26:33+01:00
 * @Last modified time: 2019-10-22T16:00:17+01:00
 */

 import React from 'react';
 import ReactDOM from 'react-dom';


 export default function ApiLoader(type, id){
   console.log("EXORTED");

   let apiEnd = "";
   let result;

   // check input params
   if(type === "civ" && id === undefined){
     console.log("Get all civs");
     apiEnd = "civilizations"
   }else if(type === "civ" && typeof id === "number"){
     console.log("Get civ with Id");
     apiEnd = `civilization/${id}`;
   }else if(type === "unit" && id === undefined){
     console.log("Get all units");
     apiEnd = `units`;
   }else if(type === "unit" && typeof id === "number"){
     console.log("Get unit with Id");
   }else if(type === "struct" && id === undefined){
     console.log("Get all strcutures");
   }else if(type === "struct" && typeof id === "number"){
     console.log("Get structure with Id");
   }else if(type === "tech" && id === undefined){
     console.log("Get all techs");
   }else if(type === "tech" && typeof id === "number"){
     console.log("Get tech with id");
   }else{
     throw "Mssing type Parameter for API call";
   }




   fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/${apiEnd}`)
   .then(res => res.json())
   .then(data => {
     
     }
   );
 };
