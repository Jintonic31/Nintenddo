import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customers/customers.css';
import Writeqna from './Writeqna'; // Writeqna 컴포넌트를 import 합니다.

function Customers() {
  const [qnaList, setQnaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contentStates, setContentStates] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loginUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`/api/customer/qnalist/${currentPage}`, { email: loginUser.email })
      .then((result) => {
        setQnaList(result.data.qnalist);
        setTotalPages(result.data.paging.totalPages);
        setContentStates(new Array(result.data.qnalist.length).fill(false));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, loginUser.email]);

  function handleTitleClick(index) {
    setContentStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onSubmit = () => {
    axios.post('/api/customer/writeqna', { title, content, email: loginUser.email, reply: 'N' })
      .then(() => {
        axios.post(`/api/customer/qnalist/1`, { email: loginUser.email })
          .then((result) => {
            setQnaList(result.data.qnalist);
            alert('작성 완료!');
          })
          .catch((err) => {
            console.error(err);
          });

        navigate('/customers');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container">
      <div className="subPage">
        <article>
          <h2>Qna List</h2>
          <div className="qnatable">
            {qnaList && qnaList.map((qna, idx) => (
              <div className="row" key={qna.qseq}> 
                <div className="left">
                  <div className="qnatitle" onClick={() => handleTitleClick(idx)}>
                    NO. : {qna.qseq} | DATE : {qna.indate.substring(0, 10)} | TITLE : {qna.title}
                  </div>
                </div>
                <div className="content" style={{ display: contentStates[idx] ? 'flex' : 'none' }}>{qna.content}</div>
              </div>
            ))}
            {qnaList.length === 0 && (
              <div className="row">
                <div className="col">Qna가 하나도 없습니다</div>
              </div>
            )}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>이전 페이지</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음 페이지</button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Customers;