import { usersAPI } from '../api/api';
import { UserType } from '../types/types';

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users : [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
};

type InitialState = typeof initialState;   


export const usersReducer = (state = initialState, action:any):InitialState => {

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
    
    
//ActionCreator + types

type followSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
export let followSuccess = (userId:number):followSuccessType => ({ type: FOLLOW, userId});

type unFollowSuccessType = {
    type: typeof UN_FOLLOW,
    userId: number
}
export let unFollowSuccess = (userId:number):unFollowSuccessType =>  ({type: UN_FOLLOW, userId});

type setUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export let setUsers = (users:Array<UserType>):setUsersType =>  ({type: SET_USERS, users});

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export let setCurrentPage = (currentPage:number):setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export let setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export let toggleIsFetching = (isFetching: boolean):toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});

type toggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export let toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}); 



//Thunks - functions 

export const requestUsers = (page:number, pageSize:number) => {
   return async (dispatch:any) => {
            dispatch(toggleIsFetching(true));
            let data = await usersAPI.getUsers(page, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setCurrentPage(page));
            dispatch(setTotalUsersCount(data.totalCount));
    }
}   
export const follow = (userId:number) => {
    return async (dispatch:any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.follow(userId);
            if(data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
        dispatch(toggleFollowingProgress(false, userId));
    }
}
export const unFollow = (userId:number) => {
    return async (dispatch:any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.unfollow(userId);
            if(data.resultCode === 0) {
                dispatch(unFollowSuccess(userId))
            }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

