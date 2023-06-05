import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { useCookies } from 'react-cookie';

const GoogleLoginButton = () => {
    const [, setCookie] = useCookies(['AccessToken', 'RefreshToken']);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.loginCallback = async (data) => {
            const res = await axios.post(
                `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login/google`, 
                JSON.stringify({
                    token: data.credential
                }), {
                    headers: {
                        "Content-Type" : "application/json"
                    }, 
                    withCredentials: true
                }
            );

            if (res) {
                window.sessionStorage.setItem('uid', jwt(data.credential).email);
                window.sessionStorage.setItem('joinUser', res.data.joinUser);
                window.sessionStorage.setItem('social', 'Y');

                setTokenToCookie('AccessToken', res.data.jsonWebToken.accessToken);
                setTokenToCookie('RefreshToken', res.data.jsonWebToken.refreshToken);

                if (res.data.joinUser === true) {
                    navigate('/home');
                } else {
                    navigate('/join');
                }
            }
        }

        const setTokenToCookie = (name, token) => {
            setCookie(
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
    }, [navigate, setCookie]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div id="g_id_onload"
                data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                data-callback="loginCallback"
                data-auto_prompt="false">
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
        </div>
    );
}

export default GoogleLoginButton;