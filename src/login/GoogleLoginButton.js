import React from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
    const onClick = async () => {        
        const res = await axios.post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login-google`,
        );

        if (res) {
            console.log(res)
            window.open(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${res.data}`, '구글 로그인');
        } else {
            alert('Internal Server Error!');
        }
    };
    
    return (
        <>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/google-login-button-png-1.png"
                alt="google" width="357px" height="117px" onClick={onClick} 
            />
        </>
    );
}

export default GoogleLoginButton;