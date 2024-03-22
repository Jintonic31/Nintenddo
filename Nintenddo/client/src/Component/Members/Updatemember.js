import React, { useState, useEffect, useRef } from 'react';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/updatemember.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import DaumPostcode from "react-daum-postcode";
import Modal from 'react-modal'
import Orderall from '../Order/Orderall'

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

    const [imgSrc, setImgSrc] = useState({
        1: "http://localhost:8070/images/members/remote1.png",
        3: "http://localhost:8070/images/members/remote3.png"
    })

    const navItems = [
        { id:1, text:"개인정보 수정" },
        { id:3, text:"회원탈퇴" },
    ];

    const handleMouseOver = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/members/remote${id + 1}.png` });
    }

    const handleMouseOut = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/members/remote${id}.png` });
    }

    // 스크롤 이동
    const viewPoint1 = useRef();
    const viewPoint2 = useRef();


    const onMoveView = (id) => {
        if(id === 1){ 
            viewPoint1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }else if(id === 3){
            viewPoint2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }


    useEffect(()=>{
        async function fetch(){
            try{
                const result = await axios.get( '/api/members/getLoginUser' );
                dispatch( loginAction( result.data.loginUser ) );
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
            navigate('/login')
        })
        .catch((err)=>{console.error(err)})
    }


    return (
        <div className='Cnt'>

            <Heading />

            <div className='updateMemberWrap'>

                <div className='mcontrollerNav'>
                    {
                        navItems.map(({id, text})=>(
                            <div className={'mnav'} id={`id${id}`} key={id} onClick= {()=>{onMoveView(id);} }>
                                <div
                                key={id}
                                onMouseOver={()=>{handleMouseOver(id);}}
                                onMouseOut={()=>{handleMouseOut(id)}}>
                                    <img src={imgSrc[id]} alt='' />&nbsp;&nbsp;
                                    {text}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='muform'>
                    <div className='mutitle' ref={viewPoint1}>
                        <div>&nbsp;</div>
                        개인정보 수정
                    </div>    

                    <div className="mufield">

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>이메일</div>
                            <div className='onemuinfo'>
                                <input type='text' value={email} readOnly/>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>비밀번호</div>
                            <div className='onemuinfo'>
                                <input type='password' value={pwd} onChange={(e)=>{
                                setPwd( e.currentTarget.value );
                                }}/>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>비밀번호 확인</div>
                            <div className='onemuinfo'>
                                <input type='password' value={repwd} onChange={(e)=>{
                                setRepwd( e.currentTarget.value );
                                }}/>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>우편번호</div>
                            <div className='onemuinfo'>
                                <input type="text" className="znuminput" value={znum} onChange={(e)=>{
                                setZnum( e.currentTarget.value );
                                }} readOnly/>
                                <button className="znumbtn" onClick={()=>{ toggle() }}>찾기</button>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>주소</div>
                            <div className='onemuinfo'>
                                <input type="text"  className='mupdateinput' value={add1} onChange={(e)=>{
                                setAdd1( e.currentTarget.value );
                                }} readOnly/>
                            </div>
                        </div>

                        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} >
                                <DaumPostcode onComplete={completeHandler} />
                        </Modal>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>주소</div>
                            <div className='onemuinfo'>
                                <input type="text"  className='mupdateinput' value={add1} onChange={(e)=>{
                                setAdd1( e.currentTarget.value );
                                }} readOnly/>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>상세주소 1</div>
                            <div className='onemuinfo'>
                                <input type="text" value={add2} onChange={(e)=>{
                                setAdd2( e.currentTarget.value );
                                }} placeholder='상세주소 1'/>
                            </div>
                        </div>

                        <div className='onemufield'>
                            <div className="blackbar">&nbsp;</div>
                            <div className='onemutitle'>상세주소 2</div>
                            <div className='onemuinfo'>
                                <input type="text"  className='mupdateinput' value={add3} onChange={(e)=>{
                                setAdd3( e.currentTarget.value );
                                }} placeholder='상세주소 2'/>
                            </div>
                        </div>

                        <button className="musavebtn" onClick={()=>{
                            onUpdate();
                        }}>저장하기</button>
                        
                    </div>





                    <div className='mutitle' ref={viewPoint2}>
                        <div>&nbsp;</div>
                        회원탈퇴
                    </div>

                </div>

                
                
            </div>

            
                        <button onClick={()=>{
                            navigate('/');
                        }}>돌아가기</button>
                        <button onClick={()=>{
                            navigate('/deletemember')
                        }}>회원탈퇴</button>

            <Footing />

        </div>
    )
}

export default Updatemember
