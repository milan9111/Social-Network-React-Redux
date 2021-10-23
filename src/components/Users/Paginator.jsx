import React from "react";
import styles from "./Users.module.css";
 
 


let Paginator = (props) => {

     
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

        let pages = [];
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
     
    return(
         
            <div>
               {pages.map((item, index) => 
                    <span onClick={(e) => {props.onPageChanged(item)}} className={props.currentPage === item  ? styles.selectedPage : ''} key={index}>
                        {item}
                    </span>)}
            </div>  
    );
}

export default Paginator;