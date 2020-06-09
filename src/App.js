import React from 'react';

//Import Components
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import SignUp from './components/SignUp/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class  App extends React.Component {
  constructor(props){
    super(props);

    let userLoggedOrNot;
    let userLogged = sessionStorage.getItem("User");
    if(userLogged){
      userLoggedOrNot = true;
    }else{
      userLoggedOrNot = false;
    }

    this.state = {
      loggedIn: userLoggedOrNot,
      username: userLogged, 
      password: "",
      data: {
        busses: [],
        trams: [],
        metros: [],
        users: []
      },
      userLogged: ""
    };

    this.logout         = this.logout.bind(this);
    this.loginFunction  = this.login.bind(this);
    this.pannel         = this.pannel.bind(this);
  };

  // ComponentDidMount
  componentDidMount(){
    fetch("https://transportexperiences.firebaseio.com/.json")
    .then(response => response.json())
    .then(data => this.setState({data: data}));

    document.getElementById("show-experiences-list").classList.add("hide");
  }
  componentDidUpdate(){
    this.users = this.state.data.users;
  }

  addExperiences(e){
    e.preventDefault();
    // Search Bar
      const searchbar = document.getElementById("show-searchbar");
      searchbar.classList.add("hide");

    // Middle Content
      const transport = document.getElementById("show-busses");
      transport.classList.add("hide");

    // User Pannel
    const userpannel = document.getElementById("showPannel");
    userpannel.classList.add("hide");

    // Add Experience
    const addExperiences = document.getElementById("show-experiences");
    addExperiences.classList.remove("hide");
  }


  // Show / Hide user control pannel function
  pannel(e){
    e.preventDefault();
    // Search Bar
      const searchbar = document.getElementById("show-searchbar");
      searchbar.classList.add("hide");

    // Middle Content
      const transport = document.getElementById("show-busses");
      transport.classList.add("hide");

    // User Pannel
    const userpannel = document.getElementById("showPannel");
    userpannel.classList.remove("hide");

    // Add Experience
    const addExperiences = document.getElementById("show-experiences");
    addExperiences.classList.add("hide");

    // Experiences List
    const allExperiences  = document.getElementById("show-experiences-list");
    allExperiences.classList.add("hide");

  }

  // Login user function
  login = (username, password) =>{
    // Identificare useri in baza firebase
    let usernameFound = this.users.filter(user => {
      return user.username === username && user.password == password;
    });

    let userData = this.users.filter(user => {
      return user.username === username;
    });

    // Find user index on state users retrieved
    let userIndex = this.users.findIndex(user => user.username === username);

    if(usernameFound.length > 0){
      this.setState({
        loggedIn: true,
        userLogged: username
      });

      // Set user data in session storage
      sessionStorage.setItem("User", userData[0].username);
      sessionStorage.setItem("Email", userData[0].email);
      sessionStorage.setItem("index", userIndex);
    }else{
      alert("User was not found");
      this.setState({
        loggedIn: false
      });
    }
    // Setare state logat
  };

  // Filter Experiences
  filterExperiences(e){
    e.preventDefault();
    let loggedIn = sessionStorage.getItem("User");
    if(loggedIn === null){
      document.getElementById("rowUnloggedArea").classList.remove("hide");
      document.getElementById("rowSignup").classList.add("hide");
    }else{
      document.getElementById("show-experiences-list").classList.remove("hide");
      let showMiddle = document.getElementById("show-middle");
      showMiddle.classList.add("hide");

      let searchBar = document.getElementById("show-searchbar");
      searchBar.classList.remove("hide");
      searchBar.classList.add("show");

    }
      
  }

  // Logout user function
  logout(e){
    e.preventDefault();
    this.setState({
      loggedIn: false
    });
    sessionStorage.clear();
  };


  render(){
    let showLayout;
    if(this.state.loggedIn){
        showLayout = <Layout isLoggedIn={this.state.loggedIn} info={this.state} />;
    }else{
        showLayout =  <SignUp />
    }
    return (
        <div className="App">
          <Header 
            data={this.state} 
            isLoggedIn={this.state.loggedIn} 
            logout={this.logout} login={this.login} 
            show={this.state.show} 
            pannel={this.pannel} 
            addExperiences={this.addExperiences} filter={this.filterExperiences}/>
          {showLayout}
        </div>
      );
    }
  };

export default App;
