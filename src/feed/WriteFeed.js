import React, { useCallback, useState } from 'react';
import axios from 'axios';
import BookSearch from './section/search/BookSearch';
import ReportEditor from './section/edit/ReportEditor';

const WriteFeed = () => {
    const [BookId, setBookId] = useState(null);

    const wrapperSetBookIdState = useCallback(bookId => {
        setBookId(bookId);
    }, [setBookId]);

    const wrapperSetReportState = useCallback(report => {
        const onClick = async (report) => {
            const res = await axios.post(
                `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/feed`,
                JSON.stringify({
                    bookId: BookId,
                    report: report
                }),
                {
                    headers: {
                        "Content-Type" : "application/json"
                    }, 
                    withCredentials: true
                }
            );
    
            console.log(res)
        }

        onClick(report);
    }, [BookId]);

    return (
        <>
            {
                BookId === null ? 
                <div style={{ width: "80%", height: "80vh", textAlign: "center" }}>
                    <BookSearch callback={wrapperSetBookIdState} />
                </div> : 
                <div style={{ width: "80%", height: "80vh" }}>
                    <ReportEditor callback={wrapperSetReportState} />
                </div>
            }
        </>
    );
}

export default WriteFeed;