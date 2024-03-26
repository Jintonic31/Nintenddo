import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import axios from 'axios'
import '../../Style/admin/Modifyproduct.css'


function Modifyproduct() {


    useEffect(()=>{
        axios.get('/api/admins/productList/1')
        // ㄴ 1 : 최초 호출시 현재페이지(page)는 1부터 시작
    }, [])

    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifypdtWrap'>
                
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
