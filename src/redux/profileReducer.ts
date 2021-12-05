import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';
import { postsType, photosType, profileType} from '../types/types';

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
] as Array<postsType>, 
    profile: null as profileType | null,
    status: '',
    newPostText: ''
};

export type initialStateType = typeof initialState; 


export const profileReducer = (state = initialState, action:any):initialStateType => {

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
            return {...state, profile: {...state.profile, photos: action.photos} as profileType};
        }
        default:
           return state;
    } 
}
    

type addPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
} 
export let addPostActionCreator = (newPostText:string):addPostActionCreatorType => ({ type: ADD_POST, newPostText});

type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
} 
export let setUserProfile = (profile: profileType):setUserProfileType => ({type: SET_USER_PROFILE, profile});

type setStatusType = {
    type: typeof SET_STATUS,
    status: string
} 
export let setStatus = (status:string):setStatusType => ({type: SET_STATUS, status});

type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
} 
export let deletePost = (postId:number):deletePostType => ({type: DELETE_POST, postId});

type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO,
    photos: photosType
} 
export let savePhotoSuccess = (photos:photosType):savePhotoSuccessType => ({type: SAVE_PHOTO, photos});
 
 
export let getUserProfile = (userId:number) => async(dispatch:any) => {
    let data = await usersAPI.getProfile(userId); 
        dispatch(setUserProfile(data));
}

export let getStatus = (userId:number) => async(dispatch:any) => {
    try{
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    } catch(error) {
        console.log(error);
    }
}

export let updateStatus = (status:string)  => async(dispatch:any) => {
    try{
        let response = await profileAPI.updateStatus(status);
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        } 
    } catch (error) {
        console.log(error);
    }
}

export let savePhoto = (file:any) => async(dispatch:any) => {
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    } 
}

export let saveProfile = (newDataProfile:profileType) => async(dispatch:any, getState:any) => {
    let userId = getState().auth.id;
    let response = await profileAPI.saveProfile(newDataProfile);
    if(response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}
