/**
 * @Date:   2019-10-22T18:41:31+01:00
 * @Last modified time: 2019-10-23T17:05:25+01:00
 */

import React, {Component} from 'react';
import * as ReactCSS from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiLoader from '../../ApiLoader';

 class CivComponent extends Component{

   constructor(props){
     super(props);

     this.state = {
       data: null,
       selectedCiv: {civilization_bonus: []},
       unique_unit: [],
       unique_tech: [],
       team_bonus: ""
     };


   }

   componentDidMount(){

     if(!localStorage.getItem("d")){
       this.setState({data: ApiLoader("civ")}, () =>
        this.setState({selectedCiv: this.state.data.civilizations[0]}, () => {
          // console.log(this.state);
          this.setState({
            unique_tech: ApiLoader(this.state.selectedCiv.unique_tech),
            unique_unit: ApiLoader(this.state.selectedCiv.unique_unit),
            team_bonus: this.state.selectedCiv.team_bonus
          }, function(){localStorage.setItem("d", JSON.stringify(this.state))});
        }
      ));
    }else{
      this.setState(JSON.parse(localStorage.getItem("d")));
    }

   }

   changeValue(e){
     this.setState({selectedCiv: this.state.data.civilizations[parseInt(e.target.value)]}, () =>{
       this.setState({
         unique_tech: ApiLoader(this.state.selectedCiv.unique_tech),
         unique_unit: ApiLoader(this.state.selectedCiv.unique_unit),
         team_bonus: this.state.selectedCiv.team_bonus
       });
     });
   }

   render(){
     if(!this.state.data){
       return <p>No Civs</p>
     }

     return(
       <>
       <select className="form-control" onChange={(e) => this.changeValue(e)}>
       {this.state.data.civilizations.map((e, i) => <option value={i} key={e.id}>{e.name}</option>)}
       </select>

       <hr />

<      h6>Civilization Bonuses:</h6>
       <ul>
       {this.state.selectedCiv.civilization_bonus.map((e, i) => <li key={i}>{e}</li>)}
       </ul>

       <hr />

       <h6>Unique Tech:</h6>
       <ul>
       {this.state.unique_tech.map((e, i) => <li key={i}>{e.name}: {e.description}</li>)}
       </ul>

       <h6>Unique Unit:</h6>
       <ul>
       {this.state.unique_unit.map((e, i) => <li key={i}>{e.name}</li>)}
       </ul>

       <hr />
       <h6>Team Bonus:</h6>
       <ul>
          <li>{this.state.team_bonus}</li>
       </ul>

       </>
     );
   }
 }

 export default CivComponent;
