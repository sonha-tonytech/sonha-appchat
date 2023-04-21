import React from "react";
import "./chatbox.css"

class ChatBox extends React.Component {
  render() {
    return <div className="col-des-12 chatbox-section" onClick={()=> {this.props.handleSelectedGroup(this.props.group)}}>
            <h4 className="title">{this.props.group.name}</h4>
    </div>;
  }
}

export default ChatBox;