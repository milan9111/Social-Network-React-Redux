import React from "react";
import styles from "./Users.module.css";
import usersIcon from './../../assect/images/usersIcon.png';
import { NavLink } from "react-router-dom";
import * as axios from 'axios';
 


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
                        <NavLink to={'/profile/' + item.id}>
                            <img src={ item.photos.small !== null ? item.photos.small : usersIcon} className={styles.userPhoto} alt="avatar" />
                        </NavLink>
                    </div>
                    <div>
                        {item.followed 
                        ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {
                                withCredentials: true,
                                headers: {
                                    'api-key': '945e8644-a2a6-4b4d-afe2-219467eefbea'
                                    }
                                })
                            .then(response => {
                                if(response.data.resultCode === 0) {
                                    props.unFollow(item.id)
                                }
                            }); 

                           }}>Unfollow</button>

                        : <button onClick={() => {
                          axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {}, {
                              withCredentials: true,
                              headers: {
                                    'api-key': '945e8644-a2a6-4b4d-afe2-219467eefbea'
                                }
                              })
                            .then(response => {
                                if(response.data.resultCode === 0) {
                                    props.follow(item.id)
                                }
                            });  
                            

                          }}>Follow</button>
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