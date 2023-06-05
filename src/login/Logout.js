import React from 'react';
import { Button } from "antd";
import { useCookies } from 'react-cookie';

const Logout = () => {
	const [, , removeCookie] = useCookies(['AccessToken', 'RefreshToken']);

	const handleLogout = () => {
		window.sessionStorage.removeItem('uid');
		window.sessionStorage.removeItem('joinUser');
		window.sessionStorage.removeItem('social');

		removeCookie('AccessToken');
		removeCookie('RefreshToken');

		window.location.reload();
	}

    return (
        <div style={{ marginBottom: "2%" }}>
            <Button ghost size="small" onClick={handleLogout}>logout</Button>
        </div>
    );
}

export default Logout;