import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Qnaview() {
    const [qna, setQna] = useState({});
    useEffect(() => {
        axios.get('/api/customer/getqna')
        .then((result) => {
            setQna(result.data.qna);
        });
    }, []);

    return (
        <div className='container'>
            <div className='subPage'>
                <div className='smenu'></div>
                <article className='qna'>
                    {
                        (qna) ? (
                            <div className='qnaview'>
                                <h2>QnA View</h2>
                                <div className='field'>
                                    <label>Title</label>
                                    <div>{qna.title}</div>
                                </div>
                                <div className='field'>
                                    <label>Email</label>
                                    <div>{qna.email}</div>
                                </div>
                                <div className='field'>
                                    <label>Content</label>
                                    <div><pre>{qna.content}</pre></div>
                                </div>
                                <div className='field'>
                                    <label>Reply</label>
                                    <div>{qna.reply}</div>
                                </div>
                                <div className='field'>
                                    <label>Indate</label>
                                    <div>{qna.indate}</div>
                                </div>
                            </div>
                        ) : (<div>Loading</div>)
                    }
                </article>
            </div>
        </div>
    );
}

export default Qnaview;