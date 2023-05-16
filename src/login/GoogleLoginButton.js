import React from 'react';
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const GoogleLoginButton = () => {
    const onClick = async () => {        
        const res = await axios.post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login/google`,
        );

        if (res.data) {
            window.location.href = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${res.data}`;
        } else {
            alert('Internal Server Error!');
        }
    };
    
    return (
        <div style={{ textAlign: 'center' }}>
            <Button onClick={onClick} icon={<GoogleOutlined />}>구글 로그인</Button>
        </div>
    );
}

export default GoogleLoginButton;