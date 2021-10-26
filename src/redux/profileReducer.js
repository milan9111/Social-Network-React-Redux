import { profileAPI, usersAPI } from './../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO = 'SAVE-PHOTO';

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
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(item => item.id !== action.postId)}
        }
        case SAVE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}};
        }
        default:
           return state;
    } 
}
    
    
export let addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText});
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export let setStatus = (status) => ({type: SET_STATUS, status});
export let deletePost = (postId) => ({type: DELETE_POST, postId});
export let savePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos});
 

export let getUserProfile = (userId) => async(dispatch) => {
    let data = await usersAPI.getProfile(userId); 
        dispatch(setUserProfile(data));
}

export let getStatus = (userId)  => async(dispatch) => {
    let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
}

export let updateStatus = (status)  => async(dispatch) => {
    let response = await profileAPI.updateStatus(status);
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        } 
}

export let savePhoto = (file) => async(dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    } 

}

