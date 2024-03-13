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



  return (
    <div className='container'>
            <Heading />
            <div class="colored-div">
                <img src={`http://localhost:8070/images/members/mynintendo.png`} />
                <div class="content-div">마이 닌테도를<br/>&nbsp;&nbsp;&nbsp;&nbsp;시작하자!</div>
                <div className='loginbtns'>
                </div>
                <button className="loginbtn" onClick={()=>{ToS()}}>시작하기</button>
                <button className="loginbtn" onClick={()=>{navigate("/loginpage")}}>로그인</button>
                </div>
            
            

            <br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <Footing />
            <Modal isOpen={isOpen} onRequestClose={()=> setIsOpen(false)} ariaHideApp={false} style={ToSStyle}>
            <div id="myModal" class="modal">
                <div class="modal-content">
                <div class="modal-body">
                <img src={`http://localhost:8070/images/members/13down.png`} />&nbsp;&nbsp;&nbsp;
                
                <img src={`http://localhost:8070/images/members/14up.png`} onClick={()=>{
                    navigate("/joinform");
                }} />

            </div>
            </div>
            </div>
            </Modal>
        </div>
  )
}

export default Login
