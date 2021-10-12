import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { siteBarReducer } from './siteBarReducer';



let store = {
    _state: {
        profilePage: {
            posts :     [
            {id: 1, messages: 'How are you?', likesCount: 12}, 
            {id: 2, messages: 'It\'s my first post', likesCount: 11},
            {id: 3, messages: 'Hello', likesCount: 13},
            {id: 4, messages: 'Buy Buy!', likesCount: 14}
        ], 
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
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
        },
        siteBar: [
            {id: 1, name: 'Dimych'}, 
            {id: 2, name: 'Andrey'}, 
            {id: 3, name: 'Sveta'}, 
            {id: 4, name: 'Sasha'}, 
            {id: 5, name: 'Victor'}, 
            {id: 6, name: 'Valera'}
        ]
    },
    _callSubscriber() {
        console.log('State was change');
    },
    getState(){
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; //pattern 'observer'
    },
    
    dispath(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.siteBar = siteBarReducer(this._state.siteBar, action);

        this._callSubscriber(this._state); 
    }   
};





export default store;