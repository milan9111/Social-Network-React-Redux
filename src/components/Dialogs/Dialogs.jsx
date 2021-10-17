import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = (state.dialogs).map((item, index) => <DialogItem key={index} name={item.name} id={item.id} />);
    let messagesElements = (state.messages).map((item, index) => <Message key={index} message={item.messages} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    }


    if(!props.isAuth) return <Redirect to={"/login"} />

    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
                {dialogsElements}
           </div>
           <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
           </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(10);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   validate={[required, maxLength10]} 
                   name={'newMessageText'}
                   placeholder={'Enter your message'} />
        </div>
        <div>
            <button>Send messages</button>
        </div>
    </form>
    );
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;
