/**
 * @Date:   2019-10-24T16:34:54+01:00
 * @Last modified time: 2019-11-04T17:24:58+00:00
 */

import React, {Component} from 'react';
import * as ReactCSS from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

/*
  Barracks: Champion, Halberdier, Elite eagle Warrior
  Archery Range:  Arbalest, Hand Cannoneer, Heavy Cav Archer, Elite skirmisher
  Stable: Hussar, Paladin, Heavy Camel
  Dock: Fast Fire Ship, Elite Cannon Galleon, Galleon

  blacksmith: //NOt implemented
    archer armor: {padde archer(1/1), leather archer armor(1/1), ring archer armor(1/2))
    archer attack: {fletching(1), bodkin arrow(1), bracer(1), gunpowerder(1)}
    inf and cav attack: {forging(1), ironcasting(1), blast furnace(2)}
    cav armor: {scalte barding armor(1/1), chain barding armor(1/1), plate barding armor(1/2)}
    inf armor: {scalte mail armor(1/1), chain mail armor(1/1), plate mail armor(1/2)}
    dock: {careening(0/1)}
*/

 class UnitComponent extends Component{

   constructor(props){
     super(props);

     this.state = {
       units: [],
       age: "Imperial",
       archersArray: [],
       infantryArray: [],
       cavalryArray: [],
       shipsArray: [],
       selectedOption: "Archers",
       unitOptions: [],
       selectedUnit: {name: "Arbalest", cost: {}, attack_bonus: []},
       totalCost: 0
     };

     this.structs = ["Archers", "Infantry", "Cavalry", "Ships"];
     this.archerArray = ["Arbalest", "Hand Cannoneer", "Heavy Cavalry Archer", "Elite Skirmisher"];
     this.infantryArray = ["Champion", "Halberdier", "Elite Eagle Warrior"];
     this.cavalryArray = ["Hussar", "Paladin", "Heavy Camel"];
     this.shipsArray = ["Fast Fire Ship", "Elite Cannon Galleon", "Galleon"];
   }

   getUnits(arrayOfNames){
     let temp = [];


     for(let j = 0; j < this.state.units.length; j++){
       if(arrayOfNames.includes(this.state.units[j].name)){
         temp.push(this.state.units[j]);
       }
     }

     return temp;
   }



   componentDidMount(){

     let tempArchers = [];
     let tempInfantry = [];
     let tempCavalry = [];
     let tempShips = [];

     if(localStorage.getItem("u")){
       this.setState({units: JSON.parse(localStorage.getItem("u")).units}, () => {
         console.log("COOLIO");
         console.log(this.state.units);
         this.setState({
           archersArray: this.getUnits(this.archerArray),
           infantryArray: this.getUnits(this.infantryArray),
           cavalryArray: this.getUnits(this.cavalryArray),
           shipsArray: this.getUnits(this.shipsArray)
         }, () => console.log(this.state));
       });
     }else{
       this.setState({units: this.props.resend("unit")}, () => localStorage.setItem("u", JSON.stringify(this.state.units)));
     }

     this.setState({
       unitOptions: this.archerArray
     });




     //get all unit objects for each unit type array


   }

   //when type of units changes get the first unit from the list
   changeOptions(e){

   }


   render(){
     return(
       <>

        <select className="form-control mb-3" onChange={(e) => this.changeOptions(e)}>
        {this.structs.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>

        <select className="form-control mb-3" onChange={(e) => this.changeOptions(e)} id="unitSelect">
        {/*this.state[this.state.selectedOption].map((e, i) => <option value={e.name} key={i}>{e.name}</option>) */}
        </select>
        <hr />

        <h5 className="text-center">{this.state.selectedUnit.name}</h5>
        <div className="row justify-content-center">
          <img className="img-fluid mb-4" src={require(`../../images/units/${this.state.selectedUnit.name}.jpg`)} alt={this.state.selectedUnit.name}/>
        </div>

        <h5>Description</h5>
        <p>{this.state.selectedUnit.description}</p>

        <h5>Stats:</h5>
        <ul>
        <Details name={"Hit Points"} value={this.state.selectedUnit.hit_points}/>
        <Details name={"Attack"} value={this.state.selectedUnit.attack}/>
        <Details name={"Range"} value={this.state.selectedUnit.range}/>
        <Details name={"Armour"} value={this.state.selectedUnit.armor}/>
        </ul>

        <hr />

        <ul>
        <Details name={"Age"} value={this.state.selectedUnit.age}/>
        <Details name={"Build Time"} value={this.state.selectedUnit.build_time}/>
        <Details name={"Expansion"} value={this.state.selectedUnit.expansion}/>
        <Details name={"Line of Sight"} value={this.state.selectedUnit.line_of_sight}/>
        <Details name={"Movement Speed"} value={this.state.selectedUnit.movement_rate}/>
        <Details name={"Reload Time"} value={this.state.selectedUnit.reload_time}/>
        <Details name={"Accuracy"} value={this.state.selectedUnit.accuracy}/>
        </ul>

        <h5>Cost:</h5>
        <ul>
        {Object.keys(this.state.selectedUnit.cost).map((e, i) => {
          return <li key={e}><b>{e}</b>: {Object.values(this.state.selectedUnit.cost)[i]}</li>;
        })}
        </ul>
        <hr />
        <h5>Attack Bonuses:</h5>
        {this.state.selectedUnit.attack_bonus ?<ul>{this.state.selectedUnit.attack_bonus.map((e, i) => <li key={i}>{e}</li>)}</ul> : <li>N/A</li>}
       </>

     );
   }
 }

//display list components with various names and values
class Details extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <>
      {this.props.value ? <li><b>{this.props.name}: </b>{this.props.value}</li> : <li><b>{this.props.name}: </b>N/A</li>}
      </>
    );
  }
}


export default UnitComponent;
