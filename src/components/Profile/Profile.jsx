/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} 
                   status={props.status} 
                   updateStatus={props.updateStatus} 
                   isOwner={props.isOwner}
                   savePhoto={props.savePhoto}
                   saveProfile={props.saveProfile}
                   />
      <MyPostsContainer  />
    </div>
  );
};

export default Profile;
