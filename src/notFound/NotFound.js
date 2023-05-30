import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const naviagte = useNavigate();

    const onClick = () => {
        naviagte('/');
    }

    return <div style={{ backgroundColor: 'white' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={onClick}>Back Home</Button>}
            />
        </div>;
}

export default NotFound;