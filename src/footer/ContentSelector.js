import React from "react";
import { Radio } from "antd";
import { FileTextOutlined, ReadOutlined, SmileOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ContentSelector = () => {
    const navigate = useNavigate();
    const onChange = (e) => {
        navigate(`/${e.target.value}`);
    };

    return (
        window.sessionStorage.getItem('uid') === null ? <></> : 
		<div style={{ textAlign: "center" }}>
            <Radio.Group onChange={onChange} defaultValue="home">
                <Radio.Button value="home"><ReadOutlined /></Radio.Button>
                <Radio.Button value="feed"><FileTextOutlined /></Radio.Button>
                <Radio.Button value="follow"><UserAddOutlined /></Radio.Button>
                <Radio.Button value="profile"><SmileOutlined /></Radio.Button>
            </Radio.Group>
		</div>
	);
}

export default ContentSelector;