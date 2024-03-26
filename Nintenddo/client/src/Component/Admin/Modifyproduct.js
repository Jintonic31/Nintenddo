import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import axios from 'axios'
import '../../Style/admin/Modifyproduct.css'


function Modifyproduct() {

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

    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifypdtWrap'>
                <div className='modifyTable'>
                    <div className='modifyTitle'>
                        <div className='modifycol'>번호</div>
                        <div className='modifycol'>상품명</div>
                        <div className='modifycol'>원가</div>
                        <div className='modifycol'>판매가</div>
                        <div className='modifycol'>등록일</div>
                        <div className='modifycol'>사용유무</div>
                    </div>
                    {
                        (productList)?(
                            productList.map((item, idx) => {
                                return(
                                    <div className='modifyTitle'>
                                        <div className='modifycol'>{item.pseq}</div>
                                        <div className='modifycol'>{item.pname}</div>
                                        <div className='modifycol'>{new Intl.NumberFormat('ko-KR').format(item.price2)}</div>
                                        <div className='modifycol'>{new Intl.NumberFormat('ko-KR').format(item.price1)}</div>
                                        <div className='modifycol'>{item.indate.substring(0,10)}</div>
                                        <div className='modifycol'>{item.useyn}</div>
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>
                
            1. subMenu
            2. useyn을 N으로 바꾼다
            2. 새프로덕트를 insert한다
            4. 상품의 playmode를 지정한다.
            </div>

            <Footing />
        
        </div>
    )
}

export default Modifyproduct
