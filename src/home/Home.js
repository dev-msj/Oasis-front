import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../login/Logout"
import SuggestionList from "./section/SuggestionList";

const Home = () => {
	const [Data, setData] = useState([]);

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
				setData(res.data);
			} else {
				alert('Internal Server Error!');
			}
		})
		.catch(err => {
			console.log(err)
			console.log(err.response)
		});
    }, []);

    return (
		<div style={{ width: "80%", height: "90vh", textAlign: "center" }}>
			<Logout />
			<SuggestionList data={Data} />
		</div>
	);
}

export default Home;