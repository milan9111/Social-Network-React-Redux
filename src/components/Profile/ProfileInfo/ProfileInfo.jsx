/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState} from "react";
import { Preloader } from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import usersIcon from './../../../assect/images/usersIcon.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  
  const [editMode, setEditMode] = useState(false);

  if(!props.profile) {
     return <Preloader />
  }
   
const onMainPhotoSelected = (e) => {
  if(e.target.files.length) {
    props.savePhoto(e.target.files[0]);
  }
}

const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      () => {
      setEditMode(false);
    });
}

  return (
    <div className={style.discrptionBlock}>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
      {props.profile.photos.large ? <img src={props.profile.photos.large} alt="photo" /> : <img src={usersIcon} alt="photo"/>}
      <div>{props.isOwner ? <input type={'file'} onChange={props.onMainPhotoSelected}/> : null}</div>
      {editMode 
      ? 
      <ProfileDataForm profile={props.profile} 
                       isOwner={props.isOwner} 
                       onSubmit={onSubmit}
                       initialValues={props.profile}  
                       /> 
      : 
      <ProfileData profile={props.profile} 
                   onMainPhotoSelected={onMainPhotoSelected} 
                   isOwner={props.isOwner}
                   goToEditMode={() => {setEditMode(true)}}
                   />
      }
    </div>
  );
};


const ProfileData = (props) => {
  return(
    <div>
      {props.isOwner ? <div><button onClick={props.goToEditMode}>Edit</button></div> : null}
      <div className={style.discrptionBlock}>
          <div><b>My name is</b>: {props.profile.fullName}</div>
          <div>About me: {props.profile.aboutMe}</div>
          <Contacts contacts={props.profile.contacts}/> 
          <div><b>Loking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
          <div>{props.profile.lookingForAJob ? `Your skills: ${props.profile.lookingForAJobDescription}` : null}</div>
      </div>
    </div>
  );
}

  
export const Contacts = (props) => {
  return(
          <div className={style.contact}>
              {props.contacts.instagram || props.contacts.facebook || props.contacts.twitter || props.contacts.vk 
              ? 
              <div>
                <div><b>My social networks:</b></div>
                <div>{props.contacts.github ? `GitHub: ${props.contacts.github}` : null}</div>
                <div>{props.contacts.instagram ? `Instagram: ${props.contacts.instagram}` : null}</div>
                <div>{props.contacts.facebook ? `Facebook: ${props.contacts.facebook}` : null}</div>
                <div>{props.contacts.twitter ? `Twitter: ${props.contacts.twitter}` : null}</div>
                <div>{props.contacts.vk ? `VK: ${props.contacts.vk}` : null}</div>
                <div>{props.contacts.youtube ? `YouTube: ${props.contacts.youtube}` : null}</div>
              </div>
              : 
              null
              }  
          </div>          
  );
}

export default ProfileInfo;
