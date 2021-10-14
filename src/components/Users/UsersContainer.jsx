import React from "react";
import { connect } from "react-redux";
import { follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching } from "../../redux/usersReducer";
import Users from "./Users";
import { Preloader } from "../common/preloader/Preloader";
import { usersAPI } from "../../api/api";
 

let mapStateToProps = (state) => { 
     
    return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage, 
      isFetching: state.usersPage.isFetching 
    }      
}
  
class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }
  
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });
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
            />
            </>
        );
    } 
  }



export default connect(mapStateToProps, {follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);