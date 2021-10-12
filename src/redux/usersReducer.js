const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'TOTAL-USERS-COUNT';

let initialState = {
    users : [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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

        default:
           return state;
    } 
}
    
    
export let followAC = (userId) => ({ type: FOLLOW, userId});
export let unFollowAC = (userId) =>  ({type: UN_FOLLOW, userId});
export let setUsersAC = (users) =>  ({type: SET_USERS, users});
export let setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export let setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
 