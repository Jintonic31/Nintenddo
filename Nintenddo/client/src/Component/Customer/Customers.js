import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customers/customers.css'

function Customers() {
  const [qnaList, setQnaList] = useState([]);
  const loginUser = useSelector((state) => state.user);
  const [paging, setPaging]  =useState({});
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false); // display 속성을 조절할 상태

  useEffect(() => {
    axios.post('/api/customer/qnalist/1', { email: loginUser.email })
      .then((result) => {
        setQnaList(result.data.qnalist);
        setPaging( result.data.paging);
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(
    ()=>{
        window.addEventListener("scroll", handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    }
);

  function onPageMove(p){
    axios.get(`/api/customer/qnalist/${p}`)
    .then((result)=>{
        let qnas = [];
        qnas = [...qnaList];
        qnas = [...qnas, ...result.data.qnalist];
        setQnaList([...qnas]);
        setPaging( result.data.paging );
    }) 
    .catch((err)=>{console.error(err)})
}

  const handleScroll=()=>{
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight; 
    if(scrollTop + clientHeight >= scrollHeight ) {
        //alert(paging.page);
        onPageMove( Number( paging.page ) + 1 );
    }
}

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