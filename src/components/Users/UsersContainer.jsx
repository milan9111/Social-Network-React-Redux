import React from "react";
import { connect } from "react-redux";
import { follow, unFollow, setCurrentPage, requestUsers} from "../../redux/usersReducer";
import Users from "./Users";
import { Preloader } from "../common/preloader/Preloader";
import { compose } from "redux";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from './../../redux/usersSelectors';


// let mapStateToProps = (state) => { 
     
//     return {
//       users: state.usersPage.users,
//       pageSize: state.usersPage.pageSize,
//       totalUsersCount: state.usersPage.totalUsersCount,
//       currentPage: state.usersPage.currentPage, 
//       isFetching: state.usersPage.isFetching,
//       followingInProgress: state.usersPage.followingInProgress 
//     }      
// }


let mapStateToProps = (state) => { 
     
    return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state), 
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state) 
    }      
}

 
class UsersContainer extends React.Component {
    
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
  
    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }
    
    render() {
        
        return(
            <>
            {this.props.isFetching ? <Preloader /> : null} 
            <Users totalUsersCount={this.props.totalUsersCount} 
                   pageSize = {this.props.pageSize}
                   currentPage = {this.props.currentPage}
                   onPageChanged = {this.onPageChanged}
                   users = {this.props.users}
                   follow = {this.props.follow}
                   unFollow = {this.props.unFollow}
                   followingInProgress = {this.props.followingInProgress}
            />
            </>
        );
    } 
  }


export default compose(
    connect(mapStateToProps, {follow, unFollow, setCurrentPage, requestUsers}),
)(UsersContainer)