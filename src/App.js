/**
 * @Date:   2019-10-15T15:11:22+01:00
 * @Last modified time: 2019-11-06T12:29:39+00:00
 */



import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CivContainer from './components/civ/CivContainer';
import CompareContainer from './components/compare/CompareContainer';
import Tab from './components/ui/tabs';

//Main Top level component
class App extends Component{
  render(){

    //array of routes and paths
    let tabs = [
        {comp: CivContainer, path: "/civilizations", name:"Civilizations"},
        {comp: CompareContainer, path: "/compare", name: "Compare"},
    ]

    return (
      <div className="container mt-4 mb-5">
        <div className="card">
          <Tab list={tabs} />
        </div>
      </div>
    )
  }
}

//test component size Component

export default App;
