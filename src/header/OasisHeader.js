import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, Col, Row } from "antd";
import Logout from '../login/Logout';
import { BulbOutlined, PlusSquareOutlined } from '@ant-design/icons';

const OasisHeader = () => {
	const [show, setShow] = useState(true);
    const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (window.sessionStorage.getItem('uid') === null && location.pathname !== '/') {
			navigate('/');
		}
	});

	const onClickWrite = () => {
		console.log('write')
	}

	const onClickAlarm = () => {
		console.log('alarm')
	}

    return (
		location.pathname === '/' ? <></> :
		<Row>
			<Col span={8}>
				<font color="#FFFFFF" style={{ fontFamily: "궁서", fontSize: "xxx-large" }}>Oasis</font>
			</Col>
			<Col span={8} style={{ textAlign:"center" }}><Logout /></Col>
			<Col span={8} style={{ textAlign: 'right' }}>
				<Row>
					<Col span={16} style={{ paddingRight: '5%' }}>
						<PlusSquareOutlined onClick={onClickWrite} style={{ color: 'white' }} />
					</Col>
					<Col span={1}>
						<Badge dot={show}>
							<BulbOutlined onClick={onClickAlarm} style={{ color: 'white' }} />
						</Badge>
					</Col>
				</Row>
			</Col>
		</Row>
    );
}

export default OasisHeader;