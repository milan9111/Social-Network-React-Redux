import { usersAPI } from './../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE'; 

let initialState = {
    posts :     [
    {id: 1, messages: 'How are you?', likesCount: 12}, 
    {id: 2, messages: 'It\'s my first post', likesCount: 11},
    {id: 3, messages: 'Hello', likesCount: 13},
    {id: 4, messages: 'Buy Buy!', likesCount: 14}
], 
    newPostText: 'it-kamasutra.com',
    profile: null
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                messages: state.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts, newPost];
            stateCopy.newPostText = '';
            return stateCopy;
        case UPDATE_NEW_POST_TEXT:
            {
                let stateCopy = {...state};
                stateCopy.newPostText = action.newText;
                return stateCopy;
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        default:
           return state;
    } 
}
    
    
export let addPostActionCreator = () => ({ type: ADD_POST});
export let updateNewPostTextActionCreator = (text) =>  ({type: UPDATE_NEW_POST_TEXT, newText: text});
export let setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
 

export let getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
  });
}

