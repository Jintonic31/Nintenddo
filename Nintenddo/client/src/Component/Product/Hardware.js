import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/hardware.css'



function Hardware() {

    const [hardList, setHardList] = useState();
    const [modeList, setModeList] = useState();

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
                                        <img src={`http://localhost:8070/images/product/hardware/${hard.image}`} />
                                        <span className='hardOnename'>{hard.pname}</span>
                                        <span className='hardOneprice'><span>희망소비자가격 :</span>
                                        {new Intl.NumberFormat('ko-KR').format(hard.price1)}</span>
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
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.tvmode}`} />
                                                <img src='http://localhost:8070/images/product/hardware/tvmodetext.png' />

                                            </div>
                                            <div className='tabletmode'>
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.tabletmode}`} />
                                                <img src='http://localhost:8070/images/product/hardware/tabletmodetext.png' />
                                            </div>
                                            <div className='handmode'>
                                                <img src={`http://localhost:8070/images/product/hardware/${mode.handmode}`} />
                                                <img src='http://localhost:8070/images/product/hardware/handmodetext.png' />
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
                        <img src='http://localhost:8070/images/product/hardware/yessoft.png' />
                        <img src='http://localhost:8070/images/product/hardware/yessoft.png' />
                        <img src='http://localhost:8070/images/product/hardware/nosoft.png' />
                    </div>

                </div>

                <div className='ableSoftware'>

                    <div className='ableModeLabel'>
                        <div>&nbsp;</div>Joy-Con (컨트롤러)&nbsp;
                        <img src='http://localhost:8070/images/product/hardware/golinkicon.png' />
                    </div>

                    <div className='ableJoyconImg'>
                        <img src='http://localhost:8070/images/product/hardware/yesjoycon.png' />
                        <img src='http://localhost:8070/images/product/hardware/yesjoycon.png' />
                        <img src='http://localhost:8070/images/product/hardware/nojoycon.png' />
                    </div>

                </div>

            </div>

            <Footing />
            
        </div>
    )
}

export default Hardware
