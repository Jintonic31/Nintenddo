import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/loginpage.css'
import axios from 'axios'

function Loginpage() {
  return (
    <div className="loginbody">
      <Heading/>
      <h2 className="centerText">닌텐도 어카운트 작성</h2>
      <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className="select-box">메일주소
            </div>
        <div className='Title'>
        <div>&nbsp;&nbsp;</div>
        <div className="select-box">생년월일
        </div>
        </div>
      <Footing/>
    </div>
    </div>
  )
}

export default Loginpage
