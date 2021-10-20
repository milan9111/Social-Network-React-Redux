import React from 'react';
import './App.css';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginForm from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Preloader } from './components/common/preloader/Preloader';



class App extends React.Component {
  
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
     return !this.props.initialized 
        ? <Preloader /> 
        :  <>
        <div className="app-wrapper">
             <HeaderContainer />
             <NavContainer />
             <div className="app-wrapper-content">
                 <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                 <Route path="/dialogs" render={() => <DialogsContainer />} />
                 <Route path="/users" render={() => <UsersContainer />} />
                 <Route path="/news" render={() => <News />}/>
                 <Route path="/music" render={() => <Music />}/>
                 <Route path="/settings" render={() => <Settings />}/>
                 <Route path ="/login" render={() => <LoginForm />} />                 
             </div>
           </div>
       </>   
  }  
}


const mapStateToProps = (state) => ({
   initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App)
   
 