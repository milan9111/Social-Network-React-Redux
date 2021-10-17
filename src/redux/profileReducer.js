import { profileAPI, usersAPI } from './../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS'; 

let initialState = {
    posts :     [
    {id: 1, messages: 'How are you?', likesCount: 12}, 
    {id: 2, messages: 'It\'s my first post', likesCount: 11},
    {id: 3, messages: 'Hello', likesCount: 13},
    {id: 4, messages: 'Buy Buy!', likesCount: 14}
], 
    profile: null,
    status: '',
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                messages: action.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts, newPost];
            stateCopy.newPostText = '';
            return stateCopy;
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {...state, status: action.status};
        }
        default:
           return state;
    } 
}
    
    
export let addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText});
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export let setStatus = (status) => ({type: SET_STATUS, status})
 

export let getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
  });
}

export let getStatus = (userId)  => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
}

export let updateStatus = (status)  => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        } 
    });
}


