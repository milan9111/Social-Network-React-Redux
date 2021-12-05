import { messagesType, dialogType } from "../types/types";

const ADD_MESSAGE = 'ADD-MESSAGE';



let initialState = {
    messages:   [
    {id: 1, messages: 'Hi'}, 
    {id: 2, messages: 'How is your IT-kamasutra'}, 
    {id: 3, messages: 'Yo'},
    {id: 4, messages: 'Yo'},
    {id: 5, messages: 'Yo'}
] as Array<messagesType>,  
    
    dialogs:    [
    {id: 1, name: 'Dimych'}, 
    {id: 2, name: 'Andrey'}, 
    {id: 3, name: 'Sveta'}, 
    {id: 4, name: 'Sasha'}, 
    {id: 5, name: 'Victor'}, 
    {id: 6, name: 'Valera'}
] as Array<dialogType>,
   
};


export type initialStateType = typeof initialState; 


export const dialogsReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 5, 
                messages: action.newMessageText,
            }   
                let stateCopy = {...state};
                stateCopy.messages = [...state.messages, newMessage];
                stateCopy.dialogs = [...state.dialogs];
            return stateCopy;            
        default:
           return state;
    } 
}


type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}

export let addMessageActionCreator = (newMessageText:string):addMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageText});
 