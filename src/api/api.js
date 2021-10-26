import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', 
    headers: {
        'api-key': '1dcc81de-3434-4a12-ae26-66d9c9d07c3a'
    },
});


export const usersAPI = {
    getUsers(currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        }) 
    },
    getProfile(userId){
        console.warn('Obsolete method. Please profileAPI object');
        return profileAPI.getProfile(userId);
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
        .then(response => {
                return response.data
            })
    },
    follow(id) {
        return instance.post(`follow/${id}`)
        .then(response => {
                return response.data
            })
    },
};


export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`)
        .then(response => {
            return response.data
        }) 
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(file) {
        let formData = new FormData();
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }); 
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
        .then(response => {
              return response.data
          });
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
        .then(response => {
            return response.data
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};




 


 

 

 



