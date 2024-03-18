import React from 'react';
import Heading from '../../Component/Heading';
import Footing from '../../Component/Footing';
import Chatbot from './Chatbot';

function Customer() {
    return (
        <div>

            <Chatbot /> {/* Chatbot 컴포넌트를 Customer 컴포넌트 내에 호출합니다. */}

        </div>
    );
}

export default Customer;