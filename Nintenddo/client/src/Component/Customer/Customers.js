import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customers/customers.css';

function Customers() {
  const [qnaList, setQnaList] = useState([]);
  const loginUser = useSelector((state) => state.user);
  const [paging, setPaging] = useState({});
  const navigate = useNavigate();
  const [contentStates, setContentStates] = useState([]); 

  useEffect(() => {
    axios.post('/api/customer/qnalist/1', { email: loginUser.email })
      .then((result) => {
        setQnaList(result.data.qnalist);
        setPaging(result.data.paging);
        // 각 행의 content 상태를 초기화
        setContentStates(new Array(result.data.qnalist.length).fill(false));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function onPageMove(p) {
    axios.get(`/api/customer/qnalist/${p}`)
      .then((result) => {
        setQnaList([...qnaList, ...result.data.qnalist]);
        setPaging(result.data.paging);
        setContentStates(prevStates => [
          ...prevStates,
          ...new Array(result.data.qnalist.length).fill(false)
        ]);
      })
      .catch((err) => { console.error(err) })
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      onPageMove(Number(paging.page) + 1);
    }
  }

  function handleTitleClick(index) {
    setContentStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="container">
      <div className="subPage">
        <article>
          <h2>Qna List</h2>
          <div className="qnatable">
            {qnaList && qnaList.map((qna, idx) => (
              <div className="row" key={idx}>
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
        </article>
      </div>
    </div>
  );
}

export default Customers;
