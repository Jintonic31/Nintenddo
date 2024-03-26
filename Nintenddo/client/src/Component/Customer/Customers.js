import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customers/customers.css'

function Customers() {
  const [qnaList, setQnaList] = useState([]);
  const loginUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false); // display 속성을 조절할 상태

  useEffect(() => {
    axios.post('/api/customer/qnalist', { email: loginUser.email })
      .then((result) => {
        setQnaList(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleTitleClick() {
    // setShowContent를 통해 showContent 상태를 토글
    setShowContent(prevState => !prevState);
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
                  <div className="qnatitle"  onClick={()=>{handleTitleClick()}}>
                    NO. : {qna.qseq} | DATE : {qna.indate.substring(0, 10)} | TITLE : {qna.title}
                  </div>
                </div>
                <div className="content" style={{ display: showContent ? 'flex' : 'none' }}>{qna.content}</div>
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