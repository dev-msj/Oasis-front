import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const uid = new URL(window.location.href).searchParams.get("uid");

        window.sessionStorage.setItem('uid', uid);

        navigate('/home');
    });

    return <></>;
}

export default OAuth2RedirectHandler;