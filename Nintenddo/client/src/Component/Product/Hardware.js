import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/Product/hardware.css'
import { Link, useNavigate } from 'react-router-dom'



function Hardware() {

    const navigate = useNavigate();

    const [hardList, setHardList] = useState();
    const [modeList, setModeList] = useState();
    const softwareBanners = [
        'http://localhost:8070/images/banner/software/movebanner (1).png',
        'http://localhost:8070/images/banner/software/movebanner (2).png',
        'http://localhost:8070/images/banner/software/movebanner (3).png',
        'http://localhost:8070/images/banner/software/movebanner (4).png',
        'http://localhost:8070/images/banner/software/movebanner (5).png',
        'http://localhost:8070/images/banner/software/movebanner (6).png',
        'http://localhost:8070/images/banner/software/movebanner (7).png'
    ]
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(()=>{
        axios.get('/api/products/gethardlist')
        .then((result)=>{
            setHardList(result.data);
        })
        .catch((err)=>{console.error(err)})

        axios.get('/api/products/getmodelist')
        .then((result)=>{
            setModeList(result.data);
        })
        .catch((err)=>{console.error(err)})


    },[])


    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIdx(prevIdx => (prevIdx + 1) % softwareBanners.length);
        }, 5000); // 5초마다 이미지 변경
    
        return () => clearInterval(interval);
      }, [softwareBanners.length]);


    return (

        <div className='cnt'>

            <Heading />

            <div className='hardwareWrap'>

                <div className='hardwareHeader'>
                    <div>Nintendo Switch 패밀리</div>
                    <div>기능 · 특징을 비교</div>
                </div>

                <div className='hardwareCheck'>
                    <div>&nbsp;&nbsp;</div>
                    <div>비교 본체</div>

                    <div>
                        <div>&nbsp;</div>
                        Nintendo Switch OLED 모델
                    </div>
                    <div>
                        <div>&nbsp;</div>
                        Nintendo Switch
                    </div>
                    <div>
                        <div>&nbsp;</div>
                        Nintendo Switch Lite
                    </div>
                </div>

                <div className='hardwareImg'>
                    {
                        (hardList)?(
                            hardList.map((hard, idx)=>{
                                return(
                                    <div className='hardwareImgone'>
                                        <img src={`http://localhost:8070/images/product/hardware/${hard.image}`} alt=""/>
                                        <span className='hardOnename'>{hard.pname}</span>
                                        <span className='hardOneprice'><span>희망소비자가격 :</span>
                                        {new Intl.NumberFormat('ko-KR').format(hard.price1)}</span>

                                        <button className='goOrderBtn'>바로 구매</button>
                                        <button className='goCartBtn'>장바구니</button>

                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>

                <div className='ableMode'>
                    <div className='ableModeLabel'>
                        <div>&nbsp;</div>플레이 모드
                    </div>

                    <div className='ableModeImg'>
                        {
                            (modeList)?(
                                modeList.map((mode, idx)=>{
                                    return(
                                        <div className='ableModeKind'>
                                            <div className='tvmode'>
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.tvmode}`} alt=""/>
                                                <img src='http://localhost:8070/images/product/hardware/tvmodetext.png' alt=""/>

                                            </div>
                                            <div className='tabletmode'>
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.tabletmode}`} alt=""/>
                                                <img src='http://localhost:8070/images/product/hardware/tabletmodetext.png' alt=""/>
                                            </div>
                                            <div className='handmode'>
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.handmode}`} alt=""/>
                                                <img src='http://localhost:8070/images/product/hardware/handmodetext.png' alt=""/>
                                            </div>
                                        </div>
                                        
                                    )
                                })
                            ):(null)
                        }
                    </div>
                </div>


                <div className='ableSoftware'>

                    <div className='ableModeLabel'>
                        <div>&nbsp;</div>즐길 수 있는 소프트웨어
                    </div>

                    <div className='ableSoftImg'>
                        <img src='http://localhost:8070/images/product/hardware/yessoft.png' alt=""/>
                        <img src='http://localhost:8070/images/product/hardware/yessoft.png' alt=""/>
                        <img src='http://localhost:8070/images/product/hardware/nosoft.png' alt=""/>
                    </div>

                </div>

                <div className='ableJoycon'>
                    
                    <div className='ableModeLabel'>
                        <div>&nbsp;</div>
                        <Link to={'/controller'}>
                            Joy-Con (컨트롤러)&nbsp;&nbsp;
                            <img src='http://localhost:8070/images/product/hardware/golinkicon.png' alt=""/>
                        </Link>
                    </div>

                    <div className='ableJoyconImg'>
                        <img src='http://localhost:8070/images/product/hardware/yesjoycon.png' alt=""/>
                        <img src='http://localhost:8070/images/product/hardware/yesjoycon.png' alt=""/>
                        <img src='http://localhost:8070/images/product/hardware/nojoycon.png' alt=""/>
                    </div>

                </div>


                <div className='aboutlite'>
                    <div className='title'>
                        Nintendo Switch Lite의 게임 플레이에 대하여
                    </div>
                    <div className='intro'>
                        Nintendo Switch Lite는 휴대 모드에 대응하는 모든 Nintendo Switch 소프트웨어를 즐길 수 있습니다만, 아래와 같은 조건이 있습니다.
                    </div>
                    <div className='info'>
                        <div className='redbar'>&nbsp;</div>
                        <div>
                            Nintendo Switch Lite는 단독일 경우, 「휴대 모드」에 대응하는 소프트웨어라 하더라도, Joy-Con 기능(HD 진동, 모션 IR 카메라, Joy-Con에 내장된 모션 센서)을 이용하는 소프트웨어는 Joy-Con을 가지고 있지 않은 경우, 플레이 방법에 제한이 있습니다.
                        </div>
                    </div>
                    <div className='info'>
                        <div className='redbar'>&nbsp;</div>
                        <div>
                            「휴대 모드」에 대응하지 않는 소프트웨어라 하더라도 「 Joy-Con」과 「 Joy-Con 충전 그립」을 구매하시면, 플레이 할 수 있는 소프트웨어도 있습니다.
                        </div>
                    </div>
                </div>

            </div>

            <div className='softwareBanner' onClick={()=>{navigate('/software')}}>
                <div className='title'>
                    <div>Software</div>
                    <div>Nintendo Switch 소프트웨어</div>
                </div>

                <div className='imgcnt'>
                <div className='imgone-container'>
                    {
                        softwareBanners.map((img, idx) => (
                        <div key={idx} className={`imgone ${idx === currentIdx ? 'active' : ''}`}>
                        <img src={img} alt='' />
                        </div>
                        ))
                    }
                    </div> 
                </div>

            </div>

            <Footing />
            
        </div>
    )
}

export default Hardware
