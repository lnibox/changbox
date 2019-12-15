import axios from 'axios';

export async function SignUp(user: any): Promise<any> {
    let url: string = '/users';
    return await axios.post(url, user);
}


export async function Ping(): Promise<any> {
    return await axios.get('/ping');
}