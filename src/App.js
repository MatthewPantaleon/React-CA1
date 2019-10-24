/**
 * @Date:   2019-10-15T15:11:22+01:00
 * @Last modified time: 2019-10-24T16:01:35+01:00
 */



import React, {Component} from 'react';
import * as ReactCSS from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CivComponent from './components/civ/CivComponent';
import CompareContainer from './components/compare/CompareContainer';
import Tab from './components/ui/tabs';

//Main Top level component
class App extends Component{
  render(){

    let tabs = [
        {comp: CivComponent, path: "/civilizations", name:"Civilizations"},
        {comp: CompareContainer, path: "/compare", name: "Compare"},
    ]

    return (
      <div className="container mt-4">
        <div className="card">
          <Tab list={tabs} />
        </div>
      </div>
    )
  }
}

//test component size Component

export default App;
