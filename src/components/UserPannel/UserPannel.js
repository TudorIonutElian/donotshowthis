import React, {Component} from 'react';

class UserPannel extends Component{

    render(){
        const user  = sessionStorage.getItem("User");
        const email = sessionStorage.getItem("Email");
        return(
            <div className="row my-5 hide" id="showPannel">
                <div className="col-12 py-2">Manage Your Account Settings</div>
                <div className="col-12 py-2">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @username</label>
                            <input type="text" className="form-control" id="pannelUser" value={user} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @email</label>
                            <input type="text" className="form-control" id="pannelEmail" aria-describedby="userHelp" value={email} readOnly/>
                            <small id="userHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordFirst">Enter your @password</label>
                            <input type="password" className="form-control" id="pannelPassword"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Enter your @password again</label>
                            <input type="password" className="form-control" id="pannelCheck"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Enter your @security check</label>
                            <input type="text" className="form-control" id="securityCheck" aria-describedby="userHelp"/>
                            <small id="securityCheckInfo" className="form-text text-muted">Please note, this will be used to reset password.</small>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Settings</button>
                        <button type="submit" className="btn btn-danger ml-2">Delete my account</button>

                    </form>
                </div>
            </div> 
        );
    }
}

export default UserPannel;