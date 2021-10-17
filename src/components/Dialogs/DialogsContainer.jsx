import { connect } from "react-redux";
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from "./Dialogs";
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from "redux";

 

let mapStateToProps = (state) => {

    return{
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
     return{
        sendMessage: (newMessageText) => {dispatch(addMessageActionCreator(newMessageText))}
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);