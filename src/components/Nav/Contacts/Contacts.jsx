import React from "react";
import s from "./Contacts.module.css";
import { NavLink } from "react-router-dom";

const Contacts = (props) => {
   
  return (
      <div>
        <nav className={s.contactsNav}>
          <div className={s.ContactsBox}>
                <div><img src="https://png.pngtree.com/element_our/png_detail/20181022/man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png_206531.jpg" alt="avatar" /></div>
                <div><NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink></div>
          </div>
        </nav>
      </div>
  );
};

export default Contacts;
