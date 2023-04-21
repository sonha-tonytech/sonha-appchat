import React from "react";
import {Redirect} from "react-router-dom/cjs/react-router-dom";
import Group from "../../components/groupchat/group";
import MessageBox from "../../components/groupchat/messagebox";
import "./home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
    };
  }

  handleSelectedGroup = (selectedGroup) => {
    this.setState({ selectedGroup: selectedGroup });
  };

  render() {
    if (!this.props.data.userLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home-section">
        <div className="col-des-3">
          <Group
            userLogin={this.props.data.userLogin}
            groups={this.props.data.groups}
            handleSetGroups={this.props.handleSetGroups}
            handleSetUserLogin={this.props.handleSetUserLogin}
            handleSelectedGroup={this.handleSelectedGroup}
          />
        </div>
        <div className="col-des-9">
          <MessageBox
            data = {this.props.data}
            handleSetGroups={this.props.handleSetGroups}
            handleSetMessages={this.props.handleSetMessages}
            selectedGroup = {this.state.selectedGroup}
            handleSelectedGroup={this.handleSelectedGroup}
          />
        </div>
      </div>
    );
  }
}

export default Home;
