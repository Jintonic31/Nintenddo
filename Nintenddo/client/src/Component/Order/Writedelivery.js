import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Heading from '../Heading'
import Footing from '../Footing'
import '../../Style/Order/writedelivery.css'
import axios from 'axios'

function Writedelivery() {

    const navigate = useNavigate();
    const loginUser = useSelector(state=>state.user);

    const [orderNow, setOrderNow] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

    useEffect(()=>{

        if(loginUser.email == ''){
            alert('로그인 후 이용가능합니다.')
            navigate('/loginpage')
            return;
        }else{
            axios.get('/api/orders/getordernow')
            .then((result)=>{
                setOrderNow(result.data.list);
                setTotalPrice(result.data.totalPrice);
            })
            .catch((err)=>{console.error(err)})
        }
        
    },[])

    return (
        <div className='Cnt'>

            <Heading />

            <div className='wirtedeliveryWrap'>

                <div className='buyProcess2'>
                    <div className='process2'>장바구니</div>
                    <div className='process2'>배송정보</div>
                    <div className='process2'>결제</div>
                    <div className='process2'>주문완료</div>
                </div>

                <div className='noworderlist'>
                    <div className='onenolistsub'>
                        <div className='subchk'>&nbsp;</div>
                        <div className='subimg'>&nbsp;</div>
                        <div className='subpname'>상품명</div>
                        <div className='subquantity'>수량</div>
                        <div className='subprice'>가격</div>
                    </div>
                    
                    {
                        (!orderNow || orderNow.length === 0)?(<h3>주문 내역이 없습니다</h3>):(
                            
                            orderNow.map((order, idx)=>{
                                return(
                                    <div className='onenolist'>

                                        <div className='onechk'>
                                            &nbsp;
                                        </div>

                                        <div className='oneimg'>
                                            <img src={`http://localhost:8070/images/product/productdetail/${order.image}`} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {order.pname}
                                        </div>

                                        <div className='onequantity'>
                                            {order.quantity}
                                        </div>

                                        <div className='oneprice'>
                                        ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(order.price1)}
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                    <div className='nolistEndrow'>
                        <div>총 &nbsp;{new Intl.NumberFormat('ko-KR').format(totalPrice)}&nbsp;원</div>
                    </div>

                    <div className='downlonotion'>
                        <span>· 구매하신 닌텐도 어카운트로 [지금 다운로드]를 클릭하면 해당 콘텐츠가 다운로드됩니다.</span>
                        <span>· 다운로드 번호로는 전송되지 않으며, [지금 다운로드] 후에는 환불이 불가능합니다.</span>
                    </div>

                    <div className='moveonBtn'>
                        <button onClick={()=>{navigate('/')}}>메인으로</button>
                        <button onClick={()=>{onsubmit()}}>계속</button>
                    </div>
                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Writedelivery
