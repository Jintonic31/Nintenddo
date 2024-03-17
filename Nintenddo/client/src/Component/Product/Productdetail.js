import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../Style/Product/productdetail.css'


function Productdetail(props) {

    const pseq = props.pseq;
    const [oneproduct, setOneProduct] = useState([]);
    const closeModal = props.closeModal; // closeModal props로 받기

    useEffect(()=>{
        axios.post(`/api/products/getoneproduct/${pseq}`)
        .then((result)=>{
            setOneProduct(result.data.product);
        })
        .catch((err)=>{console.error(err)})
    },[])

    function formatDate(utc){
        const date = new Date(utc);
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }


    return (

        <div className='pdetailcnt'>
            <div className='pdetailcloseBtn'>
                <img src='http://localhost:8070/images/product/hardware/closebtn.png' onClick={closeModal}/>
            </div>

            <div className='detailWrap'>
                <div className='detailimg'>
                    <img src={`http://localhost:8070/images/product/hardware/${oneproduct.image}`} alt='' />
                </div>

                <div className='detailtext'>
                    <div className='name'>{oneproduct.pname}</div>

                    <div className='subandinfo'>

                        <div className='onetextsub'>
                            <div>희망소비자가격</div>
                            <div>발매일</div>
                            <div>동봉품</div>
                        </div>

                        <div className='onetextinfo'>
                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(oneproduct.price1)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{formatDate(oneproduct.indate)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{oneproduct.includes}</div>
                        </div>
                        
                    </div> 

                    <div className='content'>{oneproduct.content}</div>

                    <button className='goOrderBtn'>바로 구매</button>
                    <button className='goCartBtn'>장바구니</button>
    



                </div>
                
            </div>
            
        </div>
    )
}

export default Productdetail
