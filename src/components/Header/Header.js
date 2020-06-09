import React, {Component} from 'react';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            
        }
        this.showFilteredExperiences = this.showFilteredExperiences.bind(this);
    }

    componentDidMount(){
        fetch("https://transportexperiences.firebaseio.com/.json")
        .then(response => response.json())
        .then(data => this.setState({data: data}));
    }
    componentDidUpdate(){
    }

    // Login Function
    loginFunction = (e) =>{
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        
        this.props.login(username, password);
    }

    loginActivity = e =>{
        e.preventDefault();
        let username = document.getElementById("usernameNotLoggedIn").value;
        let password = document.getElementById("passwordNotLoggedIn").value;
        
        this.props.login(username, password);
        document.getElementById("rowUnloggedArea").classList.add("hide");
    }

    // Reset Password
    resetPassword(e){
        e.preventDefault();
        let rowSignup                       = document.getElementById("rowSignup");
        let rowLogin                        = document.getElementById("rowLogin");
        let rowReset                        = document.getElementById("rowReset");

        let users = [];

        rowSignup.classList.add("hide");
        rowLogin.classList.add("hide");
        rowReset.classList.remove("hide");
    }

    // Show Experiences
    showRoutes(e){
        e.preventDefault();
        let loggedIn = sessionStorage.getItem("User");
        if(loggedIn === null){
            document.getElementById("rowUnloggedArea").classList.remove("hide");
            document.getElementById("rowSignup").classList.add("hide");
        }else{
            document.getElementById("show-experiences-list").classList.remove("hide");
            // Search Bar
            const searchbar = document.getElementById("show-searchbar");
            if(searchbar !== null){
                searchbar.classList.add("hide");
            }
    
            // Middle Content
            const transport = document.getElementById("show-busses");
            transport.classList.add("hide");
    
            // User Pannel
            const userpannel = document.getElementById("showPannel");
            userpannel.classList.add("hide");
    
            // Add Experience
            const addExperiences = document.getElementById("show-experiences");
            addExperiences.classList.add("hide");
        }
        
    }

    showFilteredExperiences(e){
        e.preventDefault();
        let lineSearch = document.getElementById("busSearch");
        let lineSearchValue = lineSearch.options[lineSearch.selectedIndex].value;
        let exp = document.getElementById("show-experiences-list");
        let expLines = document.getElementById("info-experiences");
        expLines.innerHTML = "";

        exp.classList.remove("hide");
        let experiences = this.state.data.experiences;

        let filteredExperiences = experiences.filter(exp => exp.lineNumber == lineSearchValue);
        if(filteredExperiences.length === 0){
            expLines.innerHTML += `<td class="bg-danger text-white" colspan="11">There was not any experience about that line</td>`;

        }else{
            filteredExperiences.forEach(filteredExperienceSingle => {
                expLines.innerHTML += 
                `
                <tr>
                    <th scope="row">#</th>
                    <td>${filteredExperienceSingle.startLine}</td>
                    <td>${filteredExperienceSingle.endLine}</td>
                    <td>${filteredExperienceSingle.lineNumber}</td>
                    <td>${filteredExperienceSingle.hour}</td>
                    <td>${filteredExperienceSingle.timeSpent}</td>
                    <td>${filteredExperienceSingle.crowdedLevel}</td>
                    <td>${filteredExperienceSingle.expText}</td>
                    <td>${filteredExperienceSingle.vote}</td>
                    <td>${filteredExperienceSingle.addedBy}</td>
                    <td>${filteredExperienceSingle.lineType}</td>
                </tr>
                `;
            });
        }
        
        // Show Experiences
        console.log(filteredExperiences);
              
    }
    render() {
        
        let isLoggedIn;
        
        if(this.props.isLoggedIn === false){
            isLoggedIn = (
                <form className="form-inline my-2 my-lg-0 ml-auto">
                    <input id="username" className="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username"/>
                    <input id="password" className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password"/>
                    <button onClick={this.loginFunction} className="btn btn-outline-info my-2 my-sm-0" type="submit">Login</button>
                </form>);
        }else{
            const user = sessionStorage.getItem("User");
            isLoggedIn = (
                <div className="form-inline my-2 my-lg-0 ml-auto">
                    <button onClick={this.props.addExperiences} className="btn btn-outline-info ml-1">Add Experience</button>
                    <button onClick={this.props.pannel} className="btn btn-outline-success ml-1"> {user}</button>
                    <a onClick={this.props.logout} href="/" className="btn btn-outline-danger ml-1">Logout</a>
                </div>);
        }
        

      return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
                    <a className="navbar-brand" href="/">Transport Experiences</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a onClick={this.showRoutes} className="nav-link" href="/">Experiences</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={this.props.filter} className="nav-link" href="/">Search Experiences</a>
                        </li>
                        </ul>
                        {isLoggedIn}
                    </div>
            </nav>
            <div className="row hide" id="show-searchbar">
                <div className="container" >
                <div className="row my-3">
                    <div className="col-3"></div>
                    <div className="col-6 text-dark p-3">
                    <form>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputState">Choose your line</label>
                            <select id="busSearch" className="form-control">
                                <option value="0">No option selected</option>
                                <option value="1">1 - Bus Line</option>
                                <option value="2">2 - Bus Line</option>
                                <option value="3">3 - Bus Line</option>
                                <option value="4">4 - Bus Line</option>
                                <option value="5">5 - Bus Line</option>
                                <option value="6">6 - Tram Line</option>
                                <option value="7">7 - Tram Line</option>
                                <option value="8">8 - Tram Line</option>
                                <option value="9">9 - Tram Line</option>
                                <option value="10">10 - Tram Line</option>
                                <option value="11">11 - Subway 1</option>
                                <option value="12">12 - Subway 2</option>
                                <option value="13">13 - Subway 3</option>
                            </select>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <button onClick={this.showFilteredExperiences} type="submit" className="btn btn-outline-info btn-block" id="searchButton">Search</button>
                    </form>
                    </div>
                    <div className="col-3"></div>
                </div>
                </div>
            </div>
            <div className="row" id="show-experiences-list">
            <div className="container mt-4" >
                <div className="row">
                    <table className="table" id="b">
                        <thead>
                            <tr className="bg-info text-white">
                                <th scope="col">#</th>
                                <th scope="col">Start Line</th>
                                <th scope="col">Endline</th>
                                <th scope="col">Line</th>
                                <th scope="col">Hour</th>
                                <th scope="col">Time Spent</th>
                                <th scope="col">Crowd Level</th>
                                <th scope="col">Experience Text</th>
                                <th scope="col">Vote</th>
                                <th scope="col">Added by</th>
                                <th scope="col">Line Type</th>
                            </tr>
                        </thead>
                        <tbody id="info-experiences">

                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <div className="container hide" id="rowUnloggedArea">
                <div className="row" >
                    <div className="col-12 bg-danger my-3 py-2 text-center text-white">You are not logged in to see @Experiences</div>
                    <div className="col-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter your @username</label>
                                <input type="text" className="form-control" id="usernameNotLoggedIn"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordFirst">Enter your @password</label>
                                <input type="password" className="form-control" id="passwordNotLoggedIn"/>
                            </div>
                            <button onClick={this.loginActivity} type="submit" className="btn btn-outline-info ml-2">Login @transportexperiences</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
      );
    }

  }   

  export default Header;