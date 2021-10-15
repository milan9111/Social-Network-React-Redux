import React from "react";
import { connect } from "react-redux";
import { follow, unFollow, setCurrentPage, getUsers} from "../../redux/usersReducer";
import Users from "./Users";
import { Preloader } from "../common/preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => { 
     
    return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage, 
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress 
    }      
}

 
class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
  
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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



export default withAuthRedirect(connect(mapStateToProps, {follow, unFollow, setCurrentPage, getUsers})(UsersContainer));