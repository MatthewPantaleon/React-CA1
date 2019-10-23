/**
 * @Date:   2019-10-22T11:26:33+01:00
 * @Last modified time: 2019-10-23T15:59:31+01:00
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


 export default function ApiLoader(type, id){
   console.log("EXORTED");

   let apiEnd = "";
   let results = [];

   // check input params
   if(type === "civ" && id === undefined && typeof type === "string"){
     console.log("Get all civs");
     apiEnd = "civilizations"
   }else if(type === "civ" && typeof id === "number" && typeof type === "string"){
     console.log("Get civ with Id");
     apiEnd = `civilization/${id}`;
   }else if(type === "unit" && id === undefined && typeof type === "string"){
     console.log("Get all units");
     apiEnd = `units`;
   }else if(type === "unit" && typeof id === "number" && typeof type === "string"){
     console.log("Get unit with Id");
   }else if(type === "struct" && id === undefined && typeof type === "string"){
     console.log("Get all strcutures");
   }else if(type === "struct" && typeof id === "number" && typeof type === "string"){
     console.log("Get structure with Id");
   }else if(type === "tech" && id === undefined){
     console.log("Get all techs");
   }else if(type === "tech" && typeof id === "number" && typeof type === "string"){
     console.log("Get tech with id");

   }else if(type === undefined){
     throw "Mssing type Parameter for API call. String or Array for first argument and optional id";
   }



   // return fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/${apiEnd}`)
   // .then(res => res.json());
   if(typeof type === "string" && (id === undefined || typeof id === "number")){
     return JSON.parse($.ajax({
       type: "GET",
       url: `https://age-of-empires-2-api.herokuapp.com/api/v1/${apiEnd}`,
       async: false
     }).responseText);
   }else if(Array.isArray(type) && id === undefined && typeof type !== "string"){
     
     for(let i = 0; i < type.length; i++){
       $.ajax({
         type: "GET",
         url: type[i],
         async: false,
         dataType: "JSON",
         success(data){
           results.push(data);
         }
       });
     }
     console.log(results);
     return results;
   }



 };
