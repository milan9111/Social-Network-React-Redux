import { stopSubmit } from "redux-form";
import { authAPI, securityApi } from "../api/api";
 

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}

export type initialStateType = typeof initialState;

export const authReducer = (state = initialState, action:any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: 
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

type setAuthUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null, 
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):setAuthUserDataActionType => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});


type getCaptchaUrlSuccessPayloadType = {
    captchaUrl: string
}

type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: getCaptchaUrlSuccessPayloadType
}

export const getCaptchaUrlSuccess = (captchaUrl:string): getCaptchaUrlSuccessType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});


export const getAuthUserData = () => async (dispatch:any) => {
    let data = await authAPI.me();
        if(data.resultCode === 0) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
}


export const login = (email:string, password:string, rememberMe:boolean, captcha: any) => async (dispatch:any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
        if(data.resultCode === 0) {
           dispatch(getAuthUserData());
        } else {
            if(data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let messages = data.messages.length > 0 ? data.messages[0] : 'Some ERROR';
            dispatch(stopSubmit('login', {_error: messages}));
        }
}


export const getCaptchaUrl = () => async(dispatch:any) => {
    const response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));    
}


export const logout = () => async (dispatch:any) => {
    let data = await authAPI.logout();
        if(data.resultCode === 0) {
           dispatch(setAuthUserData(null, null, null, false)); 
        }
}


 
