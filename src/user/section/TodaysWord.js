import { Button, Descriptions, Input } from 'antd';
import React from 'react';
import axios from 'axios';

const TodaysWord = () => {
    const { TextArea } = Input;
    
    const handleOnClick = async () => {
        const text = document.getElementById('user_think').value;
        if (text === '') {
            alert('내용을 입력해주세요!');
            return;
        }

        let res = await axios.post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/word/insert`,
            {
                uid: window.sessionStorage.getItem('uid'),
                word: window.sessionStorage.getItem('word'),
                human: window.sessionStorage.getItem('human'),
                think: text
            }
        );
        if (!res) {
            alert('Internal Server Error!');
            return;
        }

        res = await axios.get('https://api.qwer.pw/request/helpful_text?apikey=guest');
        if (res) {
            let result = res.data[1].respond.split('-');
            if (result.length !== 2)
                result = res.data[1].respond.split('–');
    
            window.sessionStorage.setItem('word', result[0]);
            window.sessionStorage.setItem('human', result[1]);
            window.location.reload();
        } else {
            alert('Internal Server Error!');
        }
    }

    return (
        <div style={{ marginBottom: "2%", border: "3px solid #FAED7D", borderRadius: "1em" }}>
            <Descriptions style={{ background: "white", borderRadius: "1em" }}>
                <Descriptions.Item span={3}>{window.sessionStorage.getItem('word')}</Descriptions.Item>
                <Descriptions.Item style={{ borderBottom: "3px solid #FAED7D" }} span={3}>-{window.sessionStorage.getItem('human')}-</Descriptions.Item>
                <Descriptions.Item span={3}>
                    <TextArea id='user_think' />
                    <Button type="primary" ghost onClick={handleOnClick}>생각 더하기</Button>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default TodaysWord;