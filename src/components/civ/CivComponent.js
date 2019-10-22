/**
 * @Date:   2019-10-22T18:41:31+01:00
 * @Last modified time: 2019-10-22T20:28:45+01:00
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
       selectedCiv: {civilization_bonus: []}
     };


   }

   componentDidMount(){
     ApiLoader("civ").then(response => this.setState({ data: response.data}));
   }

   render(){
     if(!this.state.data){
       return <p>No Civs</p>
     }

     return(
       <p>CIVS</p>
     );
   }
 }

 export default CivComponent;
