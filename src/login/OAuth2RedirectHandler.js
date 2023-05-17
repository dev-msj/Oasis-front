import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.searchParams.get('result') === 'success') {
            window.sessionStorage.setItem('uid', url.searchParams.get("uid"));
            window.sessionStorage.setItem('joinState', url.searchParams.get('joinState'));

            if (window.sessionStorage.getItem('joinState') === 'false') {
                navigate('/join');
            } else {
                navigate('/home');
            }
        } else {
            alert(url.searchParams.get('message'));
            navigate('/');
        }
        
    });

    return <></>;
}

export default OAuth2RedirectHandler;