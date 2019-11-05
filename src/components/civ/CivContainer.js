/**
 * @Date:   2019-11-05T15:55:11+00:00
 * @Last modified time: 2019-11-05T16:45:08+00:00
 */


 import React, {Component} from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import CivComponent from './CivComponent';


 class CivContainer extends Component{

// container to hold two instances of the CivComponent to compare civs
   render(){
     return(
       <>

       <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          <CivComponent />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          <CivComponent />
        </div>

       </div>
       </>
     );
   }
 }

 export default CivContainer;
