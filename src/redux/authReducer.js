import { stopSubmit } from "redux-form";
import { authAPI } from "./../api/api";
 

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me().then(data => {
        if(data.resultCode === 0) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
    });  
}


export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
        if(data.resultCode === 0) {
           dispatch(getAuthUserData());
        } else {
            let messages = data.messages.length > 0 ? data.messages[0] : 'Some ERROR';
            dispatch(stopSubmit('login', {_error: messages}));
        }
    });
}


export const logout = () => (dispatch) => {
    authAPI.logout().then(data => {
        if(data.resultCode === 0) {
           dispatch(setAuthUserData(null, null, null, false)); 
        }
    });
}


 
