import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from 'antd';
import Icon from '@ant-design/icons';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (window.sessionStorage.getItem('uid') !== null && location.pathname === '/') {
            if (window.sessionStorage.getItem('joinState') === 'false') {
				navigate('/join');
			} else {
                navigate('/home');
            }
        }
    });

    const handleOnClick = () => {
        window.sessionStorage.setItem('joinState', 'false');
        window.sessionStorage.setItem('social', 'N');
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

        if (res) {
            if (res.data === true) {
                window.sessionStorage.setItem('uid', id);
                window.sessionStorage.setItem('joinState', 'true');
                window.sessionStorage.setItem('social', 'N');
                navigate('/home');
            } else {
                alert('id나 password를 확인해 주세요!');
            }
        } else {
            alert('Internal Server Error!');
        }
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