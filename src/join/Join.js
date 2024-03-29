import React, { useState } from "react";
import { Typography } from 'antd';
import CreateUser from "./section/CreateUser";
import CreateProfile from "./section/CreateProfile";

const { Title } = Typography;

const Join = () => {
    const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
    const [join, setJoin] = useState(userSession.joinUser);

    return (
        <div>
            <Title style={{ textAlign: "center" }} level={2}><font color="#FFFFFF" style={{ fontFamily: "궁서" }}>Oasis</font></Title>
            <div style={{ width: '350px' }}>
                {
                    join ? <CreateProfile /> : <CreateUser setJoin={setJoin} />
                }
            </div>
        </div>
    );
};

export default Join;