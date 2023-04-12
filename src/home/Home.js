import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../login/Logout"
import SuggestionList from "./section/SuggestionList";
import { Radio } from "antd";

const Home = () => {
	const [Data, setData] = useState([]);
	const [Type, setType] = useState("RECOMMEND");

	useEffect(() => {
        axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/home/suggestion`,
			JSON.stringify({
				uid: window.sessionStorage.getItem("uid"),
				suggestionType: Type
			}), {
				headers: {
					"Content-Type" : "application/json"
				}, 
				withCredentials: true
			}
		)
		.then((res) => {
			console.log(res)
			if (res) {
				setData(res.data);
			} else {
				alert('Internal Server Error!');
			}
		})
		.catch(err => {
			console.log(err)
			console.log(err.response)
		});
    }, [Type]);

	const onChange = value => {
		setType(value.target.value);
	}

    return (
		<div style={{ width: "80%", height: "90vh", textAlign: "center" }}>
			<Logout />
			<Radio.Group defaultValue="RECOMMEND" onChange={onChange} buttonStyle="solid">
				<Radio.Button value="RECOMMEND">추천</Radio.Button>
				<Radio.Button value="NEWBOOK">신간</Radio.Button>
				<Radio.Button value="BESTSELLER">베스트셀러</Radio.Button>
			</Radio.Group>
			<SuggestionList data={Data} />
		</div>
	);
}

export default Home;