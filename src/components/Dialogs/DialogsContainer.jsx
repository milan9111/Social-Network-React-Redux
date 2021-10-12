import { connect } from "react-redux";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from '../../redux/dialogsReducer';
import Dialogs from "./Dialogs";

 

let mapStateToProps = (state) => {

    return{
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
     return{
        sendMessage: () => {dispatch(addMessageActionCreator())},
        updateNewMessageText: (text) => {dispatch(updateNewMessageTextActionCreator(text))}
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;