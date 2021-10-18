import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, logout } from './../../redux/authReducer';
import { compose } from "redux";

class HeaderContainer extends React.Component {
componentDidMount() {
  this.props.getAuthUserData();
}

render() {
    return (
      <Header {...this.props}/>
    );
  }
};

const mapStateToprops = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default compose(
connect(mapStateToprops, {getAuthUserData, logout})
)(HeaderContainer)
 
