/**
 * @Date:   2019-10-24T16:34:54+01:00
 * @Last modified time: 2019-10-24T19:45:58+01:00
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



 class UnitComponent extends Component{

   constructor(props){
     super(props);

     this.state = {
       techs: {},
       units: {},
       strcutures: {},
       age: "Imperial",
       archers: [],
       infantry: [],
       cavalry: [],
       ships: []
     };
   }

   componentDidMount(){
     if(!localStorage.getItem("u") || !localStorage.getItem("s") || !localStorage.getItem("t")){
       this.setState({techs: ApiLoader("tech")}, () => localStorage.setItem("t", JSON.stringify(this.state.techs)));
       this.setState({structures: ApiLoader("struct")}, () => localStorage.setItem("s", JSON.stringify(this.state.strcutures)));
       this.setState({units: ApiLoader("unit")}, () => localStorage.setItem("u", JSON.stringify(this.state.units)));

     }else{
       this.setState({techs: JSON.parse(localStorage.getItem("t"))});
       this.setState({strcutures: JSON.parse(localStorage.getItem("s"))});
       this.setState({units: JSON.parse(localStorage.getItem("u"))});
     }
   }

   render(){
     return(
       <>
        <p>Unit Component</p>
       </>

     );
   }

 }


export default UnitComponent;
