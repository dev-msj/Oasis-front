import React from 'react';
import { Descriptions } from 'antd';

const TodaysWord = props => {
    const parseDateFormat = numberDate => {
        const splitData = String(numberDate).match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
        return `${splitData[1]}년 ${splitData[2]}월 ${splitData[3]}일 ${splitData[4]}시 ${splitData[5]}분 ${splitData[6]}초`;
    }

    const RecordList = props.data.map(d => {
        return (
            <div style={{ marginBottom: "2%", border: "3px solid #FAED7D", borderRadius: "1em" }}>
                <Descriptions title={parseDateFormat(d.date)} style={{ background: "white", borderRadius: "1em" }}>
                    <Descriptions.Item  span={3}>{d.word}</Descriptions.Item>
                    <Descriptions.Item style={{ borderBottom: "3px solid #FAED7D" }} span={3}>-{d.human}-</Descriptions.Item>
                    <Descriptions.Item  span={3}>{d.think}</Descriptions.Item>
                </Descriptions>
            </div>
        );
    });

    return (
        <div>
            {RecordList}
        </div>
    )
}

export default TodaysWord;