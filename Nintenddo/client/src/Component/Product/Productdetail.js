import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../Style/Product/productdetail.css'


function Productdetail(props) {

    const pseq = props.pseq;
    const [oneproduct, setOneProduct] = useState([]);

    useEffect(()=>{
        axios.get(`/api/products/getoneproduct/${pseq}`)
        .then((result)=>{
            setOneProduct(result.data.product);
        })
        .catch((err)=>{console.error(err)})
    },[])

    return (

        <div className='cnt'>
            <div className='closeBtn'></div>

            <div className='oneWrap'>
                <div className='oneimg'>
                    <img src={`http://localhost:8070/images/product/hardware/${oneproduct.image}`} alt='' />
                </div>

                <div className='onetext'>
                    <div className='name'>{oneproduct.pname}</div>

                    <div className='subandinfo'>

                        <div className='onetextsub'>
                            <div>희망소비자가격</div>
                            <div>발매일</div>
                            <div>동봉품</div>
                        </div>

                        <div className='onetextinfo'>
                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(oneproduct.price1)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{controlList[0].indate.substring(0,10)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{controlList[0].includes}</div>
                        </div>

                    </div>     



                </div>
                {oneproduct.pseq};
            </div>
            
        </div>
    )
}

export default Productdetail
