/**
 * @Date:   2019-10-24T16:34:54+01:00
 * @Last modified time: 2019-11-04T18:58:06+00:00
 */

import React, {Component} from 'react';
import * as ReactCSS from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
       selectedOption: "archersArray",
       unitOptions: [],
       selectedUnit: {name: "Arbalest", cost: {}, attack_bonus: []},
       totalCost: 0
     };

     this.structs = ["Archers", "Infantry", "Cavalry", "Ships"];
     this.archersArray = ["Arbalest", "Hand Cannoneer", "Heavy Cavalry Archer", "Elite Skirmisher"];
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

     if(localStorage.getItem("u")){
       this.setState({units: JSON.parse(localStorage.getItem("u")).units}, () => {

         this.setState({
           archersArray: this.getUnits(this.archersArray),
           infantryArray: this.getUnits(this.infantryArray),
           cavalryArray: this.getUnits(this.cavalryArray),
           shipsArray: this.getUnits(this.shipsArray)
         }, () => {
           this.setState({selectedUnit: this.state.archersArray[0]}, () => {

             let costArray = Object.values(this.state.selectedUnit.cost);
             this.props.recieveData(this.state.selectedUnit.name, costArray.reduce((a, b) => a + b), this.props.cardNo);

           })
         });

       });
     }else{//if the localstorage hasn't been set
       this.setState({units: this.props.resend("unit").units}, () => {
         localStorage.setItem("u", JSON.stringify(this.state.units));

         this.setState({
           archersArray: this.getUnits(this.archersArray),
           infantryArray: this.getUnits(this.infantryArray),
           cavalryArray: this.getUnits(this.cavalryArray),
           shipsArray: this.getUnits(this.shipsArray)
         }, () => {
           this.setState({selectedUnit: this.state.archersArray[0]}, () =>{

             let costArray = Object.values(this.state.selectedUnit.cost);
             this.props.recieveData(this.state.selectedUnit.name, costArray.reduce((a, b) => a + b), this.props.cardNo);
           })
         });

       });
     }


   }

   //when type of units changes get the first unit from the list
   changeOptions(e){

     //boolean properties
     let av = this.archersArray.includes(e.target.value);
     let iv = this.infantryArray.includes(e.target.value);
     let cv = this.cavalryArray.includes(e.target.value);
     let sv = this.shipsArray.includes(e.target.value);
     let stv = this.structs.includes(e.target.value);

     //make first character lowercase
     let nameString = e.target.value.charAt(0).toLowerCase() + e.target.value.substring(1);

     //if unit type is changed
     if(stv){
       console.log("UNIT TYPE CHANGE");

       this.setState({
         selectedOption: nameString + "Array",
         selectedUnit: this.state[nameString + "Array"][0]
       }, () => {//return total cost bact to parent component

         let costArray = Object.values(this.state.selectedUnit.cost);

         this.props.recieveData(this.state.selectedUnit.name, costArray.reduce((a, b) => a + b), this.props.cardNo);
       });


     }else if(av || iv || cv || sv){//if individual unit is changed
       console.log("UNIT CHANGE");

       let index = this.state[this.state.selectedOption].findIndex((ele) => ele.name === e.target.value);

       this.setState({
         selectedUnit: this.state[this.state.selectedOption][index]
       }, () => {//return total cost bact to parent component

         let costArray = Object.values(this.state.selectedUnit.cost);

         this.props.recieveData(this.state.selectedUnit.name, costArray.reduce((a, b) => a + b), this.props.cardNo);
       });

     }

   }


   render(){
     return(
       <>

        <select className="form-control mb-3" onChange={(e) => this.changeOptions(e)}>
        {this.structs.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>

        <select className="form-control mb-3" onChange={(e) => this.changeOptions(e)} id="unitSelect">
        {this.state[this.state.selectedOption].map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
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
