import React from "react";
import styles from "./Users.module.css";
import usersIcon from './../../assect/images/usersIcon.png';
import { NavLink } from "react-router-dom";
 
let User = (props) => {
    
    let itemUser = props.user;
    return(
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + itemUser.id}>
                            <img src={ itemUser.photos.small !== null ? itemUser.photos.small : usersIcon} className={styles.userPhoto} alt="avatar" />
                        </NavLink>
                    </div>
                    <div>
                        {itemUser.followed 
                        ? <button disabled={props.followingInProgress.some(id  => id === itemUser.id)} onClick={() => {props.unFollow(itemUser.id)}}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id  => id === itemUser.id)} onClick={() => {props.follow(itemUser.id)}}>Follow</button>
                        } 
                    </div>
                </span>
                <span>
                    <span>
                        <div>{itemUser.name}</div>
                        <div>{itemUser.status}</div>
                    </span>
                    <span>
                        <div>{'itemUser.location.country'}</div>
                        <div>{'itemUser.location.city'}</div>
                    </span>
                </span>
        </div>
    );  
}

export default User;