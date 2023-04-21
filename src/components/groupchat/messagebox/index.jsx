import React from "react";
import "./messagebox.css";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessage: null,
      isAddUserInGroupOpen: false,
      isRippleOpen: false,
      isMessageSelect: false,
      msg: "",
    };
    this.addUserInGroupInput = React.createRef();
    this.messageInput = React.createRef();
  }

  showFormAddUser = () => {
    this.setState({ isAddUserInGroupOpen: true });
  };

  closeFormAddUser = () => {
    this.setState({ isRippleOpen: false });
    this.setState({ isAddUserInGroupOpen: false });
    this.setState({ msg: "" });
    this.addUserInGroupInput.current.value = "";
  };

  getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.getHours() + ":" + currentTime.getMinutes();
  };

  handleAddUserInGroup = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const addedUserName = this.addUserInGroupInput.current.value;
      if (addedUserName) {
        const addedUser = this.props.data.users.find(
          (user) => user.userName === addedUserName
        );
        if (addedUser === undefined)
          this.setState({ msg: "Username doesn't exist" });
        else {
          if (
            this.props.selectedGroup.members.some(
              (user) => user.user_id === addedUser.id
            )
          )
            this.setState({ msg: "User already in the group" });
          else {
            const newInGroupUsers = this.props.selectedGroup.members.concat({
              user_id: addedUser.id,
            });
            const newChat = {
              id: this.props.selectedGroup.id,
              name: this.props.selectedGroup.name,
              type: this.props.selectedGroup.type,
              owner: this.props.selectedGroup.owner,
              members: newInGroupUsers,
            };
            const groupIndex = this.props.data.groups.findIndex(
              (group) => group.id === this.props.selectedGroup.id
            );
            this.props.data.groups.splice(groupIndex, 1, newChat);
            this.props.handleSetGroups(this.props.data.groups);
            this.props.handleSelectedGroup(newChat);
            this.closeFormAddUser();
          }
        }
      }
    }
  };

  handleDeleteUserInGroup = () => {
    const userInGroupIndex = this.props.selectedGroup.members.findIndex(
      (member) => member.user_id === this.props.data.userLogin.id
    );
    this.props.selectedGroup.members.splice(userInGroupIndex, 1);
    const groupIndex = this.props.data.groups.findIndex(
      (group) => group.id === this.props.selectedGroup.id
    );
    this.props.data.groups.splice(groupIndex, 1, this.props.selectedGroup);
    this.props.handleSetGroups(this.props.data.groups);
    this.props.handleSelectedGroup(null);
    this.setState({ isRippleOpen: false });
  };

  handleDeleteGroup = () => {
    this.props.selectedGroup.members = [];
    const groupIndex = this.props.data.groups.findIndex(
      (group) => group.id === this.props.selectedGroup.id
    );
    this.props.data.groups.splice(groupIndex, 1, this.props.selectedGroup);
    this.props.handleSetGroups(this.props.data.groups);
    this.props.handleSelectedGroup(null);
    this.setState({ isRippleOpen: false });
  }

  handleAddMessage = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const message = this.messageInput.current.value;
      if (message) {
        const newMessage = {
          id: this.props.data.messages.length,
          chat_id: this.props.selectedGroup.id,
          user_id: this.props.data.userLogin.id,
          user_name: this.props.data.userLogin.name,
          messages: message,
          time_create: this.getCurrentTime(),
        };
        this.props.data.messages.push(newMessage);
        this.props.handleSetMessages(this.props.data.messages);
        this.messageInput.current.value = "";
      }
    }
  };

  handleDeleteMessage = () => {
    if (
      this.props.data.userLogin.id === this.props.selectedGroup.owner ||
      this.props.data.userLogin.id === this.state.selectedMessage.user_id
    ) {
      const messageIndex = this.props.data.messages.findIndex(
        (message) => message.id === this.state.selectedMessage.id
      );
      this.props.data.messages.splice(messageIndex, 1);
      this.props.handleSetMessages(this.props.data.messages);
      this.setState({ selectedMessage: null });
      this.setState({ isMessageSelect: false });
    }
  };

  render() {
    if (!this.props.selectedGroup) return;
    return (
      <div className="message-box-section">
        <div className="col-des-12 message-box-header-section">
          <h2 className="col-des-6">{this.props.selectedGroup.name}</h2>
          <div className="col-des-4 user-group-section">
            <div className="col-des-6 group-users">
              {this.props.selectedGroup.members.length} members
            </div>
            <div
              className="col-des-1 ripple"
              onClick={() =>
                this.state.isRippleOpen
                  ? this.setState({ isRippleOpen: false })
                  : this.setState({ isRippleOpen: true })
              }
            >
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            {this.state.isRippleOpen && (
              <div className="ripple-dropdown">
                <div className="btn-add-user" onClick={this.showFormAddUser}>
                  Add User
                </div>
                {this.props.data.userLogin.id !==
                  this.props.selectedGroup.owner && (
                  <div
                    className="btn-leave-group"
                    onClick={this.handleDeleteUserInGroup}
                  >
                    Leave Group
                  </div>
                )}
                {this.props.data.userLogin.id ===
                  this.props.selectedGroup.owner && (
                  <div
                    className="btn-delete-group"
                    onClick={this.handleDeleteGroup}
                  >
                    Delete Group
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-des-12 message-selection">
          {this.props.data.messages
            .filter(
              (message) => message.chat_id === this.props.selectedGroup.id
            )
            .map((message) => (
              <div
                key={message.id}
                className={`col-des-6 message-section-container ${
                  message.user_id === this.props.data.userLogin.id
                    ? "message-align-right"
                    : "message-align-left"
                }`}
              >
                <div className="message-section-name">{message.user_name}</div>
                <div className="message-section-content">
                  {message.messages}
                </div>
                <span
                  className="message-time"
                  onClick={() => {
                    this.setState({ selectedMessage: message });
                    this.setState({ isMessageSelect: true });
                  }}
                >
                  {message.time_create}
                </span>
              </div>
            ))}
        </div>
        {!this.state.isMessageSelect && (
          <div className="col-des-12 send-message-section">
            <input
              className="col-des-8"
              type="text"
              id="ip_send_message"
              placeholder="Type your message here"
              ref={this.messageInput}
              onKeyDown={this.handleAddMessage}
            />
            <button
              className="btn btn-green btn-submit-message"
              onClick={this.handleAddMessage}
            >
              +
            </button>
          </div>
        )}
        {this.state.isMessageSelect && (
          <div className="col-des-12 selection-wrapper">
            <div className="col-des-6 selection-container">
              <div className="selection-container-left">
                <button
                  className="btn btn-selection btn-exit-selection"
                  onClick={() => {
                    this.setState({ selectedMessage: null });
                    this.setState({ isMessageSelect: false });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                    fill="gray"
                  >
                    <path d="M12 10.585L7.757 6.343a2 2 0 10-2.828 2.828L9.172 13l-4.243 4.243a2 2 0 102.828 2.828L12 15.172l4.243 4.243a2 2 0 102.828-2.828L14.828 13l4.243-4.243a2 2 0 10-2.828-2.828L12 10.585z" />
                  </svg>
                </button>
              </div>
              <div className="selection-container-right">
                <button
                  className={`btn btn-selection btn-delete-message ${
                    this.props.data.userLogin.id ===
                      this.props.selectedGroup.owner ||
                    this.props.data.userLogin.id ===
                      this.state.selectedMessage.user_id
                      ? ""
                      : "disabled"
                  }`}
                  onClick={this.handleDeleteMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                    fill="red"
                  >
                    <path d="M3 6h18v2H3zm1-4h16l-1.9 18H5.9L4 2zm7 15v-8h2v8h-2zm4 0v-8h2v8h-2z" />
                  </svg>
                  <span className="sp-delete-selection">Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.isAddUserInGroupOpen && (
          <div className="form-add-user-in-group">
            <div className="col-des-12 form-add-user-in-group-header">
              <h2 className="col-des-10 form-add-user-in-group-title">
                Add new user
              </h2>
              <button
                className="col-des-2 btn btn-red exit-form-add-user-in-group"
                onClick={this.closeFormAddUser}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M8.293 7.293a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="form-add-user-in-group-content">
              <input
                className="col-des-10"
                type="text"
                id="ip_add_user_in_group"
                placeholder="Add User"
                ref={this.addUserInGroupInput}
                onKeyDown={this.handleAddUserInGroup}
              />
              <button
                className="col-des-2 btn btn-green"
                onClick={this.handleAddUserInGroup}
              >
                Add
              </button>
            </div>
            <div id="msg">{this.state.msg}</div>
          </div>
        )}
      </div>
    );
  }
}

export default MessageBox;
