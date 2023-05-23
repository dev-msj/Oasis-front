import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

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
            console.log(res)
            window.sessionStorage.setItem('uid', res.data.uid);
            window.sessionStorage.setItem('joinState', res.data.joinState);
            if (res.data.joinState === true) {
                navigate('/home');
            } else {
                navigate('/join');
            }
        }
    }

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