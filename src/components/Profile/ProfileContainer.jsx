import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserProfile, getStatus, updateStatus } from "./../../redux/profileReducer";
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from "redux";
 

class ProfileContainer extends React.Component {
  
  componentDidMount() {
      let userId = this.props.match.params.userId;
      if(!userId) {
        userId = 20224;
      }
      
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
      
  }

  render() {
     
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} 
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  } 
}

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)


