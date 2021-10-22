import { addPostActionCreator, profileReducer, deletePost } from "./profileReducer";


let state = {
    posts :     [
    {id: 1, messages: 'How are you?', likesCount: 12}, 
    {id: 2, messages: 'It\'s my first post', likesCount: 11},
    {id: 3, messages: 'Hello', likesCount: 13},
    {id: 4, messages: 'Buy Buy!', likesCount: 14}
    ]
};

it('length of posts should be incremented', () => {
    //1. start data
    let action = addPostActionCreator('it-kamasutra.com');
    //2. create action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(5);  
});

it('message of new post should be correct', () => {
    //1. start data
    let action = addPostActionCreator('it-kamasutra.com');
    //2. create action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts[4].messages).toBe('it-kamasutra.com'); 
});

it('after deleting of messages should be dectement', () => {
    //1. start data
    let action = deletePost(1);
    //2. create action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(3); 
});

it('after deleting length shouldnt be dectement if id incorrect', () => {
    //1. start data
    let action = deletePost(1000);
    //2. create action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(4); 
});





