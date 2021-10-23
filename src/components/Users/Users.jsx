import React from "react";
import Paginator from "./Paginator";
import User from "./User";


let Users = (props) => {

    return(
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize} 
                       onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage} 
                       />

           {    
               props.users.map((item) => <User 
                                            key={item.id} 
                                            user={item} 
                                            followingInProgress={props.followingInProgress}
                                            unFollow={props.unFollow}
                                            follow={props.follow}
                                            />)   
            }
        </div>
    )
}

export default Users;