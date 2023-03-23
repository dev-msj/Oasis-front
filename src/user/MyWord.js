import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../login/Logout"
import TodaysWord from "./section/TodaysWord";
import WordRecord from "./section/WordRecord";

const MyWord = () => {
	const [Data, setData] = useState([]);

	useEffect(() => {
        const uid = window.sessionStorage.getItem('uid');
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/word/list?uid=${uid}`).then(res => {
            if (res) {
                setData(res.data);
            } else {
                alert('Internal Server Error!');
            }
        });
    }, []);

    return (
		<div style={{ width: "80%", height: "90vh", textAlign: "center" }}>
			<Logout />
            <TodaysWord />
			<WordRecord data={Data} />
		</div>
	);
}

export default MyWord;