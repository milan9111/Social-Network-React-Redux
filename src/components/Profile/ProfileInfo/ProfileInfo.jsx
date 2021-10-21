/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Preloader } from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import usersIcon from './../../../assect/images/usersIcon.png';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

  if(!props.profile) {
     return <Preloader />
  }
   
  return (
    <div>
      <div>
        {/* <img className={style.img}
          src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
          alt="photo"
        /> */}
      </div>
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
