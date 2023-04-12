import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from 'antd';
import Icon from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';

const { Title } = Typography;

const Login = () => {
    const [Data, setData] = useState('login');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (window.sessionStorage.getItem('uid') !== null) {
            navigate('/good-word');
        }
    });

    const handleOnClick = () => {
        setData('join');
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
            console.log(res)
            if (res.data === true) {
                if (Data === 'login') {
                    window.sessionStorage.setItem('uid', id);
                    navigate('/home');
                } else {
                    setData('login');
                }
            } else {
                alert(Data === 'login' ? 'id나 password를 확인해 주세요!' : '잘못된 요청입니다!');
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
                        {Data.toUpperCase()}
                    </Button>
                </div>

                {
                    Data === 'login' ? (
                        <Form.Item style={{ textAlign: "center" }}>
                            <Button ghost onClick={handleOnClick}>회원가입</Button>
                        </Form.Item>
                    ) : (<></>)
                }
            </div>
            <GoogleLoginButton />
        </div>
    );
};

export default Login;