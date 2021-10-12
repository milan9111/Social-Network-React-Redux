import React from "react";
import styles from "./Users.module.css";
import usersIcon from './../../assect/images/usersIcon.png'
 


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

        let pages = [];
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

    return(
        <div>
            <div>
               {pages.map((item, index) => 
                    <span onClick={(e) => {props.onPageChanged(item)}} className={props.currentPage === item  ? styles.selectedPage : ''} key={index}>
                        {item}
                    </span>)}
            </div>
           {
               props.users.map((item) => <div key={item.id}>
                <span>
                    <div>
                        <img src={ item.photos.small !== null ? item.photos.small : usersIcon} className={styles.userPhoto} alt="avatar" />
                    </div>
                    <div>
                        {item.followed 
                        ? <button onClick={() => (props.unfollow(item.id))}>Unfollow</button>  
                        : <button onClick={() => (props.follow(item.id))}>Follow</button>
                        } 
                    </div>
                </span>
                <span>
                    <span>
                        <div>{item.name}</div>
                        <div>{item.status}</div>
                    </span>
                    <span>
                        <div>{'item.location.country'}</div>
                        <div>{'item.location.city'}</div>
                    </span>
                </span>
                </div>)   
            }
        </div>
    )
}

export default Users;