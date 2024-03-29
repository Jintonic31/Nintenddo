import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/News/mainnews.css'

function Mainnews() {

    const navigate = useNavigate();
    const [newsList, setNewsList] = useState();

    useEffect(()=>{
        axios.get('/api/news/getnewslist')
        .then((result)=>{
            setNewsList(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])

    function goNewsDetail(nseq){
        axios.get(`/api/news/savenseq/${nseq}`);
        navigate('/newsdetail')
    }

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
                                    <div className='nlistImage' onClick={()=>{goNewsDetail(news.nseq)}}>
                                        <img src={`http://localhost:8070/images/news/${news.image1}`} />
                                    </div>

                                    <div className='nlisttitle' onClick={()=>{goNewsDetail(news.nseq)}}>{news.title}</div>

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
