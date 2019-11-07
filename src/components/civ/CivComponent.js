/**
 * @Date:   2019-10-22T18:41:31+01:00
 * @Last modified time: 2019-11-07T15:16:20+00:00
 */

import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiLoader from '../../ApiLoader';

ApiLoader("tech");

 class CivComponent extends Component{

   constructor(props){
     super(props);

     this.state = {
       data: null,
       selectedCiv: {civilization_bonus: [], name: "Aztecs"},
       unique_unit: [],
       unique_tech: [],
       team_bonus: ""
     };
   }

   //function expression for more control when and how to call the API
   A = (v) => {
     return ApiLoader(v);
   };

   componentDidMount(){
     if(!localStorage.getItem("c")){
       this.setState({data: this.A("civ")}, () =>
        this.setState({selectedCiv: this.state.data.civilizations[0]}, () => {
          // console.log(this.state);
          this.setState({
            unique_tech: this.A(this.state.selectedCiv.unique_tech),
            unique_unit: this.A(this.state.selectedCiv.unique_unit),
            team_bonus: this.state.selectedCiv.team_bonus
          }, () => {
            localStorage.setItem("c", JSON.stringify(this.state))
          });
        }
      ));
    }else{
      this.setState(JSON.parse(localStorage.getItem("c")));
    }

   }

   changeValue(e){
       this.setState({selectedCiv: this.state.data.civilizations[parseInt(e.target.value)]}, () =>{
         this.setState({
           //the api has to be called every time a new civ is loaded even from localStorage as the API returns endpoints that must be called again
           unique_tech: this.A(this.state.selectedCiv.unique_tech),
           unique_unit: this.A(this.state.selectedCiv.unique_unit),
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
      <div className="card">
      <div className="card-body">

      <div className="row">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <select className="form-control" onChange={(e) => this.changeValue(e)}>
          {this.state.data.civilizations.map((e, i) => <option value={i} key={e.id}>{e.name}</option>)}
          </select>
          </div>
      </div>

      <hr />
      <h4 className="mb-2">{this.state.selectedCiv.name}</h4>
      <h5 className="mb-4">{this.state.selectedCiv.army_type} Civilization</h5>

      <div className="mb-4">
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-6">
              <figure className="figure">
              <img src={require(`../../images/civ/${this.state.selectedCiv.name}.png`)} className="img-fluid" alt={`${this.state.selectedCiv.name} Wonder`}/>
              <figcaption><small>{`${this.state.selectedCiv.name} Wonder`}</small></figcaption>
              </figure>
          </div>
        </div>
      </div>

      {/* Civ information */}
      <h5>Civilization Bonuses:</h5>

      <ul>
      {this.state.selectedCiv.civilization_bonus.map((e, i) => <li key={i}>{e}</li>)}
      </ul>

      <hr />

      <h5>Unique Tech:</h5>
      <ul>
      {this.state.unique_tech.map((e, i) => <li className="mb-2" key={i}><img  className="mr-2" src={require(`../../images/civ/Unique-tech.jpg`)} alt={e.name}/><b>{e.name}:</b> {e.description}</li>)}
      </ul>

      <h5>Unique Unit:</h5>
      <ul>
      {this.state.unique_unit.map((e, i) => <li className="mb-2" key={i}><img className="mr-2" src={require(`./../../images/civ/unique_units/${e.name}.jpg`)} alt={e.name}/><b>{e.name}:</b> {e.description}</li>)}
      </ul>

      <hr />
      <h5>Team Bonus:</h5>
      <ul>
      <li>{this.state.team_bonus}</li>
      </ul>

      </div>
      </div>

      </>
     );
   }
 }

 export default CivComponent;
