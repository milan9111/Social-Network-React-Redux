import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Nav from "./Nav";

 
const mapStateToProps = (state) => {
  return {
    siteBar: state.siteBar 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Nav)