/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Preloader } from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import usersIcon from './../../../assect/images/usersIcon.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

  if(!props.profile) {
     return <Preloader />
  }
   
  return (
    <div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/> 
        <div className={style.discrptionBlock}>
            {props.profile.photos.large ? <img src={props.profile.photos.large} alt="photo" /> : <img src={usersIcon} alt="photo"/>}
            <div>{props.profile.fullName}</div>
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.contacts.instagram}</div>
            <div>{props.profile.contacts.facebook}</div>
            <div>{props.profile.contacts.twitter}</div>
            <div>{props.profile.contacts.vk}</div>
        </div>
    </div>
  );
};

export default ProfileInfo;
