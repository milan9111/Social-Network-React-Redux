import React from 'react';
import './App.css';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginForm from './components/Login/Login';


const App = () => {
   
    return (
      <>
      <BrowserRouter>
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
      </BrowserRouter>
      </>
    );
}

export default App;
