import React, {Component} from 'react';
import Bus from '../../images/bus.png';


class Buses extends Component {
    render() {
      return (
        <div className="card py-3">
          <img src={Bus} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center py-2">Find Your Buses Routes Experiences</h5>
            <p className="card-text text-justify">You can find here all the buses expericens all over the time, published by other members.</p>
          </div>
        </div>
      );
    }
  }

  export default Buses;