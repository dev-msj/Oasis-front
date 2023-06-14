import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from 'antd';
import Icon from '@ant-design/icons';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';
import { useCookies } from "react-cookie";
import CustomAxios from "../interceptor/CustomAxios";

const { Title } = Typography;

const Login = () => {
    const [, setCookie] = useCookies(['AccessToken', 'RefreshToken']);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
        if (userSession !== null && location.pathname === '/') {
            if (!userSession.joinUser) {
				navigate('/join');
			} else {
                navigate('/home');
            }
        }
    }, [location.pathname, navigate]);

    const handleOnClick = () => {
        const userSession = {
            'uid': null,
            'joinUser': false,
            'createProfile': false,
            'social': 'N'
        }

        window.sessionStorage.setItem('userSession', JSON.stringify(userSession));

        navigate('/join');
    }

    const handleSubmit = async () => {
        const id = document.getElementById('id').value;
        const password = document.getElementById('password').value;

        if (id === '' || password === '') {
            alert('id 또는 password를 입력해주세요!');
            return;
        }

        const res = await axios.post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login/default`,
            JSON.stringify({
                uid: id,
                password: password
            }),
            {
                headers: {
                    "Content-Type" : "application/json"
                }, 
                withCredentials: true
            }
        );

        try {
            if (res.data.code === 401) {
                alert(res.data.message);

                return;
            }

            setTokenToCookie('AccessToken', res.data.jsonWebToken.accessToken);
            setTokenToCookie('RefreshToken', res.data.jsonWebToken.refreshToken);

            const userSession = {
                'uid': id,
                'joinUser': res.data.joinUser,
                'createProfile': await checkProfile(),
                'social': 'N'
            }

            window.sessionStorage.setItem('userSession', JSON.stringify(userSession));
            
            navigate('/home');
        } catch(err) {
            alert('Internal Server Error!');
            console.log(err);
        }
    }

    const checkProfile = async () => {
        const res = await CustomAxios.get('/api/users/profile');

        try {
            if (res.data.code === 404) {
                alert(res.data.message);
                return false;
            }

            return true;
        } catch(err) {
            alert('Internal Server Error!');
            console.log(err);
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

    return (
        <div>
            <Title style={{ textAlign: "center" }} level={2}><font color="#FFFFFF" style={{ fontFamily: "궁서" }}>Oasis</font></Title>
            <div style={{ width: '350px' }}>

                <div style={{ marginBottom: '5%' }}>
                    <Input
                        id="id"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter your ID"
                        type="id"
                        allowClear
                    />
                </div>

                <div style={{ marginBottom: '5%' }}>
                    <Input
                        id="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter your password"
                        type="password"
                        allowClear
                    />
                </div>

                <div style={{ marginBottom: '5%' }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit} style={{ minWidth: '100%' }}>
                        로그인
                    </Button>
                </div>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button ghost onClick={handleOnClick}>회원가입</Button>
                </Form.Item>
            </div>
            <GoogleLoginButton />
        </div>
    );
};

export default Login;