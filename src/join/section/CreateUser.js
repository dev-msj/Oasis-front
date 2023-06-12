import React from "react";
import { Input, Button } from 'antd';
import Icon from '@ant-design/icons';
import axios from "axios";
import { useCookies } from "react-cookie";

const CreateUser = props => {
    const [, setCookie] = useCookies(['AccessToken', 'RefreshToken']);
    const social = window.sessionStorage.getItem('social');

    const checkEmail = (email) => {
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        return regex.test(email);
    }

    const handleSubmit = async () => {
        const id = document.getElementById('id').value;
        const passwordElement = document.getElementById('password');
        
        if (!checkEmail(id)) {
            alert('Email 형식으로 입력해주세요!');
            return;
        }

        if (social === 'N') {
            const passwordAgain = document.getElementById('passwordAgain').value;

            console.log(passwordElement.value)
            console.log(passwordAgain)

            if (passwordElement.value !== passwordAgain) {
                alert('password가 일치하지 않습니다!');
                return;
            }

            if (id === '' || passwordElement.value === '') {
                alert('id 또는 password를 입력해주세요!');
                return;
            }
        }

        const res = await axios.post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/join`,
            JSON.stringify({
                uid: id,
                password: social === 'N' ? passwordElement.value : null,
                socialYN: social
            }),
            {
                headers: {
                    "Content-Type" : "application/json"
                }, 
                withCredentials: true
            }
        );

        try {
            if (res.data.code === 500) {
                alert(res.data.message);

                return;
            }

            window.sessionStorage.setItem('uid', id);
            window.sessionStorage.setItem('joinUser', res.data.joinUser);
            window.sessionStorage.setItem('social', 'N');

            setTokenToCookie('AccessToken', res.data.jsonWebToken.accessToken);
            setTokenToCookie('RefreshToken', res.data.jsonWebToken.refreshToken);

            props.setJoin(true);
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
        <>
            {
                social === 'N' ?
                <>
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
                        <Input
                            id="passwordAgain"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Enter your password again"
                            type="password"
                            allowClear
                        />
                    </div>
                </> :
                <>
                    <div style={{ marginBottom: '5%' }}>
                        <Input
                            id="id"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Enter your ID"
                            type="id"
                            value={window.sessionStorage.getItem('uid')}
                            disabled={true}
                            style={{ backgroundColor: 'white' }}
                        />
                    </div>
                </>
            }

            <div style={{ marginBottom: '5%' }}>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit} style={{ minWidth: '100%' }}>
                    회원가입
                </Button>
            </div>
        </>
    );
};

export default CreateUser;