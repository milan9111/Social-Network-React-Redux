import { Redirect } from "react-router";
import React from "react";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => {   //получаем данные из стейта
    return {
      isAuth: state.auth.isAuth
    } 
  }

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
              return <Redirect to='/login' />
            } else {
              return <Component {...this.props}/>
            }
            
        }
    }
  
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); // создаем КП (№1) для передачи стейта дальше 
      

    return ConnectedAuthRedirectComponent;

}

