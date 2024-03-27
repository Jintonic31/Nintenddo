import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/admin/Adminproductlist.css'


function Adminproductlist() {

    const [productList, setProductList] = useState();
    const [paging, setPaging] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/admins/productList/1')
        // ㄴ 1 : 최초 호출시 현재페이지(page)는 1부터 시작
        .then((result)=>{
            setProductList(result.data.productlist);
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
        axios.get(`/api/admins/productList/${nextPage}`)
        .then((result) => {
            setProductList([...productList, ...result.data.productlist]); // 기존 데이터와 새로운 데이터를 합쳐서 업데이트
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

    function onProductView(pseq){
        axios.post('/api/admins/savepseq', null, {params:{pseq}})
        .then(()=>{ navigate('/modifyproduct') })
        .catch((err)=>{console.error(err)})
    }

    

    return (
        <div className='Cnt'>

            <Heading />

            <div className='adminpdtlistWrap'>
                <div className='apdtlabel'>
                    <div className='redbar'>&nbsp;</div>
                    All Product
                </div>
                <div className='apdtTable'>
                    <div className='apdtTitle'>
                        <div className='apdtcol'>번호</div>
                        <div className='apdtcol'>상품명</div>
                        <div className='apdtcol'>원가</div>
                        <div className='apdtcol'>판매가</div>
                        <div className='apdtcol'>등록일</div>
                        <div className='apdtcol'>사용유무</div>
                    </div>
                    {
                        (productList)?(
                            productList.map((item, idx) => {
                                return(
                                    <div className='inapdtTitle'>
                                        <div className='inapdtcol'>{item.pseq}</div>
                                        <div className='inapdtcol' onClick={()=>{onProductView(item.pseq)}}>{item.pname}</div>
                                        <div className='inapdtcol'>{new Intl.NumberFormat('ko-KR').format(item.price2)}</div>
                                        <div className='inapdtcol'>{new Intl.NumberFormat('ko-KR').format(item.price1)}</div>
                                        <div className='inapdtcol'>{item.indate.substring(0,10)}</div>
                                        <div className='inapdtcol'>{item.useyn}</div>
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

export default Adminproductlist
