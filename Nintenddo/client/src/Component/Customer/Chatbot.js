import React from 'react';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
    const navigate = useNavigate();

    const handleChatbotClick = () => {
        // 챗봇 클릭 시 페이지 이동
        navigate("/customer");
    };

    return (
        <div onClick={handleChatbotClick}>
            {/* 챗봇 컨텐츠 */}
            <p>챗봇 컨텐츠를 여기에 넣어주세요.</p>
        </div>
    );
}

export default Chatbot;