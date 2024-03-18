import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/Product/software.css'

function Software() {

    const [softList, setSoftList] = useState([]);
    const [unreleaseList, setUnreleaseList] = useState([])
    const [keyword, setKeyword] = useState();

    useEffect(()=>{
        axios.post('/api/products/getsoftlist', null, {params:{pcseq:2}})
        .then((result)=>{
            setSoftList(result.data)
        })
        .catch((err)=>{console.error(err)})

        axios.post('/api/products/getunreleaselist', null, {params:{pcseq:2}})
        .then((result)=>{
            setUnreleaseList(result.data);
        })
        .catch((err)=>{console.error(err)})
    },[])

    return (


        <div className='Cnt'>

            <Heading />

            <div className='softBanner'>
                    {
                        (softList)?(
                            softList.slice(0,8).map((soft, idx)=>{
                                return(
                                    <div className='softBannerImg'>
                                        <img src={`http://localhost:8070/images/product/software/${soft.image}`} />
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>

                <div className='searchSoft'>
                    <input type='text' placeholder='키워드를 입력해주세요' value={keyword}/>
                    <img src='http://localhost:8070/images/product/software/gosearch.png' />
                </div>


            <div className='softwareCnt'>

                
                <div className='softwareTitle'>
                    <div className='titleKr'>최신 소프트웨어</div>
                    <div className='titleEn'>Released</div>
                </div>

                <div className='softwareContent'>
                    {
                        (softList)?(
                            softList.map((soft, idx)=>{
                                return(
                                    <div className='softwareList'>
                                        <div className='softlistImage'>
                                            <img src={`http://localhost:8070/images/product/software/${soft.image}`} />
                                        </div>
                                        
                                        <div className='softlisthardware'>
                                            Nintendo Switch
                                        </div>
                                        <div className='softlisttitle'>{soft.pname}</div>

                                        <div className='softindate'>
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
                
                

                <div className='softwareTitle'>
                    <div className='titleKr'>발매예정 소프트웨어</div>
                    <div className='titleEn'>Comming Soon</div>
                </div>

                <div className='softwareContent'>
                    {
                        (unreleaseList)?(
                            unreleaseList.map((soft, idx)=>{
                                return(
                                    <div className='softwareList'>
                                        <div className='softlistImage'>
                                            <img src={`http://localhost:8070/images/product/software/${soft.image}`} />
                                        </div>
                                        
                                        <div className='softlisthardware'>
                                            Nintendo Switch
                                        </div>
                                        <div className='softlisttitle'>{soft.pname}</div>

                                        <div className='softindate'>
                                            소프트웨어<br />
                                            발매예정일 : {soft.indate.substring(0,10)}
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

            <Footing />



        </div>
    )
}

export default Software
