import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/admin/Adminnewslist.css'

function Adminnewslist() {

    const [newsList, setNewsList] = useState();
    const [paging, setPaging] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/admins/newsList/1')
        // ㄴ 1 : 최초 호출시 현재페이지(page)는 1부터 시작
        .then((result)=>{
            setNewsList(result.data.newslist);
            setPaging(result.data.paging);
        })
        .catch((err)=>{console.error(err)})
    }, [])


    // 무한 스크롤을 위한 useEffect
    useEffect(
        ()=>{
           window.addEventListener("scroll", handleScroll);
            // scroll이라는 이벤트가 일어나면 handlerScroll을 호출하라
           return ()=>{   window.removeEventListener("scroll", handleScroll);   }
        }
    )

    function onPageMove(nextPage) {
        axios.get(`/api/admins/newsList/${nextPage}`)
        .then((result) => {
            setNewsList([...newsList, ...result.data.newslist]); // 기존 데이터와 새로운 데이터를 합쳐서 업데이트
            setPaging(result.data.paging);
        }) 
        .catch((err) => { console.error(err) })
    }


    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight; 
        if (scrollTop + clientHeight >= scrollHeight) {
            onPageMove(paging.page + 1); // 다음 페이지의 번호 전달
        }
    }

    function onNewsView(nseq){
        axios.post('/api/admins/savenseq', null, {params:{nseq}})
        .then(()=>{ navigate('/modifynews') })
        .catch((err)=>{console.error(err)})
    }

    const [imgSrc, setImgSrc] = useState({
        1: "http://localhost:8070/images/admin/controllernav1.png",
        3: "http://localhost:8070/images/admin/controllernav3.png",
        5: "http://localhost:8070/images/admin/controllernav5.png"
    })

    const navItems = [
        { id:1, text:"Members", linkto:'' },
        { id:3, text:"Products", linkto:'/adminproductlist' },
        { id:5, text:"News", linkto:'/adminnewslist' },
    ];

    const handleMouseOver = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/admin/controllernav${id + 1}.png` });
    }

    const handleMouseOut = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/admin/controllernav${id}.png` });
    }
  return (
    <div className='Cnt'>

            <Heading />


            <div className='admincontrollerNav'>
                {
                    navItems.map(({id, text, linkto})=>(
                        <div className={'adminnav'} id={`id${id}`} key={id}>
                            <div
                            key={id}
                            onMouseOver={()=>{handleMouseOver(id);}}
                            onMouseOut={()=>{handleMouseOut(id)}}
                            onClick={()=>{navigate(linkto)}}>
                                <img src={imgSrc[id]} alt='' />&nbsp;&nbsp;
                                {text}
                            </div>
                        </div>
                    ))
                }
            </div>

            

            <div className='adminlistWrap'>
                <div className='anlabel'>
                    <div className='redbar'>&nbsp;</div>
                    All News
                </div>
                <div className='anTable'>
                    <div className='anTitle'>
                        <div className='ancol'>번호</div>
                        <div className='ancol'>제목</div>
                        <div className='ancol'>날짜</div>
                    </div>
                    {
                        (newsList)?(
                            newsList.map((item, idx) => {
                                return(
                                    <div className='innTitle'>
                                        <div className='inncol'>{item.nseq}</div>
                                        <div className='inncol' onClick={()=>{onNewsView(item.nseq)}}>{item.title.substring(0,50) + ' ··· '}</div>
                                        <div className='inncol'>{item.indate.substring(0,10)}</div>
                                    
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>

                <div className='apdtBtns'>
                    <button onClick={()=>{navigate('/insertnews')}}>글쓰기</button>
                </div>
                
            </div>

            <Footing />
        
        </div>
  )
}

export default Adminnewslist
