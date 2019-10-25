/**
 * @Date:   2019-10-24T16:34:54+01:00
 * @Last modified time: 2019-10-25T18:34:19+01:00
 */

 import React, {Component} from 'react';
 import * as ReactCSS from 'react-bootstrap';
 import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import $ from 'jquery';

 import ApiLoader from '../../ApiLoader';

/*
  Barracks: Champion, Halberdier, Elite eagle Warrior
  Archery Range:  Arbalest, Hand Cannnoneer, Heavy Cav Archer, Elite skirmisher
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
       selectedOption: "Archers",
       selectedUnit: {name: "Arbalest", cost: {}, attack_bonus: []},
       totalCost: 0
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

     //get all imperial archery range units *Elite Skirmisher is Castle Age but Imperial Skirmisher does not exist in Age of Conquerors
     this.setState({Archers: getUnits(archerArray)}, () => {
       this.setState({selectedUnit: this.state.Archers[0]});
     });

     //get all Imperial Cavalry units
     this.setState({Cavalry: getUnits(cavalryArray)});

     //get all imperial ships
     this.setState({Ships: getUnits(shipArray)});
   }

   //when type of units changes get the first unit from the list
   changeOptions(e){
     // console.log(e.target.value);
     let s = this.state; // substitution doesn't work?

     let unitType = "";
     let unitIndex = 0;

     // console.log(this.structs);

     if(this.structs.includes(String(e.target.value))){//if the unit type select is chosen
       unitType = e.target.value;
       $('#unitSelect').prop('selectedIndex',0);//reset select of units dropdown
     }else{//if unit selection is chosen
       unitType = this.state.selectedOption;
       unitIndex = this.state[this.state.selectedOption].findIndex((ele) => ele.name === e.target.value);
     }

     this.setState({selectedOption: unitType}, () => {//change unit type
       this.setState({selectedUnit: this.state[this.state.selectedOption][unitIndex]}, () => {//change selected unit to reflect type and sub index
         // console.log(this.state.selectedUnit);
         this.setState({totalCost: Object.values(this.state.selectedUnit.cost).reduce((a, b) => a + b)});//add up total cost of a unit per change of unit
       });
     });
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
