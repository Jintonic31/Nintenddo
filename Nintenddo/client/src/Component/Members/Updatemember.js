import React, { useState, useEffect } from 'react';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/updatemember.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import DaumPostcode from "react-daum-postcode";
import Modal from 'react-modal'

import { loginAction } from '../../store/userSlice';


function Updatemember() {
    const loginUser = useSelector( state=>state.user );

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [znum, setZnum] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [add3, setAdd3] = useState('');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    


    useEffect(()=>{
        async function fetch(){
            try{
                const result = await axios.get( '/api/members/getLoginUser' );
                dispatch( loginAction( result.data.loginUser ) );
                console.log("리덕스 로그인유저" + result.data.loginUser)
            }catch(err){
                console.error(err);
            }
        }
        fetch();
    },[]);

    useEffect(()=>{
        setEmail( loginUser.email );
        setPwd( loginUser.pwd );
        setZnum( loginUser.znum );
        setAdd1( loginUser.add1 );
        setAdd2( loginUser.add2 );
        setAdd3( loginUser.add3 );
        console.log("loinUser.pwd : " + loginUser.pwd)
    },[]);



    const toggle=()=>{
        setIsOpen(!isOpen);
    }
    // 모달창을 위한 style
    const customStyles = {
        overlay: {
            backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const completeHandler=(data)=>{
        console.log(data)
        setZnum(data.zonecode)
        setAdd1(data.address)
        setIsOpen(false);
    }

    async function onUpdate(){ 
        if( loginUser.provider != 'kakao' && pwd != repwd ){
            return alert('패스워드 확인이 일치하지 않습니다')
        }

        await axios.post('/api/members/update', {email,pwd,znum, add1, add2, add3 })
        .then((result)=>{
            alert('정보수정이 완료되었습니다.')
            // console.log("엑시오스 콘솔 : " + result.data.loginUser)
            navigate('/login')
        })
        .catch((err)=>{
            alert('에러가 발생했습니다. 잠시후 다시 시도하세요');
            navigate('/')
        })
    }


    return (
        <div className='container'>
            <Heading />
            <div className='subPage'>
                <div className='smenu'></div>
                
                <article>
                    <div className='memberform'>
                    <h2 className="centerText">개인정보 수정</h2>    

                        <div className="field">
                        <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;Email</div>
                            <input type="text" className='mupdateinput' value={email} readOnly/>
                        </div>
                        <div className="field">
                        <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;Password</div>
                            <input type="password" value={pwd} onChange={(e)=>{
                                setPwd( e.currentTarget.value );
                            }}/>
                        </div>
                        <div className="field">
                        <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;reType Password</div>
                            <input type="password" value={repwd} onChange={(e)=>{
                                setRepwd( e.currentTarget.value );
                            }}/>
                        </div>
                        <div className="field">
                        <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;Znum</div>
                            <input type="text"  className='mupdateinput' value={znum} style={{width:"320px"}} onChange={(e)=>{
                                setZnum( e.currentTarget.value );
                            }} readOnly/>
                              <button style={{width:"100px"}} onClick={()=>{ toggle() }}>우편번호 찾기</button> 
                              </div>
                            <div>
                            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} >
                                <DaumPostcode onComplete={completeHandler} />
                            </Modal>
                            
                        </div>

                        <div className="field" >
                        <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;Address</div>
                            <input type="text"  className='mupdateinput' value={add1} onChange={(e)=>{
                                setAdd1( e.currentTarget.value );
                            }} readOnly/>
                        </div>
                        <div className="field">
                        <div className="updatemember"><div className="blackbar"></div>&nbsp;&nbsp;detail Address</div>
                            <input type="text"  className='mupdateinput' value={add2} onChange={(e)=>{
                                setAdd2( e.currentTarget.value );
                            }} placeholder='상세주소 입력'/>
                        </div>
                        <div className="field">
                            <div className="updatemember"><div className="blackbar">&nbsp;&nbsp;</div>&nbsp;&nbsp;extra Address</div>
                            <input type="text"  className='mupdateinput' value={add3} onChange={(e)=>{
                                setAdd3( e.currentTarget.value );
                            }}/>
                        </div>
                        <div className="btns">
                            <button onClick={()=>{
                                onUpdate();
                            }}>정보 수정</button>
                            <button onClick={()=>{
                                navigate('/');
                            }}>돌아가기</button>
                            <button onClick={()=>{
                                navigate('/deletemember')
                            }}>회원탈퇴</button>
                        </div>
                    </div>
                </article>
            </div>
            <Footing />
        </div>
    )
}

export default Updatemember
