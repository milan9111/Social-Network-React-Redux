const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'; 


let initialState = {
    messages:   [
    {id: 1, messages: 'Hi'}, 
    {id: 2, messages: 'How is your IT-kamasutra'}, 
    {id: 3, messages: 'Yo'},
    {id: 4, messages: 'Yo'},
    {id: 5, messages: 'Yo'}
],  
    
    dialogs:    [
    {id: 1, name: 'Dimych'}, 
    {id: 2, name: 'Andrey'}, 
    {id: 3, name: 'Sveta'}, 
    {id: 4, name: 'Sasha'}, 
    {id: 5, name: 'Victor'}, 
    {id: 6, name: 'Valera'}
],
    newMessageText: 'Hello React'
};

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 5, 
                messages: state.newMessageText,
            }   
                let stateCopy = {...state};
                stateCopy.messages = [...state.messages, newMessage];
                stateCopy.dialogs = [...state.dialogs];
                stateCopy.newMessageText = '';
            return stateCopy;
        case UPDATE_NEW_MESSAGE_TEXT:
            {
                let stateCopy = {...state};
                stateCopy.newMessageText = action.newText;
                return stateCopy;
            } 
            
            
        default:
           return state;
    } 
}

export let addMessageActionCreator = () => ({type: ADD_MESSAGE});
export let updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});
 