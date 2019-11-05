/**
 * @Date:   2019-10-22T11:26:33+01:00
 * @Last modified time: 2019-11-05T12:16:01+00:00
 */

import $ from 'jquery';

 export default function ApiLoader(type, id){
   // console.log("EXORTED");

   let apiEnd = "";
   let results = [];

   //boolean variables
   let noId = id === undefined;
   let withId = typeof id === "number";
   let stringType = typeof type === "string";


   // check input params
   if(type === "civ" && noId && stringType){//get all Civs
     console.log("Get all civs");
     apiEnd = "civilizations"
   }else if(type === "civ" && withId && stringType){//get civ with this id
     console.log("Get civ with Id");
     apiEnd = `civilization/${id}`;
   }else if(type === "unit" && noId && stringType){//get all units
     console.log("Get all units");
     apiEnd = `units`;
   }else if(type === "unit" && withId && stringType){//get unit with this id
     console.log("Get unit with Id");
      apiEnd = `unit/${id}`;
   }else if(type === "struct" && noId && stringType){//get all structures
     console.log("Get all strcutures");
      apiEnd = `structures`;
   }else if(type === "struct" && withId && stringType){//get structure with id
     console.log("Get structure with Id");
     apiEnd = `structure/${id}`;
   }else if(type === "tech" && noId && stringType){//get all techs
     console.log("Get all techs");
     apiEnd = `technologies`;
   }else if(type === "tech" && withId && stringType){//get tech with id
     console.log("Get tech with id");
     apiEnd = `technology/${id}`;

   }else if(type === undefined){//throw error if parameters are mismatched
     let e = {message: "Mssing type Parameter for API call. String or Array for first argument and optional id"};

     throw e.message;
   }

   //if the first parameter was a string with or without id
   if(stringType && (noId || withId)){

     return JSON.parse($.ajax({
       type: "GET",
       url: `https://age-of-empires-2-api.herokuapp.com/api/v1/${apiEnd}`,
       async: false,
       dataType: "json",
       async: false,
     }).responseText);


   }else if(Array.isArray(type) && noId && !stringType){//if an array of endpoints are given

     for(let i = 0; i < type.length; i++){
       $.ajax({
         type: "GET",
         url: type[i],
         async: false,
         crossDomain: true,
         dataType: "json",
         async: false,
         success(data){
           results.push(data);
         },
         error(e){
           console.log(e.message)
         }
       });
     }
     // console.log(results);
     return results;
   }



 };
