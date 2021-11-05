import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Redirect, Route } from 'react-router';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Preloader } from './components/common/preloader/Preloader';
import store from './redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const LoginForm = React.lazy(() => import('./components/Login/Login'));

 
class App extends React.Component {
  
  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    console.error(promiseRejectionEvent);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeAddEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  render() {
    //  return !this.props.initialized  -- закомментиовано, так как не проплачена подписка на API сервера 
    //     ? <Preloader /> 
    //     :  <>
    return(
      <div className="app-wrapper">
        <HeaderContainer />
        <NavContainer />
        <div className="app-wrapper-content">
            <Suspense fallback={<Preloader />}>
                <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
                <Route path ="/login" render={() => <LoginForm />} /> 
                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                <Route path="/dialogs" render={() => <DialogsContainer />} />
            </Suspense>      
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/news" render={() => <News />}/>
                <Route path="/music" render={() => <Music />}/>
                <Route path="/settings" render={() => <Settings />}/>
        </div>
        
      </div>
    );
  }  
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App)
   

let SamuraiJSApp = (props) => {
  return <BrowserRouter>
        <Provider store={store}>
              <AppContainer /> 
        </Provider>
    </BrowserRouter>  
}

export default SamuraiJSApp;