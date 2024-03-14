import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/loginpage.css'
import axios from 'axios'

function Loginpage() {
  const navigate = useNavigate();
  const [email,setEmail] = useState();
  const [pwd,setPwd] = useState();

  function onLogin(){
    if(!email){return alert("이메일을 입력하세요")}
    if(!pwd){return alert("비번을 입력하세요")}

    axios.post("/api/members/loginpage", {email,pwd})
    .then((result)=>{
      alert("로그인 성공~!~!~!~!")
      navigate("/")
    })
    .catch((err)=>{
      alert("로그인 에러")
    })
  }

  return (
    <div className="loginbody">
      <Heading/>
      <div className="centerText"><h1>닌텐도 어카운트 작성</h1></div>
      <div className='loginTitle'>
        <div className='subTitle'>
            <div>&nbsp;&nbsp;</div>
            <div className='infoTitle'>메일주소</div>
            </div>
            <div className="info"><input type="text" placeholder ="메일 주소" value={email} onChange={(e)=>{
              setEmail(e.currentTarget.value);
            }}/></div>
      </div><br/><br/>
            <div className='loginTitle'>
            <div className='subTitle'>
            <div>&nbsp;&nbsp;</div>
            <div className='infoTitle'>비밀번호</div>
            </div>
            <div className="info"><input type="text" placeholder ="비밀번호" value={pwd} onChange={(e)=>{
              setPwd(e.currentTarget.value);
            }}/></div>
            </div><br/><br/>
        <button className="loginbtn" onClick={()=>{
          onLogin()            
        }}>로그인</button>

      <Footing/>
    </div>
  )
}

export default Loginpage
