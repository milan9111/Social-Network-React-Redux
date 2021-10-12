import React from "react";
import { connect } from "react-redux";
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


const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default NavContainer;