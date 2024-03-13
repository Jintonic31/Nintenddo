import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/mainsoftware.css'

function Mainsoftware() {
    const [softList, setSoftList] = useState();

    useEffect(()=>{
        axios.post('/api/products/getsoftlist', null, {params:{pcseq:2}})
        .then((result)=>{
            setSoftList(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])

    return (
        <div className='mainnewsCnt'>
           <div className='mainnewsTitle'>
                <div className='titleKr'>주요 소프트웨어</div>
                <div className='titleEn'>PickUp</div>
            </div>

            <div className='mainsoftContent'>
                {
                    (softList)?(
                        softList.map((soft, idx)=>{
                            return(
                                <div className='softList'>
                                    <div className='slistImage'>
                                        <img src={`http://localhost:8070/images/product/software/${soft.image}`} />
                                    </div>
                                    
                                    <div className='slisthardware'>
                                        Nintendo Switch
                                    </div>
                                    <div className='slisttitle'>{soft.pname}</div>

                                    <div className='sindate'>
                                        소프트웨어<br />
                                        발매일 : {soft.indate.substring(0,10)}
                                    </div>
                                </div>
                            )
                        })
                    ):(null)
                }
            </div>

            <div className='showmoreBtn'>
                <button>
                    <img src='http://localhost:8070/images/news/showmorebtn.png' />
                    더보기
                </button>
            </div>
           
        </div>
    )
}

export default Mainsoftware
