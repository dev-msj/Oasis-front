import React, { useEffect, useState } from "react";
import SuggestionList from "./section/SuggestionList";
import { Radio } from "antd";
import CustomAxios from "../interceptor/CustomAxios";

const Home = () => {
	const [Data, setData] = useState([]);

	useEffect(() => {
		const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
		if (userSession !== null && userSession.joinUser) {
			initData("RECOMMEND");
		}
	}, []);

	const initData = async (suggestion_type) => {
		try {
			const res = await CustomAxios.post('/api/home/suggestion',
				JSON.stringify({
					uid: window.sessionStorage.getItem("uid"),
					suggestionType: suggestion_type
				})
			);

			setData(res.data);
		} catch(err) {
			if (err.response.status === 403) {
				alert("접근 권한이 없습니다!");
			} else {
				alert("Internal Server Error!");
			}
		}
	}

	const onChange = value => {
		initData(value.target.value);
	}

    return (
		<div style={{ width: "80%", height: "80vh", textAlign: "center" }}>
			<Radio.Group defaultValue="RECOMMEND" onChange={onChange} buttonStyle="solid">
				<Radio.Button value="RECOMMEND">추천</Radio.Button>
				<Radio.Button value="NEWBOOK">신간</Radio.Button>
				<Radio.Button value="BESTSELLER">베스트셀러</Radio.Button>
			</Radio.Group>

			<br />
			<br />

			<div style={{ height: "100%", overflow: "scroll" }}>
				<SuggestionList data={Data} />
			</div>
		</div>
	);
}

export default Home;