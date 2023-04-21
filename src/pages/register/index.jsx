import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthLayout from "../../layouts/auth-layout";
import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg_register: "",
    };
    this.userNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.nameInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const userName = this.userNameInput.current.value;
    const passWord = this.passwordInput.current.value;
    if (userName && passWord) {
      const name = this.nameInput.current.value;
      if (this.props.users.some((user) => user.userName === userName)) {
        this.setState({ msg_register: "Username has already exist!" });
      } else {
        this.props.users.push({
          id: this.props.users.length,
          userName: userName,
          passWord: passWord,
          name: name,
        });
        this.props.handleSetUsers(this.props.users);
        this.props.history.push({
          pathname: "/login",
        });
      }
    } else
      this.setState({ msg_register: "Register requires full information!" });
  };

  render() {
    return (
      <AuthLayout>
        <div className="register-section">
          <div className="register-section-title">
            <h1>Register</h1>
          </div>
          <div className="register-section-content">
            <form className="form-register" id="form_register">
              <div>
                <label htmlFor="userName">Username</label>
                <input
                  required
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
              <div>
                <label htmlFor="Name">Your Name</label>
                <input
                  type="name"
                  id="ip_name"
                  className="col-des-12"
                  name="name"
                  placeholder="Type your name"
                  ref={this.nameInput}
                />
              </div>
              <div className="msg-register">{this.state.msg_register}</div>
              <div>
                <button
                  type="submit"
                  className="col-des-12 btn btn-green btn-login"
                  id="btn_register"
                  onClick={this.onSubmit}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="login-account">
              <h4>You have already account</h4>
              <Link to={"/login"}>
                <button className="btn btn-green btn-login" id="btn_login">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

export default withRouter(Register);
