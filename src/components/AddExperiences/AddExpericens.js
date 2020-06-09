import React, {Component} from 'react';

class AddExperiences extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: {
                buses: [],
                trams: [],
                metros: []
            }
        };

    }
    fetchDataFromFirebase = () =>{
        fetch("https://transportexperiences.firebaseio.com/.json")
        .then(response => response.json())
        .then(data => this.setState({data: data}));
    }
    
    componentDidMount(){
        this.fetchDataFromFirebase();
    }

    addNewExperience = (e) =>{
        e.preventDefault();
        // Get start line details
        let startLine                           = document.getElementById("startLine").value;

        // Get end line details
        let endLine                             = document.getElementById("endLine").value;

        // Get line number details
        let lineNumber                          = document.getElementById("lineNumber");
        let finalLine                           = lineNumber.options[lineNumber.selectedIndex].value;

        // Get hour details
        let hour                                = document.getElementById("hour");
        let finalHour                           = hour.options[hour.selectedIndex].value;

        // Get time spent details
        let timeSpent                           = document.getElementById("timeSpent");
        let finalTime                           = timeSpent.options[timeSpent.selectedIndex].value;


        // Get croded level details
        let crowdedLevel                        = document.getElementById("crowdedLevel");
        let finalCrowded                        = crowdedLevel.options[crowdedLevel.selectedIndex].value;

        // Get experience text details
        let expText                             = document.getElementById("expText").value;

        // Get veote details
        let vote                                = document.getElementById("votes");
        let finalVote                           = vote.options[vote.selectedIndex].value;

        // Line type
        let lineType;
        if(finalLine < 6){
            lineType = "Bus";
        }else if(finalLine > 6 && finalLine < 11){
            lineType = "Tram";
        }else{
            lineType = "Metro";
        }

        const newExperience = {
            startLine : startLine,
            endLine: endLine,
            lineNumber: parseInt(finalLine),
            hour: finalHour,
            timeSpent: parseInt(finalTime),
            crowdedLevel: parseInt(finalCrowded),
            expText: expText,
            vote: parseInt(finalVote),
            status: 1,
            addedBy: sessionStorage.getItem("User"),
            lineType: lineType
        }

        // Add new Experience to Firebase experiences object
        let xhr, newID;
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://transportexperiences.firebaseio.com/experiences/.json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
               newID = data.length;
                let xhrAddExperience = new XMLHttpRequest();
                    xhrAddExperience.open('PUT', `https://transportexperiences.firebaseio.com/experiences/${newID}/.json`);
                    xhrAddExperience.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhrAddExperience.onload = function() {
                        if (xhr.status === 200) {
                            window.location.reload();
                        }
                        else if (xhr.status !== 200) {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };
                    xhrAddExperience.send(JSON.stringify(newExperience));
            }
            else if (xhr.status !== 200) {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();

    }


    render(){
        return(
            <div className="row my-3 hide" id="show-experiences">
            <div className="col-12 p-3">
                <form>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="passwordFirst">Start Line (A)</label>
                                <input type="text" className="form-control" id="startLine"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordFirst">End Line (A)</label>
                                <input type="text" className="form-control" id="endLine"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">Choose Line</label>
                                <select id="lineNumber" className="form-control">
                                    <option value="1">1 - Bus</option>
                                    <option value="2">2 - Bus</option>
                                    <option value="3">3 - Bus</option>
                                    <option value="4">4 - Bus</option>
                                    <option value="5">5 - Bus</option>
                                    <option value="6">6 - Tram</option>
                                    <option value="7">7 - Tram</option>
                                    <option value="8">8 - Tram</option>
                                    <option value="8">9 - Tram</option>
                                    <option value="10">10 - Tram</option>
                                    <option value="11">11 - Subway 1</option>
                                    <option value="12">12 - Subway 2</option>
                                    <option value="13">13 - Subway 3</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">Choose Hour</label>
                                <select id="hour" className="form-control">
                                    <option value="05:00">05:00</option>
                                    <option value="07:00">07:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="21:00">21:00</option>
                                    <option value="23:00">23:00</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">Choose Time Spent</label>
                                <select id="timeSpent" className="form-control">
                                    <option value="10">10 minutes</option>
                                    <option value="20">20 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="40">40 minutes</option>
                                    <option value="50">50 minutes</option>
                                    <option value="60">60 minutes</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">Crowded? Tell us</label>
                                <select id="crowdedLevel" className="form-control">
                                    <option value="1">1 - Worst Crowded</option>
                                    <option value="2">2 - Badly Crowded</option>
                                    <option value="3">3 - Negative Crowded</option>
                                    <option value="4">4 - Not Crowded</option>
                                    <option value="5">5 - No People</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordFirst">Enter your @experience_text</label>
                                <input id="expText" type="text" className="form-control"/>
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="inputState">Please vote</label>
                                <select id="votes" className="form-control">
                                    <option value="1">1 - Worst Experience</option>
                                    <option value="2">2 - Badly Experience</option>
                                    <option value="3">3 - Negative Experience</option>
                                    <option value="4">4 - God Experience</option>
                                    <option value="5">5 - Best Experience</option>
                                </select>
                            </div>

                        </div>
                    </div>
                <button onClick={this.addNewExperience.bind(this)} type="submit" className="btn btn-outline-success btn-block">Save Experience</button>
                </form>
                </div>
            </div>
        );
    }
}

export default AddExperiences;