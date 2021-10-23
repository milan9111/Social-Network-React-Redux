import { usersAPI } from './../api/api';

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users : [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map((item) => {
                if(item.id === action.userId) {
                    return {...item, followed: true}
                } 
                return item;

            })
        };

        case UN_FOLLOW:
            return {...state, users: state.users.map((item) => {
                if(item.id === action.userId) {
                    return {...item, followed: false}
                } 
                return item;

            })
        };
        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, 
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
                }
        }

        default:
           return state;
    } 
}
    
    
//ActionCreator

export let followSuccess = (userId) => ({ type: FOLLOW, userId});
export let unFollowSuccess = (userId) =>  ({type: UN_FOLLOW, userId});
export let setUsers = (users) =>  ({type: SET_USERS, users});
export let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export let setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export let toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export let toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}); 



//Thunks - functions 

export const requestUsers = (page, pageSize) => {
   return async (dispatch) => {
            dispatch(toggleIsFetching(true));
            let data = await usersAPI.getUsers(page, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setCurrentPage(page));
            dispatch(setTotalUsersCount(data.totalCount));
    }
}   
export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.follow(userId);
            if(data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
        dispatch(toggleFollowingProgress(false, userId));
    }
}
export const unFollow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.unfollow(userId);
            if(data.resultCode === 0) {
                dispatch(unFollowSuccess(userId))
            }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

