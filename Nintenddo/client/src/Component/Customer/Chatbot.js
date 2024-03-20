import React, { useState } from 'react';
import axios from 'axios';
// import '../../Style/chatbot.css';
import Customers from './Customers';

function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [qnaList, setQnaList] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmitQuestion = async () => {
    try {
      await axios.post('/api/customer/ask', {
        email: 'fixed_email@example.com',
        title: question,
        content: question,
      });
      setQuestion('');
      loadQnaList();
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const loadQnaList = async () => {
    try {
      const response = await axios.get('/api/customer/qnalist');
      setQnaList(response.data.qnaList);
    } catch (error) {
      console.error('Error loading qna list:', error);
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

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleModal}>
        Chatbot
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal" style={{display:"flex"}}>
            <div className="modal-content">
              <span className="close-button" onClick={handleCloseModal}>
                CLOSE
              </span>
              <Customers />
            </div>
            <img src="http://localhost:8070/images/includes/mario.gif" alt="Mario GIF" />
            <div className='qnaList' style={{width:"100%"}}></div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default Chatbot;