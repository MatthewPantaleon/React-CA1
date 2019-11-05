/**
 * @Date:   2019-10-23T19:30:59+01:00
 * @Last modified time: 2019-11-05T10:07:22+00:00
 */

import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiLoader from '../../ApiLoader';

import UnitComponent from './UnitComponent';



 class CompareContainer extends Component{
   constructor(props){
     super(props);

     this.state = {
       message: "",
       style: {color: "red"},
       unit1: {},
       unit2: {},
       totalResources: 0,
       units: [],
     };
   }

   //fucntion expression for more control when and how to call the API
   A = (v) => {
     return ApiLoader(v);
   };

   calculate = function(unit, total, identity){//callback function from child cards to calculate total cost

     // console.log(arguments);
     this.setState({["unit" + identity]: {name: unit, total: total}});

   }.bind(this);//bind function to the CompareContainer Context

   //check input value and display messages accordingly
   parseinput(e){
     // console.log(e.target.value);

    if(e.target.value === "" || e.target.value === undefined){
      this.setState({message: ""});
      return;
    }

     let parsed = parseInt(e.target.value);
     if(!isNaN(parsed)){
       this.setState({message: `${parsed} Total Resources will give you:`, style:{color: "black"}}, () => this.setState({totalResources: parsed}));
     }else{
       this.setState({message: "Input Must be a Number", style: {color: "red"}});
     }
   }

   componentDidMount(){
      console.log("MAIN");
      if(!localStorage.getItem("u")){
        this.setState({units: this.A("unit")}, () => localStorage.setItem("u", JSON.stringify(this.state.units)));
      }else{
        this.setState({units: JSON.parse(localStorage.getItem("u"))});
      }
   }

   render(){
     return(
       <div className="row">
        <div className="col-lg-6 col-sm-12">
          <div className="card mb-4">
            <div className="card-body">
              <UnitComponent recieveData={this.calculate} resend={this.A} cardNo={1}/>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-12 mb-4">
          <div className="card">
            <div className="card-body">
              <UnitComponent recieveData={this.calculate} resend={this.A} cardNo={2}/>
            </div>
          </div>
        </div>

          <div className="col-12">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <div className="card">
                <div className="card-body">
                  <h5 className="text-center">Unit Calculator</h5>
                  <label>Total Resources</label>
                  <input type="text" name="resources" className="form-control" autoComplete="off" formNoValidate onChange={(e) => this.parseinput(e)}/>
                  <small style={this.state.style}>{this.state.message}</small>
                  <hr />
                  {/*Display total units that resources can buy*/}
                  <p><b>({this.state.unit1.total} Cost) {this.state.unit1.name}s:</b> {Math.floor(this.state.totalResources/this.state.unit1.total)}.</p>
                  <p><b>({this.state.unit2.total} Cost) {this.state.unit2.name}s: </b> {Math.floor(this.state.totalResources/this.state.unit2.total)}.</p>
                </div>
                </div>
              </div>
            </div>
          </div>


       </div>
     );
   }

 }

 export default CompareContainer;
