import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import axios from 'axios'
import '../../Style/admin/Adminlogin.css'
import { adminAction } from '../../store/adminsSlice';
import { useDispatch } from 'react-redux';


function Adminlogin() {

    const navigate = useNavigate();
    const [adminid,setAdminid] = useState();
    const [pwd,setPwd] = useState();
    const dispatch = useDispatch();


    async function onLogin(){
        if(!adminid){return alert("이메일을 입력하세요.")}
        if(!pwd){return alert("비밀번호를 입력하세요.")}
    
        try{
        let result = await axios.post("/api/admins/loginpage", { adminid, pwd });
          if(result.data.msg == 'ok'){
            alert("관리자님 환영합니다!")

            result = await axios.post('/api/admins/getAdminUser');
            dispatch(adminAction(result.data.adminUser))

            navigate('/adminproductlist')

          }else if(result.data.msg=='해당 메일이 없습니다'){
            alert('해당 관리자 계정이 없습니다.')
          }else if(result.data.msg=='패스워드가 틀립니다.'){
            alert('비밀번호가 틀렸습니다.')
          }

       }catch(err){
          alert("로그인 에러");
        }
        
    }


    return (
        <div className="Cnt">

            <Heading/>

            <div className="centerText">
                <h1>닌텐도 관리자 로그인</h1>
            </div>

            <div className='loginTitle'>

                <div className='subTitle'>
                    <div>&nbsp;&nbsp;</div>
                    <div className='infoTitle'>관리자 아이디</div>
                </div>
                <div className="info">
                <input type="text" placeholder ="관리자 계정" value={adminid} onChange={(e)=>{
                    setAdminid(e.currentTarget.value);
                    }}/>
                </div>
            </div>

            <div className='loginTitle'>
                <div className='subTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infoTitle'>비밀번호</div>
                </div>
                <div className="info"><input type="text" placeholder ="비밀번호" value={pwd} onChange={(e)=>{
                    setPwd(e.currentTarget.value);
                }}/></div>
            </div>
            
            <button className="loginbtn" onClick={()=>{
                onLogin()            
            }}>로그인</button>

            <Footing/>

        </div>
    )
}

export default Adminlogin
