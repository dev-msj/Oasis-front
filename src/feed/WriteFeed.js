import React, { useCallback, useState } from 'react';
import axios from 'axios';
import BookSearch from './section/search/BookSearch';
import ReportEditor from './section/edit/ReportEditor';

const WriteFeed = () => {
    const [BookId, setBookId] = useState(null);

    console.log(BookId)

    const wrapperSetParentState = useCallback(bookId => {
        setBookId(bookId);
    }, [setBookId]);

    const onClick = async () => {
        const keyword = document.getElementById('keyword').value;
        const res = await axios.get(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/books/${keyword}`,
            {
                withCredentials: true
            }
        );
    }

    return (
        <>
            {
                BookId === null ? 
                <div style={{ width: "80%", height: "80vh", textAlign: "center" }}>
                    <BookSearch callback={wrapperSetParentState} />
                </div> : 
                <div style={{ width: "80%", height: "80vh" }}>
                    <ReportEditor />
                </div>
            }
        </>
    );
}

export default WriteFeed;