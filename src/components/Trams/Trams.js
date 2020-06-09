import React, {Component} from 'react';
import Tram from '../../images/tram.png';


class Trams extends Component {
    render() {
      return (
        <div className="card py-3">
            <img src={Tram} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title text-center py-2">Find Your Trams Routes Experiences</h5>
              <p className="card-text text-justify">You can find here all the trams expericens all over the time, published by other members.</p>
            </div>
          </div>
      );
    }
  }

  export default Trams;