import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserProfile } from "./../../redux/profileReducer";
 

class ProfileContainer extends React.Component {
  
  componentDidMount() {
      let userId = this.props.match.params.userId;
      if(!userId) {
        userId = 2;
      }
      
      this.props.getUserProfile(userId);
  }

  render() {
     
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
    return {
      profile: state.profilePage.profile
    } 
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent); 
