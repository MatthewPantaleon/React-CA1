/**
 * @Date:   2019-10-15T15:11:22+01:00
 * @Last modified time: 2019-10-22T18:51:21+01:00
 */



import React, {Component} from 'react';
import * as ReactCSS from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CivComponent from './components/civ/CivComponent';
import Tab from './components/ui/tabs';





//Main Top level component
class App extends Component{
  render(){

    let tabs = [
        {comp: CivComponent, path: "/civilizations", name:"Civilizations"},
        {comp: CompareComponent, path: "/compare", name: "Compare"},
    ]

    return (
      <div className="container">
        <div className="card">

                          <Tab list={tabs} />
        </div>
      </div>
    )
  }
}

//test component size Component

class location extends Component{

  render(){
    return(
      <div className="location">
      </div>
    );
  }


}



class CompareComponent extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="row">
      <p>Testing</p>
      </div>
    );
  }

}



export default App;
