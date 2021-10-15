import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router";


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = (state.dialogs).map((item, index) => <DialogItem key={index} name={item.name} id={item.id} />);
    let messagesElements = (state.messages).map((item, index) => <Message key={index} message={item.messages} />);

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    }

    if(!props.isAuth) return <Redirect to={"/login"} />

    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
                {dialogsElements}
           </div>
           <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea onChange={onNewMessageChange} value={state.newMessageText}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send messages</button>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Dialogs;