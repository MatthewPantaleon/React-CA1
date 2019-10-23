/**
 * @Date:   2019-10-22T15:30:46+01:00
 * @Last modified time: 2019-10-23T18:02:49+01:00
 */

 import React, {Component} from 'react';
 import * as ReactCSS from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
 import $ from 'jquery';

 
 const tabStyle = {
  bootClasses:{
    tabClassReady: "col-3 btn btn-primary",
    tabClassSelected: "col-3 btn btn-secondary"
  }
 };




 class Tab extends Component{

   constructor(props){
     super(props);
     console.log(this.props);
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
           <Redirect exact from="/" to={this.props.list[0].path} component={this.props.list[0].comp} />

           <div className="col-12">

            <div className="card-header">
              <div className="row" id="tabRow">
                {this.props.list.map((e, i) => <Link onClick={(w) => this.changeClass(w)} id={"_"+e.name} className={tabStyle.bootClasses.tabClassReady} key={e.name} to={e.path}>{e.name}</Link>)}
              </div>
            </div>

            {/* Where each component routed to will render */}
            <div className="card-body">
              {this.props.list.map((e, i) => <Route key={e.name} exact path={e.path} component={e.comp}/>)}
            </div>

           </div>

           </BrowserRouter>

         </div>
     );
   }
 }

export default Tab;
