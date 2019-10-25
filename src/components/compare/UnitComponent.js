/**
 * @Date:   2019-10-24T16:34:54+01:00
 * @Last modified time: 2019-10-25T15:02:17+01:00
 */

 import React, {Component} from 'react';
 import * as ReactCSS from 'react-bootstrap';
 import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';

 import ApiLoader from '../../ApiLoader';

/*
  Barracks: Champion, Halberdier, Elite eagle Warrior
  Archery Range:  Arbalest, Hand Cannnoneer, Heavy Cav Archer, Elite skirmisher
  Stable: Hussar, Paladin, Heavy Camel
  Dock: Fast Fire Ship, Elite Cannon Galleon, Galleon

  blacksmith:
    archer armor: {padde archer(1/1), leather archer armor(1/1), ring archer armor(1/2))
    archer attack: {fletching(1), bodkin arrow(1), bracer(1), gunpowerder(1)}
    inf and cav attack: {forging(1), ironcasting(1), blast furnace(2)}
    cav armor: {scalte barding armor(1/1), chain barding armor(1/1), plate barding armor(1/2)}
    inf armor: {scalte mail armor(1/1), chain mail armor(1/1), plate mail armor(1/2)}
    dock: {careening(0/1)}
*/

function getUnits(arrayOfNames){

  let result = [];
  let allArray = JSON.parse(localStorage.getItem("u")).units;

  arrayOfNames.forEach((name, i) => {
    for(let counter = 0; counter < allArray.length; counter++){
      if(allArray[counter].name === name){
        result.push(allArray[counter]);
        break;
      }
    }
  });
  return result;
}


 class UnitComponent extends Component{

   constructor(props){
     super(props);

     this.state = {
       techs: {},
       units: {},
       strcutures: {},
       age: "Imperial",
       Archers: [],
       Infantry: [],
       Cavalry: [],
       Ships: [],
       selectedOption: "Archers"
     };

     this.structs = ["Archers", "Infantry", "Cavalry", "Ships"];
   }

   componentDidMount(){
     if(!localStorage.getItem("u") || !localStorage.getItem("s") || !localStorage.getItem("t")){

       //get all data
       this.setState({techs: ApiLoader("tech")}, () => localStorage.setItem("t", JSON.stringify(this.state.techs)));
       this.setState({structures: ApiLoader("struct")}, () => localStorage.setItem("s", JSON.stringify(this.state.strcutures)));
       this.setState({units: ApiLoader("unit")}, () => localStorage.setItem("u", JSON.stringify(this.state.units)));

     }else{
       this.setState({techs: JSON.parse(localStorage.getItem("t"))});
       this.setState({strcutures: JSON.parse(localStorage.getItem("s"))});
       this.setState({units: JSON.parse(localStorage.getItem("u"))});
     }

     let localUnits = JSON.parse(localStorage.getItem("u"));
     let localStructures = JSON.parse(localStorage.getItem("s"));
     let localTechs = JSON.parse(localStorage.getItem("t"));

     let infantryArray = ["Champion", "Halberdier", "Elite Eagle Warrior"];
     let archerArray = ["Arbalest", "Hand Cannoneer", "Heavy Cavalry Archer", "Elite Skirmisher"];
     let cavalryArray = ["Hussar", "Paladin", "Heavy Camel"];
     let shipArray = ["Fast Fire Ship", "Elite Cannon Galleon", "Galleon"];

     //get all imperial age units for the Barracks
     this.setState({Infantry: getUnits(infantryArray)});

     //get all imperial archery range units *Imperial Skirmisher is Castle Age but Imperial Skirmisher does not exist in Age of Conquerors
     this.setState({Archers: getUnits(archerArray)});

     //get all IMperial Cavalry units
     this.setState({Cavalry: getUnits(cavalryArray)});

     //get all imperial ships
     this.setState({Ships: getUnits(shipArray)});
   }

   changeOptions(e){
     // console.log(e.target.value);
     this.setState({selectedOption: e.target.value});
   }

   render(){
     return(
       <>
        <select className="form-control mb-3" onChange={(e) => this.changeOptions(e)}>
        {this.structs.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>

        <select className="form-control">
        {this.state[this.state.selectedOption].map((e, i) => <option key={i}>{e.name}</option>)}
        </select>

        <hr />

        <ul>
        <li>Test</li>
        </ul>
       </>

     );
   }

 }


export default UnitComponent;
