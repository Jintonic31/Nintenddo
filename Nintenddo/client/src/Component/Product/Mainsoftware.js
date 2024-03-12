import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/product.css'

function Mainsoftware() {
    const [softList, setSoftList] = useState();

    useEffect(()=>{
        axios.get('/api/products/getsoftList')
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

            <div className='mainnewsContent'>
                {
                    (softList)?(
                        softList.map((soft, idx)=>{
                            return(
                                <div className='newsList'>
                                    <div className='nlistImage'>
                                        <img src={`http://localhost:8070/images/product/software/${soft.image}`} />
                                    </div>
                                    
                                    <div className='slisthardware'>
                                        Nintendo Switch
                                    </div>
                                    <div className='nlisttitle'>{soft.title}</div>

                                    <div className='nlistIndate'>
                                        뉴스<br />
                                        {soft.indate.substring(0,10)}
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
