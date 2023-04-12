import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../login/Logout"

const Home = () => {
	const [Data, setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
        axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/home/suggestion`,
			JSON.stringify({
				uid: window.sessionStorage.getItem("uid"),
				suggestionType: "NEWBOOK"
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
				let result = res.data[1].respond.split('-');
				if (result.length !== 2)
					result = res.data[1].respond.split('–');

				setData(result);
			} else {
				alert('Internal Server Error!');
			}
		})
		.catch(err => {
			console.log(err)
			console.log(err.response)
		});
    }, []);

	const handleOnClick = () => {
		window.sessionStorage.setItem('word', Data[0]);
		window.sessionStorage.setItem('human', Data[1]);
		navigate('/my-word');
	}

    return (
		<div style={{ width: "80%", textAlign: "center" }}>

			<div>
			<font color="#FFFFFF">
				<h1>{Data[0]}</h1>
				<h1>-{Data[1]}-</h1>
			</font>
			</div>

			<div style={{ marginBottom: "2%" }}><Button ghost size="large" onClick={handleOnClick}>내 글 보기</Button></div>
			<Logout />
		</div>
	);
}

export default Home;