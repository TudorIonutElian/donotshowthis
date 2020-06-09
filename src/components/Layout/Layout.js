import React, {Component} from 'react';

import Buses from '../Buses/Buses';
import Trams from '../Trams/Trams';
import Metros from '../Metros/Metros';
import UserPannel from '../UserPannel/UserPannel';
import AddExperiences from '../AddExperiences/AddExpericens';


class Layout extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: this.props.show
        };
        this.experiences = {};
        this.searchButton = null;
        
    }

    componentDidMount(){
        this.updateExperiences();
    }

    updateExperiences(){
        fetch("https://transportexperiences.firebaseio.com/.json")
        .then(response => response.json())
        .then(data => this.setState({data: data}));  
    }

    componentDidUpdate(){
        this.experiences = this.state.data.experiences;  
    }

    showExperiences(){
        let experiences = this.experiences;
        if(this.experiences){
            if(this.experiences.length > 0){
                let placeForExperiences = document.getElementById("info-experiences");
    
                this.experiences.shift();
            
            for(let i=0; i<this.experiences.length; i++){
                let lineType;
                if(this.experiences[i].lineType === "Bus"){
                    lineType = `<td className="bg-success p-2">${this.experiences[i].lineType}</td>`;
                }else if(this.experiences[i].lineType === "Tram"){
                    lineType = `<td className="bg-warning p-2">${this.experiences[i].lineType}</td>`;
                }
                else if(this.experiences[i].lineType === "Metro"){
                    lineType = `<td className="progress-bar progress-bar-striped progress-bar-animated p-2">${this.experiences[i].lineType}</td>`;
                }
                placeForExperiences.innerHTML += `
                <tr>
                    <th scope="row">#</th>
                    <td>${this.experiences[i].startLine}</td>
                    <td>${this.experiences[i].endLine}</td>
                    <td>${this.experiences[i].lineNumber}</td>
                    <td>${this.experiences[i].hour}</td>
                    <td>${this.experiences[i].timeSpent}</td>
                    <td>${this.experiences[i].crowdedLevel}</td>
                    <td>${this.experiences[i].expText}</td>
                    <td>${this.experiences[i].vote}</td>
                    <td>${this.experiences[i].addedBy}</td>
                    ${lineType}
                </tr>
    
                `;
            }
                }
        }  
    }

  render(){ 
    this.showExperiences();

    return(
       <div className="container mt-4" id="show-middle">
            <div className="row" id="show-busses">
                <div className="col-4 py-3">
                    <Buses />
                </div>
                <div className="col-4 py-3">
                    <Trams />
                </div>
                <div className="col-4 py-3">
                    <Metros />
                </div>
            </div>
            <UserPannel />
            <AddExperiences />
        </div>
    );
}
  }

  export default Layout;