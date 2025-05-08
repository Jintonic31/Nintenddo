import React, {useState, useRef} from 'react'
import Modal from 'react-modal'
import {Link, useNavigate} from 'react-router-dom'
// ㄴ 특정 컴포넌트로 이동하는 함수
import '../Style/includes/footing.css'



function Footing() {

    const navigate = useNavigate();

    const [imgSrc, setImgSrc] = useState(process.env.REACT_APP_IMG_SRC +'includes/gotop.png');

    const handleMouseOver = () =>{
        setImgSrc(process.env.REACT_APP_IMG_SRC +'includes/gotopMouseOver.png');
    }

    const handleMouseOut = () =>{
        setImgSrc(process.env.REACT_APP_IMG_SRC +'includes/gotop.png');
    }

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    const ToS = () => {
    // 이용약관을 누르면 이 함수가 실행되면서 isOpen의 값을 반대(true)로 바꿔 모달창을 연다
        setIsOpen(!isOpen);
    }
    const ToSStyle = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"900px",
            height:"600px",
            padding:"0",
        },
    }

    const userInfo = () => {
        // 이용약관을 누르면 이 함수가 실행되면서 isOpen의 값을 반대(true)로 바꿔 모달창을 연다
            setIsOpen2(!isOpen2);
        }
        const userInfoStyle = {
            overlay: {
                backgroundColor:"rgba(0,0,0,0.5)",
            },
            content: {
                left:"0",
                margin:"auto",
                width:"900px",
                height:"600px",
                padding:"0",
            },
        }



    return (
        <div className='footingCnt'>
            <div className='footingredline'>
                <div className='infootingredline'>
                    <div className='flogo'><img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'flogo.png'} alt=''/></div>
                    <div className='fgoTop' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <img src={imgSrc}/>
                    </div>
                </div>
            </div>

            <div className='fnews'>
                <div className='snsNews'>
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'youtube.png'} alt=''/>
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'kakao.png'} alt=''/>
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'facebook.png'} alt='' />
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'twitter.png'} alt=''/>
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'kakaoch.png'} alt=''/>
                </div>
                <div className='myNintendo'>
                    <div>
                        <Link to='/login'> 
                        <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'mynintendo.png'} alt=''/>
                        </Link>
                    </div>
                   
                </div>
                <div className='famiibo'>
                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'famiibo.png'} alt=''/>
                </div>

                
            </div>
            <div className='fcategory'>
                <div className='intro'>
                    <hr />
                    <div className='title'>한국닌텐도</div>
                    <div className='sub' onClick={()=>{navigate('/aboutus')}}>- 회사개요</div>
                    <div className='sub' onClick={()=>{navigate('/aboutus')}}>- 찾아오시는 길</div>
                </div>
                <div className='hardware'>
                    <hr />
                    <div className='title'>본체/amiibo</div>
                    <div className='sub' onClick={()=>{navigate('/hardware')}}>- Nintendo Switch</div>
                    <div className='sub'>- amiibo</div>
                </div>
                <div className='software'>
                    <hr />
                    <div className='title'>소프트웨어</div>
                    <div className='sub' onClick={()=>{navigate('/software')}}>- Nintendo Switch 소프트웨어</div>
                    <div className='sub' onClick={()=>{navigate('/software')}}>- 소프트웨어 발매 스케줄</div>
                    <div className='sub'>- 스마트폰용 앱</div>
                </div>
                <div className='cutomer'>
                    <hr />
                    <div className='title'>고객지원</div>
                    <div className='sub' onClick={()=>{navigate('/newslist')}}>- 공지사항</div>
                </div>
            </div>

            <div className='copyRight'>
                <div className='copyContainer'>
                    <div className='seller'>
                        <span onClick={ ()=>{ ToS() } }>이용약관&nbsp; </span> |

                        <Modal isOpen={isOpen} ariaHideApp={false} style={ToSStyle}>
                            <div className='ToSCnt'>
                                <div className='ToSLogo'>
                                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'toslogo.png'} alt=''/>
                                </div>
                                <div className='ToSTitle'>
                                    <div>&nbsp;&nbsp;</div>
                                    <div>이용약관</div>
                                </div>
                                <div className='ToSText' >

                                    <br /><br />

                                    <span>한국닌텐도 홈페이지에 대해</span><br /><br />
                                    
                                    한국닌텐도 홈페이지(이하 「본 홈페이지」라 함)를 이용해 주셔서 대단히 감사합니다. 본 홈페이지는 한국닌텐도주식회사(이하 「한국닌텐도」라 함)가 관리, 운영하고 있습니다.

                                    <br /><br />
                                    
                                    이용하시기에 앞서
                                    본 홈페이지를 이용하시기에 앞서 다음의 동의 사항을 읽어보시고, 동의하시는 경우에 한해 이용해 주십시오. 다음의 동의 사항은 예고 없이 변경될 수 있습니다.
                                    항상 최신 내용을 확인한 후 이용해 주시기 바랍니다.<br /><br />

                                    <span>[동의 사항]</span><br /><br />
                                    ▶ 저작권에 대하여<br /><br />
                                    본 홈페이지에 게재된 문장, 사진, 영상, 음악, 디자인 등 모든 콘텐츠의 저작권은 한국닌텐도 또는 한국닌텐도로부터 이용을 인정받은 저작자에 귀속합니다. 이들 저작권은 각국의 저작권법, 각종 조약, 기타 법률로 보호되고 있습니다. 각 콘텐츠는 명시된 제한에 따라 법률로 인정된 범위 내에서 내려 받거나 인쇄하여 사용하는 것을 제외하고
                                    복제, 배포, 게시, 송신, 삭제, 변경, 번안 등을 포함한 기타 이용을 엄격히 금지합니다.<br />
                                    면책 사항<br />
                                    한국닌텐도는 항상 세심한 주의를 기울여 본 홈페이지를 운영·관리하고 있으나, 정보 및 동작의 정확성, 완전성을 보장하지는 않습니다. 고객님이 본 홈페이지를 이용해서
                                    생기는 모든 손해, 또는 어떠한 이유로 인해 이용하지 못해서 생기는 모든 손해에 대해 한국닌텐도는 책임지지 않습니다.
                                    한국닌텐도는 본 홈페이지의 이용으로 인해 발생하는 소프트웨어 및 하드웨어상의 문제나 기타 손해에 대해 책임지지 않습니다. 또한 본 홈페이지에 게재된 정보는 정보를
                                    게재할 당시의 정보입니다. 현재 상황과 다른 정보나 이미 판매가 종료된 상품의 정보도 게재되어 있으므로 이 점 미리 양해 바랍니다.<br /><br />
                                    ▶ 링크에 대하여<br /><br />
                                    본 홈페이지의 링크는 원칙적으로 자유입니다. 단 동영상이나 PDF파일은 직접 링크하지 말아 주십시오. 또한 링크할 경우, 본 홈페이지를 링크한 내용임을 반드시
                                    명기하시고, 본 홈페이지를 링크한 홈페이지(이하 링크 사이트라 칭함)에 게재된 상품, 서비스, 회사 등의 정보가 한국닌텐도와 제휴 등의 특별한 관계가 있다고 오해의
                                    소지를 낳을 수 있는 기재나 표현은 삼가하시기 바랍니다.<br /><br />

                                    본 홈페이지에서 또는 본 홈페이지를 링크한 링크 사이트는 한국닌텐도의 관리하에 있지 않으며, 링크 사이트의 이용으로 인해 발생하는 그 어떠한 손해에 대해서도
                                    한국닌텐도는 책임지지 않습니다.
                                    「공식 링크 배너」의 배포는 현재 중단한 상태입니다. 한국닌텐도에서는 「공식 링크 배너」의 이용으로 인해 발생하는 소프트웨어나 하드웨어상의 문제 및 그 밖의 손해에
                                    대해 책임지지 않습니다.<br /><br />
                                </div>
                                <div className='ToSBtn'><button onClick={ ToS }>닫기</button></div>

                            </div>
                            
                        </Modal>
                        
                        <span onClick={ ()=>{ userInfo() } }>&nbsp; 개인정보처리방침</span>

                        <Modal isOpen={isOpen2} ariaHideApp={false} style={userInfoStyle}>
                            <div className='ToSCnt'>
                                <div className='ToSLogo'>
                                    <img src= {process.env.REACT_APP_IMG_SRC +'includes/'+'toslogo.png'} alt=''/>
                                </div>
                                <div className='ToSTitle'>
                                    <div>&nbsp;&nbsp;</div>
                                    <div>개인정보처리방침</div>
                                </div>
                                <div className='ToSText' >

                                    <br /><br />

                                    <span>개인정보처리방침 대해</span><br /><br />
                                    
                                    한국닌텐도는 고객님들의 소중한 개인정보 보호를 위해 아래와 같은 방침을 수행하고 있습니다.<br /><br />

                                    <span>▶ 개인정보의 처리 목적</span><br /><br />

                                    한국닌텐도 주식회사(이하 '한국닌텐도') 는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
                                    – 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급.배송 등<br /><br />

                                    <span>▶ 개인정보의 처리 및 보유 기간</span><br /><br />

                                    ① ‘한국닌텐도’는 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.<br /><br />

                                    ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.<br />
                                    – 고객 가입 및 관리 : 카카오싱크를 통한 회원가입 및 카카오채널을 통한 관리<br />
                                    – 보유 기간 : 카카오채널 탈퇴 시, 즉시 삭제
                                     및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.<br /><br />

                                    <span>▶ 정보주체와 법정대리인의 권리·의무</span><br /><br />
                                    ① 정보주체는 ‘한국닌텐도’ 에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br />
                                    1. 개인정보 열람요구<br />
                                    2. 오류 등이 있을 경우 정정 요구<br />
                                    3. 삭제요구<br />
                                    4. 처리정지 요구<br /><br />
                                </div>
                                <div className='ToSBtn'><button onClick={ userInfo }>닫기</button></div>

                            </div>
                            
                        </Modal>

                        <br />

                        ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.

                        <br />

                        상호명 : <Link to={'/adminlogin'} style={{textDecoration:"none", color:"gray"}}>한국닌텐도주식회사</Link> &nbsp;&nbsp;대표자명 : 미우라 타카히로 &nbsp;&nbsp;사업자등록번호 : 120-87-03578
                    </div>
                    <div className='hours' style={{textAlign:"right"}}>
                    고객지원 문의전화 : 1670-9900 (평일 오전 9시 30분~오후 5시 30분)

                    <br /><br />

                    ※ 토/일/공휴일/회사 정기휴일 및 특별휴일 제외

                    </div>
                </div>

            </div>

            
        
        </div>
    )
}

export default Footing
