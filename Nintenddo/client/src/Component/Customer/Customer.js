import React from 'react';
import Heading from '../../Component/Heading';
import Footing from '../../Component/Footing';

function Chatbot() {
  // 챗봇의 기능을 구현합니다.
  return (
    <div>
      <p>챗봇 기능이 구현됩니다.</p>
    </div>
  );
}

function Customer() {
  return (
    <div>
      <Heading />
      <Chatbot /> {/* Chatbot 컴포넌트를 Customer 컴포넌트 내에 호출합니다. */}
      <Footing />
    </div>
  );
}

export default Customer;