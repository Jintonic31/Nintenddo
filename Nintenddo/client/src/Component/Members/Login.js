import React , {useState, useEffect} from 'react'
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import axios from 'axios'
import '../../Style/login.css'
import Modal from 'react-modal'

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userid, setUserid] = useState('');
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector(state=>state.user);

  const [isOpen, setIsOpen] = useState(false)

  const ToS = () => {
    // 시작하기를 누르면 이 함수가 실행되면서 isOpen의 값을 반대(true)로 바꿔 모달창을 연다
        setIsOpen(!isOpen);
    }
    const ToSStyle = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"800px",
            height:"280px",
            padding:"0",
        },
    }

  useEffect(()=>{
      async function fetch(){
          try{
              const result = await axios.get( '/api/members/getLoginUser' );
              dispatch( loginAction( result.data.loginUser ) );
              navigate('/');
          }catch(err){
              console.error(err);
          }
      }
      fetch();
  },[])


  async function onLocalLogin(){
      if( !userid ){ return alert('아이디를 입력하세요') }
      if( !pwd ){ return alert('패스워드를 입력하세요') }
      try{
          let result = await axios.post( '/api/members/locallogin', {userid, pwd } );
          if(result.data.msg == 'ok'){
              alert('정상 로그인 되었습니다');
              // 로그인 유저를 조회해서 리덕스에 넣고 index.js 로 이동
              result = await axios.get( '/api/members/getLoginUser' );
              dispatch( loginAction( result.data.loginUser ) );
              navigate('/');
          }else{
              setMessage(result.data.msg);
          }
      }catch(err){
          console.error(err);
      }
      
  }
  return (
    <div className='container'>
            <Heading />
            <div class="colored-div">
                <img src={`http://localhost:8070/images/members/mynintendo.png`} />
                <div class="content-div"><h1>마이 닌테도를<br/>&nbsp;&nbsp;&nbsp;&nbsp;시작하자!</h1></div>
                <button onClick={()=>{ToS()}}>시작하기</button><br/>
                <button onClick={()=>{}}>로그인</button>
            </div>

            <div className='subPage'>
                <article>
                    <div className='memberform'>
                        <h2>LogIn</h2>
                        <div className="field">
                            <label>User ID</label>
                            <input type="text" value={userid} onChange={(e)=>{
                                setUserid( e.currentTarget.value );
                            }}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={pwd} onChange={(e)=>{
                                setPwd( e.currentTarget.value );
                            }}/>
                        </div>
                        
                        <div className="sns-btns">
                            <button onClick={
                                ()=>{
                                    window.location.href='http://localhost:8070/api/members/kakaostart';
                                }
                            }>Kakao Login</button>
                            <button>Naver Login</button>
                            <button>Google Login</button><button>FaceBook Login</button>
                        </div>
                        <div>{message}</div>
                    </div>
                </article>
            </div>
            <Footing />
            <Modal isOpen={isOpen} onRequestClose={()=> setIsOpen(false)} ariaHideApp={false} style={ToSStyle}>
            <div id="myModal" class="modal">
                <div class="modal-content">
                <div class="modal-body">
                <img src={`http://localhost:8070/images/members/13down.png`} />&nbsp;&nbsp;&nbsp;
                <img src={`http://localhost:8070/images/members/14up.png`} />
            </div>
            </div>
            </div>
            </Modal>
        </div>
  )
}

export default Login
