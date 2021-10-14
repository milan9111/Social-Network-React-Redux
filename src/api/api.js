import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', 
    headers: {
        'api-key': '945e8644-a2a6-4b4d-afe2-219467eefbea'
    },
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        }) 
    },
    getProfile(userId = 1){
        return instance.get(`profile/${userId}`)
        .then(response => {
            return response.data
        }) 
    },
    deleteUser(id) {
        return instance.delete(`follow/${id}`)
        .then(response => {
                return response.data
            })
    },
    addUser(id) {
        return instance.post(`follow/${id}`)
        .then(response => {
                return response.data
            })
    },
    authMe() {
        return instance.get(`auth/me`)
        .then(response => {
              return response.data
          })
    }
};

 


 


 

 

 



