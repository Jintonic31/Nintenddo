import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/admin/ModifyOrder.css'

function Modifyorder() {

    const navigate = useNavigate();
    const adminUser = useSelector(state => state.admins)
    
    useEffect(()=>{
        if(adminUser.adminid === ''){
            alert('접근권한 없음. 메인페이지로 이동합니다.')
            navigate('/')
        }
    },[])

    const [oneorder, setOneorder] = useState([]);

    useEffect(()=>{
        axios.get('/api/orders/getOrderdone')
        .then((result)=>{
            setOneorder(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])

    const [oseq, setOseq] = useState();
    const [odseq, setOdseq] = useState();
    const [oname, setOname] = useState();
    const [indate, setIndate] = useState();
    const [eamil, setEmail] = useState();
    const [ophone, setOphone] = useState();
    const [image, setImage] = useState();
    const [pname, setPname] = useState();
    const [quantity, setQuantity] = useState();
    const [price1, setPrice1] = useState();
    const [oadd1, setOadd1] = useState();
    const [oadd2, setOadd2] = useState();
    const [result, setResult] = useState();


    function formatDate(utc){
        const date = new Date(utc);
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    function onResult(result){
        if(result === '1'){return '결제완료'}
        if(result === '2'){return '배송중'}
        if(result === '3'){return '배송완료'}
        if(result === '4'){return '구매확정'}
    }
    
    

    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifyoWrap'>

                <div className='ingtitle2'>
                    <div>&nbsp;</div>
                        완료된 주문
                    </div>
                    <div className='inglist'>
                        <div className='inglistsub'>
                            <div className='subno'>NO.</div>
                            <div className='subimg'>&nbsp;</div>
                            <div className='subpname'>상품명</div>
                            <div className='subindate'>주문일자</div>
                            <div className='subprice'>결제금액</div>
                            <div className='subresult'>처리상태</div>
                        </div>
                        
                        {
                            (!oneorder || oneorder.length === 0)?(<h3>완료된 주문이 없습니다.</h3>):(
                                
                                oneorder.map((odone, idx)=>{
                                    return(
                                        <div className='oneinglist'>

                                            <div className='oneno'>
                                                {odone.oseq}
                                            </div>

                                            <div className='oneimg'>
                                                <img src={`http://localhost:8070/images/product/productdetail/${odone.image}`} alt='' />
                                            </div>

                                            <div className='onepname'>
                                                {odone.pname}
                                            </div>

                                            <div className='oneindate'>{formatDate(odone.indate)}</div>

                                            <div className='oneprice'>
                                                ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(odone.price1)}
                                            </div>

                                            <div className='oneresult'>
                                                {onResult(odone.result)}
                                            </div>

                                        </div>
                                    )
                                })
                            )
                        }


                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Modifyorder
