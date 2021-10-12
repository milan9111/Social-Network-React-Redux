import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";


const DialogItem = (props) => {
    return(

        <div className={s.dialog + ' ' + s.active}>
            <img src="https://png.pngtree.com/element_our/png_detail/20181022/man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png_206531.jpg" alt="avatar" />
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink> 
        </div> 
    );
}


export default DialogItem;