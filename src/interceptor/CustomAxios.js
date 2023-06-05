import axios from 'axios';
import { Cookies } from 'react-cookie'; 

const cookie = new Cookies();

const CustomAxios = axios.create({
    baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    headers: {
        "Content-Type" : "application/json"
    }, 
    withCredentials: true
});

CustomAxios.interceptors.response.use(
    async res => {
        if (res.data.code === 205) {
            setTokenToCookie('AccessToken', res.data.reissuedJWT.accessToken);
            setTokenToCookie('RefreshToken', res.data.reissuedJWT.refreshToken);

            return await axios.request(res.config);
        }

        return res;
    }
);

const setTokenToCookie = (name, token) => {
    cookie.set(
        name,
        token,
        {
            path: '/',
            // domain: process.env.REACT_APP_HOST,
            maxAge: 1000 * 60 * 60 * 24 * 14,
            // httpOnly: true,
            sameSite: "lax"
        }
    )
}

export default CustomAxios;