import { connect } from "react-redux";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from '../../redux/dialogsReducer';
import Dialogs from "./Dialogs";
import { withAuthRedirect } from './../../hoc/withAuthRedirect';

 

let mapStateToProps = (state) => {

    return{
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
     return{
        sendMessage: () => {dispatch(addMessageActionCreator())},
        updateNewMessageText: (text) => {dispatch(updateNewMessageTextActionCreator(text))}
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;