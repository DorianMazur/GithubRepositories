import axios from './axios';

export const searchUsers = (name: string): Promise<{ isError: boolean; response: any }> =>
    axios
        .get('/search/users', {
            params: {
                q: name,
            },
        })
        .then(res => ({ isError: false, response: res.data }))
        .catch(error => ({ isError: true, response: error }));

export const getUserInfo = (name: string): Promise<{ isError: boolean; response: any }> =>
    axios
        .get(`/users/${name}`)
        .then(res => ({ isError: false, response: res.data }))
        .catch(error => ({ isError: true, response: error }));

export const getRepositories = (name: string): Promise<{ isError: boolean; response: any }> =>
    axios
        .get(`/users/${name}/repos`)
        .then(res => ({ isError: false, response: res.data }))
        .catch(error => ({ isError: true, response: error }));
