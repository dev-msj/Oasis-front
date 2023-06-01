import React from 'react';
import { Button } from "antd";

const Logout = () => {
	const handleLogout = () => {
		window.sessionStorage.removeItem('uid');
		window.sessionStorage.removeItem('joinState');
		window.sessionStorage.removeItem('social');
		window.location.reload();
	}

    return (
        <div style={{ marginBottom: "2%" }}>
            <Button ghost size="small" onClick={handleLogout}>logout</Button>
        </div>
    );
}

export default Logout;