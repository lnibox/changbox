import axios from 'axios';

export const signUp = (user: object): Promise<object> => {
    return new Promise((resolve, reject) => {
        axios.post('/users', user).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
};

export const signIn = (user: object): Promise<object> => {
    return new Promise((resolve, reject) => {
        axios.post('/users/login', user).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
};