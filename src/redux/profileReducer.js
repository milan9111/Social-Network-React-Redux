const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts :     [
    {id: 1, messages: 'How are you?', likesCount: 12}, 
    {id: 2, messages: 'It\'s my first post', likesCount: 11},
    {id: 3, messages: 'Hello', likesCount: 13},
    {id: 4, messages: 'Buy Buy!', likesCount: 14}
], 
    newPostText: 'it-kamasutra.com'
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
        default:
           return state;
    } 
}
    
    
export let addPostActionCreator = () => ({ type: ADD_POST});
export let updateNewPostTextActionCreator = (text) =>  ({type: UPDATE_NEW_POST_TEXT, newText: text});
 