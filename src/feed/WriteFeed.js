import React, { useCallback, useState } from 'react';
import BookSearch from './section/search/BookSearch';
import ReportEditor from './section/edit/ReportEditor';
import { useNavigate } from 'react-router-dom';
import CustomAxios from '../interceptor/CustomAxios';

const WriteFeed = () => {
    const [BookId, setBookId] = useState(null);
    const navigate = useNavigate();

    const wrapperSetBookIdState = useCallback(bookId => {
        setBookId(bookId);
    }, [setBookId]);

    const wrapperSetReportState = useCallback(report => {
        const onClick = async (report) => {
            const res = await CustomAxios.post(
                '/api/users/feed',
                JSON.stringify({
                    bookId: BookId,
                    report: report
                })
            );

            if (res.data.code === 500) {
                alert(res.data.message);
            } else {
                navigate('/home');
            }
        }

        onClick(report);
    }, [BookId, navigate]);

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