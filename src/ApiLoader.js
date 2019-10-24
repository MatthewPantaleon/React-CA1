/**
 * @Date:   2019-10-22T11:26:33+01:00
 * @Last modified time: 2019-10-24T19:28:57+01:00
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

 export default function ApiLoader(type, id){
   // console.log("EXORTED");

   let apiEnd = "";
   let results = [];

   // check input params
   if(type === "civ" && id === undefined && typeof type === "string"){//get all Civs
     console.log("Get all civs");
     apiEnd = "civilizations"
   }else if(type === "civ" && typeof id === "number" && typeof type === "string"){//get civ with this id
     console.log("Get civ with Id");
     apiEnd = `civilization/${id}`;
   }else if(type === "unit" && id === undefined && typeof type === "string"){//get all units
     console.log("Get all units");
     apiEnd = `units`;
   }else if(type === "unit" && typeof id === "number" && typeof type === "string"){//get unit with this id
     console.log("Get unit with Id");
      apiEnd = `unit/${id}`;
   }else if(type === "struct" && id === undefined && typeof type === "string"){//get all structures
     console.log("Get all strcutures");
      apiEnd = `structures`;
   }else if(type === "struct" && typeof id === "number" && typeof type === "string"){//get structure with id
     console.log("Get structure with Id");
     apiEnd = `structure/${id}`;
   }else if(type === "tech" && id === undefined && typeof type === "string"){//get all techs
     console.log("Get all techs");
     apiEnd = `technologies`;
   }else if(type === "tech" && typeof id === "number" && typeof type === "string"){//get tech with id
     console.log("Get tech with id");
     apiEnd = `technology/${id}`;

   }else if(type === undefined){
     throw "Mssing type Parameter for API call. String or Array for first argument and optional id";
   }

   //if the first parameter was a string and/or with id
   if(typeof type === "string" && (id === undefined || typeof id === "number")){

     return JSON.parse($.ajax({
       type: "GET",
       url: `https://age-of-empires-2-api.herokuapp.com/api/v1/${apiEnd}`,
       async: false
     }).responseText);

   }else if(Array.isArray(type) && id === undefined && typeof type !== "string"){//if an array of endpoints are given

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
     // console.log(results);
     return results;
   }



 };
