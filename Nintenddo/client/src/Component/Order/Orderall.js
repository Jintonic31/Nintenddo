import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Heading from '../Heading'
import Footing from '../Footing'
import '../../Style/Order/orderall.css'
import axios from 'axios'

function Orderall() {

    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    const [ordering, setOrdering] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{

        if(loginUser.email === ''){
            alert('로그인 후 이용가능합니다.')
            navigate('/loginpage')
            return;
        }else{
            axios.get('/api/orders/getOrdering')
            .then((result)=>{
                setOrdering(result.data.list);
                // console.log(ordering);
                // setTotalPrice(result.data.totalPrice);
            })
            .catch((err)=>{console.error(err)})
        }
        
    },[])

    return (
        <div className='Cnt'>

            <Heading />

            <div className='OrderallWrap'>

                <div className='ingWrap'>
                    <div className='ingtitle'>
                        <div>&nbsp;</div>
                        진행중인 주문 내역
                    </div>
                    <div className='inglist'>
                        <div className='inglistsub'>
                            <div className='subno'>NO.</div>
                            <div className='subimg'>&nbsp;</div>
                            <div className='subpname'>상품명</div>
                            <div className='subindate'>주문일자</div>
                            <div className='subprice'>결제금액</div>
                        </div>
                        
                        {
                            (!ordering || ordering.length === 0)?(<h3>현재 진행중인 주문이 없습니다.</h3>):(
                                
                                ordering.map((order, idx)=>{
                                    return(
                                        <div className='oneinglist'>

                                            <div className='oneno'>
                                                &nbsp;
                                            </div>

                                            <div className='oneimg'>
                                                <img src={`http://localhost:8070/images/product/productdetail/${order.image}`} alt='' />
                                            </div>

                                            <div className='onepname'>
                                                {order.pname}
                                            </div>

                                            <div className='oneindate'>
                                                {order.indate}
                                            </div>

                                            <div className='oneprice'>
                                                ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(order.price1)}
                                            </div>

                                        </div>
                                    )
                                })
                            )
                        }


                    </div>

                </div>
            

                

                <div className='moveonBtn'>
                    <button onClick={()=>{navigate('/')}}>메인으로</button>
                    <button onClick={()=>{navigate('/orderall')}}>마이 오더</button>
                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Orderall
