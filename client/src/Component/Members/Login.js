import React, { useState, useEffect } from 'react'
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import axios from 'axios'
import '../../Style/Member/login.css'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { logoutAction } from '../../store/userSlice';
import { useNavigate } from "react-router-dom";

function Login() {
    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState();

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const [isOpen, setIsOpen] = useState(false)

    const ToS = () => {
        // 시작하기를 누르면 이 함수가 실행되면서 isOpen의 값을 반대(true)로 바꿔 모달창을 연다
        setIsOpen(!isOpen);
    }
    const ToSStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "800px",
            height: "280px",
            padding: "0",
        },
    }

    useEffect(() => {
        async function fetch() {
            try {
                const result = await axios.post('/api/members/getLoginUser');
                dispatch(loginAction(result.data.loginUser));
            } catch (err) {
                console.error(err);
            }
        }
        fetch();
    }, [])


    async function onLogout() {
        await axios.get('/api/members/logout')
        dispatch(logoutAction());

    }

    const findUserEmailByPhone = () => {
        if (!phone) {
            setMessage('휴대폰 번호를 입력하세요.');
            return;
        }
        axios.post(`/api/members/findUserEmailByPhone`, null, { params: { phone } })
            .then((response) => {
                // 서버에서 응답한 사용자 이메일을 상태에 저장
                setEmail(response.data.email);
                setMessage(`휴대폰 번호로 찾은 사용자의 이메일은 [ ${response.data.email} ] 입니다.`);
            })
            .catch((error) => {
                console.error('이메일 찾기 실패:', error);
                setMessage('이메일 찾기에 실패했습니다.');
            });
    };

    return (
        <div className='Cnt'>
            <Heading />

            <div class="colored-div">
                <div className='incoloredWrap'>
                    <img src={process.env.REACT_APP_IMG_SRC + 'members/' + 'mynintendo.png'} />

                    <div className='incoloredTitle'>
                        <div class="content-div">
                            마이 닌테도를<br />
                            시작하자!
                        </div>

                        <div className='gologinbtns'>
                            {
                                (loginUser.email) ? (
                                    <div className='gologininfo'>
                                        <Link to='/updatemember'>
                                            {loginUser.email}님
                                        </Link>
                                        <button className='gologoutbtn' onClick={
                                            () => {
                                                onLogout();
                                            }
                                        }>로그아웃</button>
                                    </div>
                                ) : (
                                    <div className='yesloginUser'>
                                        <button className="gologinbtn" onClick={() => { ToS() }}>
                                            시작하기
                                        </button>
                                        <button className="gologinbtn" onClick={() => { navigate("/loginpage") }}>
                                            로그인
                                        </button>
                                        <img className="gologinbtn" src={process.env.REACT_APP_IMG_SRC + 'members/kakaologin.png'} alt='' onClick={
                                            () => {
                                                window.location.href = `${process.env.REACT_APP_KAKAO_REDIRECT}api/members/kakaostart`
                                            }
                                        } />
                                    </div>
                                )
                            }

                        </div>
                    </div>


                </div>
            </div>

            <div className='findAccountWrap'>
                <div className='findAccount'>
                    <div className='faTitle'>
                        ID/PW를 잊으셨나요?
                        <div className='faTitle2'>
                            휴대폰 번호 입력을 통해 계정을 찾을 수 있습니다.
                        </div>
                    </div>

                    <div className='fainfoTitle'>
                        <div>&nbsp;&nbsp;</div>
                        <div className='infoTitle'>휴대폰 번호</div>
                    </div>
                    <input type="tel" placeholder="휴대폰 번호를 입력하세요." value={phone} onChange={handlePhoneChange} />

                    <button onClick={findUserEmailByPhone}>찾기</button>
                    <div className='kurby'>
                        <img src={process.env.REACT_APP_IMG_SRC + 'members/' + 'kurby.png'} />
                    </div>
                    <div className='faMessage'>
                        {email && <p>사용자 이메일: [ {email} ]</p>}
                        {message && <p>{message}</p>}
                    </div>

                </div>
            </div>





            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} style={ToSStyle}>
                <div id="myModal" class="joinmodal">
                    <div class="jmodal-content">
                        <div class="jmodal-body">
                            <img src={process.env.REACT_APP_IMG_SRC + 'members/' + '13down.png'} />&nbsp;&nbsp;&nbsp;

                            <img src={process.env.REACT_APP_IMG_SRC + 'members/' + '14up.png'} onClick={() => {
                                navigate("/joinform");
                            }} />
                        </div>
                    </div>
                </div>
            </Modal>



            <Footing />

        </div>
    )
}

export default Login
