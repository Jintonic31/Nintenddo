import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/news.css'

function Mainnews() {

    const [newsList, setNewsList] = useState();

    useEffect(()=>{
        axios.get('/api/news/getnewslist')
        .then((result)=>{
            setNewsList(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])

    return (
        <div className='mainnewsCnt'>
           <div className='mainnewsTitle'>
                <div className='titleKr'>새롭게 알려드립니다.</div>
                <div className='titleEn'>News & Update</div>
            </div>

            <div className='mainnewsContent'>
                {
                    (newsList)?(
                        newsList.map((news, idx)=>{
                            return(
                                <div className='newsList'>
                                    <div className='nlistImage'>
                                        <img src={`http://localhost:8070/images/news/${news.image}`} />
                                    </div>

                                    <div className='nlisttitle'>{news.title}</div>

                                    <div className='nlistIndate'>
                                        뉴스<br />
                                        {news.indate.substring(0,10)}
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

export default Mainnews
