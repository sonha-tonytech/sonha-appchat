import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthLayout from "../../layouts/auth-layout";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      msg_login:""
    }
    this.userNameInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const username = this.userNameInput.current.value;
    const password = this.passwordInput.current.value;

    if (username && password){
      const userLogin = this.props.users.find(
        (user) => user.userName === username && user.passWord === password
      );
      if (userLogin !== undefined) {
        this.props.handleSetUserLogin(userLogin);
        this.props.history.push("/");
      } else this.setState({msg_login: "Login Error"});
    }
    else this.setState({msg_login: "Login requires full username and password!"});
  };

  render() {
    return (
      <AuthLayout>
        <div className="login-section">
          <div className="login-section-title">
            <h1>Login</h1>
          </div>
          <div className="login-section-content">
            <form className="form-login" id="form_login">
              <div>
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  id="ip_user_name"
                  className="col-des-12"
                  name="userName"
                  placeholder="Type your username"
                  ref={this.userNameInput}
                />
              </div>
              <div>
                <label htmlFor="passWord">Password</label>
                <input
                  type="password"
                  id="ip_password"
                  className="col-des-12"
                  name="passWord"
                  placeholder="Type your password"
                  ref={this.passwordInput}
                />
              </div>
              <div className="msg-login">{this.state.msg_login}</div>
              <div>
                <button
                  type="submit"
                  className="col-des-12 btn btn-green btn-login"
                  id="btn_login"
                  onClick={this.onSubmit}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="register-account">
              <h4>Or Sign Up Using</h4>
              <Link to={"/register"}>
                <button className="btn btn-green btn-register" id="btn_register">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

export default withRouter(Login);
