import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customers from './Customers';
import Writeqna from './Writeqna'; 

function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmitQuestion = async () => {
    try {
      // 서버로 질문 제출
      await axios.post('/api/customer/ask', {
        email: 'fixed_email@example.com',
        title: question,
        content: question,
      });

      // 질문 제출 후 텍스트 입력창 초기화
      setQuestion('');
      
      // QnA 리스트 다시 로드
      loadQnaList();
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const loadQnaList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 서버에서 QnA 리스트 가져오기
      const response = await axios.post('/api/customer/qnalist', { page });
      setQnaList(prevQnaList => [...prevQnaList, ...response.data.qnaList]);
      setHasMore(response.data.qnaList.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading qna list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 QnA 리스트 로드
    loadQnaList();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!loading && hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadQnaList();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleModal}>
        Q&A
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal-content">
              <span className="close-button" onClick={handleCloseModal}>
                CLOSE
              </span>
              <Customers />
              <Writeqna /> 
              {qnaList.map((qna, index) => (
                <div key={index}>
                  <p>{qna.question}</p>
                  <p>{qna.answer}</p>
                </div>
              ))}
            </div>
            <img src = {process.env.REACT_APP_IMG_SRC +'includes/' + 'mario.gif'} alt='' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;