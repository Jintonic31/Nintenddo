import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// ㄴ 특정 컴포넌트로 이동하는 함수
import '../Style/includes/footing.css'

function Footing() {

    const [imgSrc, setImgSrc] = useState('http://localhost:8070/images/includes/gotop.png')

    const handleMouseOver = () =>{
        setImgSrc('http://localhost:8070/images/includes/gotopMouseOver.png')
    }

    const handleMouseOut = () =>{
        setImgSrc('http://localhost:8070/images/includes/gotop.png');
    }
    


    return (
        <div className='container'>
            <div className='redline'>
                <div className='flogo'><img src='http://localhost:8070/images/includes/flogo.png'/></div>
                <div className='goTop' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <img src={imgSrc}/>
                </div>
            </div>

            <div className='fnews'>
                <div className='snsNews'>
                    <img src='http://localhost:8070/images/includes/youtube.png' />
                    <img src='http://localhost:8070/images/includes/kakao.png' />
                    <img src='http://localhost:8070/images/includes/facebook.png' />
                    <img src='http://localhost:8070/images/includes/twitter.png' />
                    <img src='http://localhost:8070/images/includes/kakaoch.png' />
                </div>
                <div className='myNintendo'>
                    <img src='http://localhost:8070/images/includes/mynintendo.png' />
                </div>
                <div className='famiibo'>
                    <img src='http://localhost:8070/images/includes/famiibo.png' />
                </div>

                
            </div>
            <div className='fcategory'>
                <div className='intro'>
                    <hr />
                    <div className='title'>한국닌텐도</div>
                    <div className='sub'>- 회사개요</div>
                    <div className='sub'>- 찾아오시는 길</div>
                </div>
                <div className='hardware'>
                    <hr />
                    <div className='title'>본체/amiibo</div>
                    <div className='sub'>- Nintendo Switch</div>
                    <div className='sub'>- amiibo</div>
                </div>
                <div className='software'>
                    <hr />
                    <div className='title'>소프트웨어</div>
                    <div className='sub'>- Nintendo Switch 소프트웨어</div>
                    <div className='sub'>- 소프트웨어 발매 스케줄</div>
                    <div className='sub'>- 스마트폰용 앱</div>
                </div>
                <div className='cutomer'>
                    <hr />
                    <div className='title'>고객지원</div>
                    <div className='sub'>- Nintendo Switch</div>
                    <div className='sub'>- Nintendo 3DS</div>
                    <div className='sub'>- 고객지원 홈페이지</div>
                </div>
            </div>

            <div className='copyRight'>
                <div className='copyContainer'>
                    <div className='seller'>
                        <Link style={{textDecoration: "none", color:"gray"}} to='/'>이용약관 &nbsp;</Link> |

                        <Link style={{fontWeight:"bold", textDecoration: "none", color:"black"}}to='/'>&nbsp; 개인정보처리방침</Link>

                        <br />

                        ⓒ 2006 Nintendo of Korea Co., Ltd. All Rights Reserved.

                        <br />

                        상호명 : 한국닌텐도주식회사 &nbsp;&nbsp;대표자명 : 미우라 타카히로 &nbsp;&nbsp;사업자등록번호 : 120-87-03578
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
