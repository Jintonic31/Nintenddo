import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/News/newsdetail.css'

function Newsdetail() {

    const navigate = useNavigate();
    const [onenews, setOnenews] = useState({});

    useEffect(() => {
        axios.get('/api/news/getonenews')
            .then((result) => { setOnenews(result.data.news) })
            .catch((err) => { console.error(err) })
    }, [])

    function formatDate(utc) {
        const date = new Date(utc);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className='Cnt'>

            <Heading />

            <div className='newsdetailWrap'>

                <div className='newsTop'>
                    <div className='newsDate'>
                        {formatDate(onenews.indate)}
                        <span>뉴스</span>
                    </div>
                    <div className='newsTitle'>{onenews.title}</div>
                </div>

                <div className='newsBody'>
                    <div className='innewsImg'>
                        <img src={process.env.REACT_APP_IMG_SRC + 'news/' + onenews.image1} alt='' />
                    </div>
                    <div className='innewsText'>
                        {onenews.content1}
                    </div>
                    <div className='innewsImg'>
                        <img src={process.env.REACT_APP_IMG_SRC + 'news/' + onenews.image2} alt='' />
                    </div>
                    <div className='innewsText'>
                        {onenews.content2}
                    </div>
                    <div className='innewsImg'>
                        <img src={process.env.REACT_APP_IMG_SRC + 'news/' + onenews.image3} alt='' />
                    </div>
                    <div className='innewsText'>
                        {onenews.content3}
                    </div>
                </div>

                <div className='backtolist'>
                    <button onClick={() => { navigate('/newslist') }}>목록으로</button>
                </div>

            </div>

            <Footing />

        </div>
    )
}

export default Newsdetail
