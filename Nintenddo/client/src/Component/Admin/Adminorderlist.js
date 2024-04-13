import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import { useSelector } from 'react-redux';

import '../../Style/admin/Adminproductlist.css'

function Adminorderlist() {

    const adminUser = useSelector(state => state.admins)

    useEffect(()=>{
        if(adminUser.adminid === ''){
            alert('접근권한 없음. 메인페이지로 이동합니다.')
            navigate('/')
        }
    },[])

    const [imgSrc, setImgSrc] = useState({
        1: `${process.env.REACT_APP_IMG_SRC}admin/controllernav1.png`,
        3: `${process.env.REACT_APP_IMG_SRC}admin/controllernav3.png`,
        5: `${process.env.REACT_APP_IMG_SRC}admin/controllernav5.png`,
        7: `${process.env.REACT_APP_IMG_SRC}admin/controllernav7.png`        
    })

    const navItems = [
        { id:1, text:"Members", linkto:'' },
        { id:3, text:"Products", linkto:'/adminproductlist' },
        { id:5, text:"News", linkto:'/adminnewslist' },
        { id:7, text:"Orders", linkto:'/adminorderlist' },
    ];

    const handleMouseOver = (id) => {
        setImgSrc({ ...imgSrc, [id]: `${process.env.REACT_APP_IMG_SRC}admin/controllernav${id + 1}.png` });
    }

    const handleMouseOut = (id) => {
        setImgSrc({ ...imgSrc, [id]: `${process.env.REACT_APP_IMG_SRC}admin/controllernav${id}.png` });
    }

    const [orderList, setOrderList] = useState([]);
    const [paging, setPaging] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/admins/orderList/1')
        // ㄴ 1 : 최초 호출시 현재페이지(page)는 1부터 시작
        .then((result)=>{
            setOrderList(result.data.orderlist);
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
        axios.get(`/api/admins/orderList/${nextPage}`)
        .then((result) => {
            setOrderList([...orderList, ...result.data.orderlist]); // 기존 데이터와 새로운 데이터를 합쳐서 업데이트
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

    function onOrderView(oseq){
        axios.post('/api/admins/saveoseq', null, {params:{oseq}})
        .then(()=>{ navigate('/modifyorder') })
        .catch((err)=>{console.error(err)})
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


                <div className='adminpdtlistWrap'>
                    <div className='apdtlabel'>
                        <div className='redbar'>&nbsp;</div>
                        All Order
                    </div>
                    <div className='apdtTable'>
                        <div className='apdtTitle'>
                            <div className='apdtcol'>번호</div>
                            <div className='apdtcol'>상품명</div>
                            <div className='apdtcol'>판매가</div>
                            <div className='apdtcol'>주문자</div>
                            <div className='apdtcol'>등록일</div>
                            <div className='apdtcol'>처리상태</div>
                        </div>
                        {
                            (orderList && orderList.length > 0)?(
                                orderList.map((item, idx) => {
                                    return(
                                        <div className='inapdtTitle'>
                                            <div className='inapdtcol'>{item.oseq}</div>
                                            <div className='inapdtcol' onClick={()=>{onOrderView(item.oseq)}}>{item.pname}</div>
                                            <div className='inapdtcol'>{new Intl.NumberFormat('ko-KR').format(item.price1)}</div>
                                            <div className='inapdtcol'>{item.email}</div>
                                            <div className='inapdtcol'>{item.indate.substring(0,10)}</div>
                                            <div className='inapdtcol'>{item.result}</div>
                                        </div>
                                    )
                                })
                            ):(null)
                        }
                    </div>
                    
                </div>

                <Footing />
            
            </div>
    )
}

export default Adminorderlist
