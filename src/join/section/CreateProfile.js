import Icon from "@ant-design/icons/lib/components/Icon";
import { Avatar, Button, Input, Space } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, { useState } from "react";
import Gravatar from "react-gravatar";
import CustomAxios from "../../interceptor/CustomAxios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
    const [duplicateCheck, setDuplicateCheck] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();

    const categoryList = [
        ["BC101", "소설"],
        ["BC102", "시/에세이"],
        ["BC103", "예술/대중문화"],
        ["BC104", "사회과학"],
        ["BC105", "역사와 문화"],
        ["BC108", "만화"],
        ["BC111", "가정과 생활"],
        ["BC116", "자연과 과학"],
        ["BC119", "인문"], 
        ["BC120", "종교/역학"],
        ["BC124", "취미/레저"]
    ];

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
        
        setSelectedTags(nextSelectedTags);
    };

    const handleDuplicateCheck = async () => {
        const nickname = document.getElementById('nickname').value;

        if (!nickname) {
            alert('닉네임을 작성해주세요!');

            return;
        }

        
        try {
            const res = await CustomAxios.get(`/api/users/profiles/duplicate/${nickname}`);

            if (!res.data) {
                alert('사용 가능한 닉네임입니다!');
                setDuplicateCheck(true);
            } else {
                alert('이미 존재하는 닉네임입니다!');
                setDuplicateCheck(false);
            }
        } catch(err) {
            alert('Internal Server Error!');
            console.log(err);
        }
    }

    const handleSubmit = async () => {
        const nickname = document.getElementById('nickname').value;
        const introduce = document.getElementById('introduce').value;

        if (!duplicateCheck) {
            alert('닉네임 중복을 확인해주세요!');
            return;
        }

        if (!introduce) {
            alert('자기소개를 입력해주세요!');
            return;
        }

        try {
            const res = await CustomAxios.post('/api/users/profile',
                JSON.stringify({
                    nickname: nickname,
                    introduce: introduce,
                    bookCategoryList: selectedTags
                })
            );

            if (res.data.code !== 200) {
                alert(res.data.data);
                return;
            }

            if (res.data.data) {
                const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
                userSession.createProfile = true;

                window.sessionStorage.setItem('userSession', JSON.stringify(userSession));

                navigate('/home');
            } else {
                alert('프로필 생성에 실패했습니다.');
                return;
            }
        } catch(err) {
            alert('Internal Server Error!');
            console.log(err);
        }
    }

    return <>
        <div style={{ marginBottom: '5%', textAlign: 'center' }}>
            <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<Gravatar email={JSON.parse(window.sessionStorage.getItem('userSession')).uid} default="retro" />}
            />
        </div>

        <div style={{ marginBottom: '5%' }}>
            <Input
                id="nickname"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your Nickname"
                type="nickname"
                allowClear
            />

            <div style={{ marginTop: '1%', textAlign: 'center' }}>
                <Button type="primary" className="login-form-button" onClick={handleDuplicateCheck}>
                    중복확인
                </Button>
            </div>
        </div>

        <div style={{ marginBottom: '5%' }}>
            <Input
                id="introduce"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Introduce"
                type="introduce"
                allowClear
            />
        </div>

        <div style={{ marginBottom: '5%', backgroundColor: 'white' }}>
            <Space size={[0, 8]} wrap>
                {
                    categoryList.map((tag) => (
                        <CheckableTag
                            key={tag[0]}
                            color="default"
                            checked={selectedTags.includes(tag[0])}
                            onChange={(checked) => handleChange(tag[0], checked)}
                            style={{ border: '1px solid black' }}
                        >
                            {tag[1]}
                        </CheckableTag>
                    ))
                }
            </Space>
        </div>

        <div style={{ marginBottom: '5%' }}>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit} style={{ minWidth: '100%' }}>
                프로필 생성
            </Button>
        </div>
    </>;
}

export default CreateProfile;