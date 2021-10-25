import React from "react";
import Paginator from "./Paginator";
import User from "./User";


let Users = (props) => {

    return(
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize} 
                       onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage}
                       portionSize="10" 
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