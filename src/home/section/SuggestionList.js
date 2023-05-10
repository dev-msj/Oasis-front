import React from 'react';
import { Descriptions, Image, Space } from 'antd';

const SuggestionList = props => {
    const RecordList = props.data.map(d => {
        return (
            <div style={{ marginBottom: "2%", border: "3px solid #FAED7D", borderRadius: "1em" }} key={crypto.randomUUID()}>
                <Space size={12}>
                    <Image
                        width={120}
                        height={160}
                        src={d.imageUrl}
                        style={{ borderRadius: "1em", zIndex: "-10" }}
                    />
                    <Descriptions title={d.title} style={{ background: "white", borderRadius: "1em" }}>
                        <Descriptions.Item label="저자">{d.author}</Descriptions.Item>
                        <Descriptions.Item label="번역">{d.translator}</Descriptions.Item>
                        <Descriptions.Item label="출판사">{d.publisher}</Descriptions.Item>
                        <Descriptions.Item label="출판일">{d.publishDate}</Descriptions.Item>
                        <Descriptions.Item label="카테고리">{d.bookCategoryName}</Descriptions.Item>
                        <Descriptions.Item label="설명">{d.description}</Descriptions.Item>
                    </Descriptions>
                </Space>
            </div>
        );
    });

    return (
        <div>
            {RecordList}
        </div>
    )
}

export default SuggestionList;