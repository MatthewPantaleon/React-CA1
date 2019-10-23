/**
 * @Date:   2019-10-22T18:41:31+01:00
 * @Last modified time: 2019-10-23T16:02:38+01:00
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
       unique_tech: []
     };


   }

   componentDidMount(){
     this.setState({data: ApiLoader("civ")}, () =>
      this.setState({selectedCiv: this.state.data.civilizations[0]}, () => {
        console.log(this.state);
        this.setState({unique_tech: ApiLoader(this.state.selectedCiv.unique_tech)}, ()=> console.log(this.state));
      }
    ));

   }

   changeValue(e){
     this.setState({selectedCiv: this.state.data.civilizations[parseInt(e.target.value)]});
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

       <ul>
       {this.state.selectedCiv.civilization_bonus.map((e, i) => <li key={i}>{e}</li>)}
       </ul>

       <hr />

       <ul>
       {this.state.unique_tech.map((e, i) => <li key={i}>{e.name}</li>)}
       </ul>

       </>
     );
   }
 }

 export default CivComponent;
