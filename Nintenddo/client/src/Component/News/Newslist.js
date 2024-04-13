import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/News/newslist.css'

function Newslist() {

    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [keyword, setKeyword] = useState();
    const [displayNum, setDisplayNum] = useState(8);
    // ㄴ 최초 display되는 개수 : 8

    useEffect(() => {
        axios.get('/api/news/getnewslist')
            .then((result) => {
                setNewsList(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])

    function goNewsDetail(nseq) {
        axios.get(`/api/news/savenseq/${nseq}`)
        navigate('/newsdetail')
    }


    const handleKeywordChange = (e) => {
        setKeyword(e.target.value.toLowerCase());
        // ㄴ 검색어 소문자 변환 (title과 비교하기 위해)

        if (!e.target.value.trim()) {
            // ㄴ trim : 문자열 양 끝 공백 제거
            // ㄴ 양쪽 공백을 제거한 상태의 e.target.value 값이 공란(!)이면 keyword 초기화
            setKeyword('');
        }
    }

    const handleShowMore = () => {
        setDisplayNum(displayNum + 4);
        // 더보기 버튼 클릭시 4개씩 추가로 show
    }




    return (

        <div className='Cnt'>

            <Heading />

            <div className='nlistWrap'>
                <div className='nlistTitle'>
                    <div className='titleKr'>News 목록</div>
                    <div className='searchNews'>
                        <input type='search' placeholder='검색어 입력' value={keyword} onChange={handleKeywordChange} />
                    </div>
                </div>

                <div className='nlistContent'>
                    {
                        (newsList) ? (
                            newsList
                                .filter((news) => !keyword || news.title.toLowerCase().includes(keyword))
                                .slice(0, displayNum)
                                .map((news, idx) => {
                                    return (
                                        <div className='nList'>
                                            <div className='nListImage' onClick={() => { goNewsDetail(news.nseq) }}>
                                                <img src={process.env.REACT_APP_IMG_SRC + 'news/' + news.image1} />
                                            </div>

                                            <div className='nListtitle' onClick={() => { goNewsDetail(news.nseq) }}>{news.title}</div>

                                            <div className='nListIndate'>
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
                    // newsList의 수가 표시할 수보다 많을 때만(= 더 보여줄 뉴스가 남아있다면) 더보기 버튼 생성
                    <div className='showMoreBtn'>
                        <button onClick={handleShowMore}>
                            <img src={process.env.REACT_APP_IMG_SRC + 'news/' + 'showmorebtn.png'} />
                            더보기
                        </button>
                    </div>
                )}



            </div>

            <Footing />

        </div>

    )
}

export default Newslist
