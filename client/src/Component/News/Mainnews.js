import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/News/mainnews.css'

function Mainnews() {

    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [displayNum, setDisplayNum] = useState(8);

    useEffect(() => {
        axios.get('/api/news/getnewslist')
            .then((result) => {
                setNewsList(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])

    function goNewsDetail(nseq) {
        axios.get(`/api/news/savenseq/${nseq}`);
        navigate('/newsdetail')
    }

    const handleShowMore = () => {
        setDisplayNum(displayNum + 4);
    }

    return (
        <div className='mainnewsCnt'>
            <div className='mainnewsTitle'>
                <div className='titleKr'>새롭게 알려드립니다.</div>
                <div className='titleEn'>News & Update</div>
            </div>

            <div className='mainnewsContent'>
                {
                    (newsList) ? (
                        newsList
                            .slice(0, displayNum)
                            .map((news, idx) => {
                                return (
                                    <div className='newsList'>
                                        <div className='nlistImage' onClick={() => { goNewsDetail(news.nseq) }}>
                                            <img src={process.env.REACT_APP_IMG_SRC + 'news/' + news.image1} />
                                        </div>

                                        <div className='nlisttitle' onClick={() => { goNewsDetail(news.nseq) }}>{news.title}</div>

                                        <div className='nlistIndate'>
                                            뉴스<br />
                                            {news.indate.substring(0, 10)}
                                        </div>
                                    </div>
                                )
                            })
                    ) : (null)
                }
            </div>

            {newsList.length > displayNum && (
                <div className='showmoreBtn'>
                    <button onClick={handleShowMore}>
                        <img src={process.env.REACT_APP_IMG_SRC + 'news/showmorebtn.png'} />
                        더보기
                    </button>
                </div>
            )}


        </div>
    )
}

export default Mainnews
