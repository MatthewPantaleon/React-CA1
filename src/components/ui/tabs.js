/**
 * @Date:   2019-10-22T15:30:46+01:00
 * @Last modified time: 2019-11-04T19:22:29+00:00
 */

 import React, {Component} from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
 import $ from 'jquery';

//objects used to style t he tab buttons
 const tabStyle = {
  bootClasses:{
    tabClassReady: "col-lg-2 col-md-4 col=sm-12 btn btn-primary mr-1 mb-1",
    tabClassSelected: "col-lg-2 col-md-4 col=sm-12 btn btn-secondary mr-1 mb-1"
  }
 };




 class Tab extends Component{

   constructor(props){
     super(props);
   }

   changeClass(e){
     //re assign btn-primary to all tabs
     for(let i = 0; i < $("#tabRow").children.length; i++){
       $("#tabRow").children()[i].className = tabStyle.bootClasses.tabClassReady;
     }

     //get selected tab and change to secondary button
     e.target.className = tabStyle.bootClasses.tabClassSelected;

   }

   componentDidMount(){
     //make sure the first tab is selected
     $("#tabRow").children()[0].className = tabStyle.bootClasses.tabClassSelected;
   }

   render(){
     return(

         <div className="row">

           <BrowserRouter>
           <Redirect exact from="/" to={this.props.list[0].path} component={this.props.list[0].comp} /> {/* Force the home page to be the first element int he array */}

           <div className="col-12">

            <div className="card-header">
              <div className="row" id="tabRow">
                {/* Loops through the props array and creates a new button for each route */}
                {this.props.list.map((e, i) => <Link onClick={(w) => this.changeClass(w)} id={"_"+e.name} className={tabStyle.bootClasses.tabClassReady} key={e.name} to={e.path}>{e.name}</Link>)}
              </div>
            </div>

            {/* Where each component routed to will render */}
            <div className="card-body">
              {/* Loops through the props array and create a new route for each element */}
              {this.props.list.map((e, i) => <Route key={i} exact path={e.path} component={e.comp}/>)}
            </div>

           </div>

           </BrowserRouter>

         </div>
     );
   }
 }

export default Tab;
