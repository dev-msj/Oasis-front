import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";

const Logout = () => {
    const navigate = useNavigate();
    
    if (window.sessionStorage.getItem('uid') === null) {
		navigate('/');
	}

	const handleLogout = () => {
		window.sessionStorage.removeItem('uid');
		window.sessionStorage.removeItem('word');
		window.sessionStorage.removeItem('human');
		navigate('/');
	}

    return (
        <div style={{ marginBottom: "2%" }}>
            <Button ghost size="small" onClick={handleLogout}>logout</Button>
        </div>
    );
}

export default Logout;