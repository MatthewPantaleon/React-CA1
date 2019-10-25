/**
 * @Date:   2019-10-23T19:30:59+01:00
 * @Last modified time: 2019-10-25T15:01:31+01:00
 */

 import React, {Component} from 'react';
 import * as ReactCSS from 'react-bootstrap';
 import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';

 import UnitComponent from './UnitComponent';


 class CompareContainer extends Component{
   constructor(props){
     super(props);
   }

   render(){
     return(
       <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <UnitComponent />
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <UnitComponent />
            </div>
          </div>
        </div>

       </div>
     );
   }

 }

 export default CompareContainer;
