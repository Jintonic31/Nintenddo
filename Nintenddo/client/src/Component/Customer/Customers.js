import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customers/customers.css'
function Customers() {
  const [qnaList, setQnaList] = useState([]);
  const loginUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('/api/customer/qnalist', { email: loginUser.email })
      .then((result) => {
        setQnaList(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const handleTitleClick = (qna) => {
    // 클릭한 타이틀에 해당하는 풀 데이터 표시
    const updatedQnaList = qnaList.map((item) => {
      if (item.qseq === qna.qseq) {
        return { ...item, showContent: !item.showContent };
      } else {
        return item;
      }
    });
    setQnaList(updatedQnaList);
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
                <div className="title" onClick={() => handleTitleClick(qna)}>
                    NO. : {qna.qseq} | DATE : {qna.indate.substring(0, 10)} | TITLE : {qna.title}
                </div>
                </div>
                {qna.showContent && <div className="content">{qna.content}</div>}
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
