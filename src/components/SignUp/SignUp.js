import React, {Component} from 'react';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    signUp(e){
        e.preventDefault();
        let newUser;
        let username             = document.getElementById("usernameSignUp").value;
        let email                = document.getElementById("email").value;
        let passwordFirst        = document.getElementById("passwordFirst").value;
        let passwordCheck        = document.getElementById("passwordCheck").value;
        let securityCheck        = document.getElementById("securityCheck").value;

        if(passwordCheck === passwordFirst){
            newUser = {
                username: username,
                email: email,
                password: passwordFirst,
                checkRule: securityCheck,
                notes: {
                    number: 0,
                    data:["You don't have any notes"]
                },
                status: 1
            }
        }

        let xhr, newID;
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://transportexperiences.firebaseio.com/users/.json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                newID = data.length;
                console.log(data);
                let xhrRegister = new XMLHttpRequest();
                    xhrRegister.open('PUT', `https://transportexperiences.firebaseio.com/users/${newID}/.json`);
                    xhrRegister.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhrRegister.onload = function() {
                        if (xhr.status === 200) {
                            console.log("merge");
                        }
                        else if (xhr.status !== 200) {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };
                    xhrRegister.send(JSON.stringify(newUser));
            }
            else if (xhr.status !== 200) {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();  
        
    }

    // Reset account password 
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
    login(e){
        e.preventDefault();
        console.log("Login");
        let rowSignUp = document.getElementById("rowSignup");
        let rowLogin  = document.getElementById("rowLogin");

        rowSignUp.classList.add("hide");
        rowLogin.classList.remove("hide");

    }

    resetPasswordAction(e){
        e.preventDefault();
        let resetArea       = document.getElementById("rowReset");
        let rowResetSucces  = document.getElementById("rowResetSucces");
        let usernameReset   = document.getElementById("usernameReset");
        let answerReset     = document.getElementById("answerReset");
        let passwordReset   = document.getElementById("passwordReset");

        let users;
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://transportexperiences.firebaseio.com/users/.json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                users = data;

                let userFound = users.filter(user => {
                    return user.username === usernameReset.value;
                  });
                if(userFound.length === 0){
                    alert("Username does not EXIST!");
                }else{
                    if(userFound[0].checkRule === answerReset.value){

                        // Get the user index from array
                        let userIndex = users.findIndex(user => user.username === usernameReset.value);

                        let xhrUpdatePassword = new XMLHttpRequest();
                        xhrUpdatePassword.open('PUT', `https://transportexperiences.firebaseio.com/users/${userIndex}/password/.json`);
                        xhrUpdatePassword.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhrUpdatePassword.onload = function() {
                            if (xhr.status === 200) {
                                resetArea.classList.add("hide");
                                rowResetSucces.classList.remove("hide");
                                setTimeout(() => {  window.location.reload(); }, 2000);
                            }
                            else if (xhr.status !== 200) {
                                alert('Request failed.  Returned status of ' + xhr.status);
                            }
                        };
                        xhrUpdatePassword.send(passwordReset.value);
                    
                    }else{
                        alert("Eror: Security Check is not valid");
                    }
                }
            }
            else if (xhr.status !== 200) {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }
    render() {
       

      return (
          <div className="container mt-4" >
              <div className="row "id="rowSignup">
                  <div className="col-12">
                  <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter your @username</label>
                        <input type="text" className="form-control" id="usernameSignUp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter your @email</label>
                        <input type="text" className="form-control" id="email" aria-describedby="userHelp"/>
                        <small id="userHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordFirst">Enter your @password</label>
                        <input type="password" className="form-control" id="passwordFirst"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Enter your @password again</label>
                        <input type="password" className="form-control" id="passwordCheck"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter your @security check</label>
                        <input type="text" className="form-control" id="securityCheck" aria-describedby="userHelp"/>
                        <small id="securityCheckInfo" className="form-text text-muted">Please note, this will be used to reset password.</small>
                    </div>
                    <button onClick={this.signUp} type="submit" className="btn btn-primary">Create TranspExp Account</button>
                    <button onClick={this.login} type="submit" className="btn btn-info ml-2">I already have an account</button>
                    </form>
                  </div>
              </div>
              <div className="row hide" id="rowLogin">
                <div className="col-12 bg-info my-3 py-2 text-center text-white">Login @transportexperiences</div>
                <div className="col-12">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @username</label>
                            <input type="text" className="form-control" id="usernameSignIn"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordFirst">Enter your @password</label>
                            <input type="password" className="form-control" id="passwordCheckt"/>
                        </div>
                        <button onClick={this.resetPassword} type="submit" className="btn btn-outline-warning">Reset Password @transportexperiences</button>
                        <button onClick={this.loginActivity} type="submit" className="btn btn-outline-info ml-2">Login @transportexperiences</button>
                        </form>
                    </div>
                </div>
            <div className="row hide " id="rowReset">
                <div className="col-12 bg-warning my-3 py-2 text-center">Reset Password @transportexperiences</div>
                <div className="col-12">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @username</label>
                            <input type="text" className="form-control" id="usernameReset"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @reset answer</label>
                            <input type="text" className="form-control" id="answerReset"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordFirst">Enter your @new password</label>
                            <input type="text" className="form-control" id="passwordReset"/>
                        </div>
                        <button onClick={this.resetPasswordAction} type="submit" className="btn btn-warning">Reset Password @transportexperiences</button>
                        </form>
                    </div>
            </div>
            <div className="row hide" id="rowResetSucces">
                <div className="col-12 bg-success my-3 py-2 text-white">Reset Password @transportexperiences</div>
                <div className="col-12 pl-5">
                    Your Password has been succesfulyy updated! You can nou login with your @new password.
                </div>
            </div>
          </div>
      );
    }

  }   

  export default SignUp;