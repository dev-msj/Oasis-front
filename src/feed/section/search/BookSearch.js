import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import SearchList from './SearchList';
import axios from 'axios';

const BookSearch = props => {
    const [Data, setData] = useState([]);

    const onClick = async () => {
        const keyword = document.getElementById('keyword').value;
        const res = await axios.get(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/books/${keyword}`,
            {
                withCredentials: true
            }
        );

        if (res) {
            setData(res.data);
        } else {
            alert('server error!');
        }
    }

    return (
        <>
            <Row>
                <Col span={20} style={{ paddingRight: '5%' }}>
                    <Input
                        id="keyword"
                        placeholder="Enter the book you want to search"
                        type="text"
                        allowClear
                    />
                </Col>
                <Col span={2}>
                    <Button onClick={onClick}>Search</Button>
                </Col>
            </Row>

            <br />
			<br />

            <div style={{ height: "100%", overflow: "scroll" }}>
				<SearchList data={Data} callback={props.callback} />
			</div>
        </>
    );
}

export default BookSearch;