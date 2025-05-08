import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Heading from '../Heading'
import Footing from '../Footing'
import '../../Style/Order/completeorder.css'
import axios from 'axios'

function Completeorder() {

    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    const [orderNow, setOrderNow] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{

        if(loginUser.email === ''){
            alert('로그인 후 이용가능합니다.')
            navigate('/loginpage')
            return;
        }else{
            axios.get('/api/orders/getordernow')
            .then((result)=>{
                setOrderNow(result.data.list);
                console.log(orderNow);
                setTotalPrice(result.data.totalPrice);
            })
            .catch((err)=>{console.error(err)})
        }
        
    },[])

    return (
        <div className='Cnt'>

            <Heading />

            <div className='completeorderWrap'>

                <div className='buyProcess3'>
                    <div className='process3'>장바구니</div>
                    <div className='process3'>배송정보</div>
                    <div className='process3'>주문완료</div>
                </div>

                <div className='cdeliveryinfoWrap'>
                    <div className='cdtitle'>
                        <div>&nbsp;</div>
                        주문자 정보
                    </div>
                    <div className='cdcontent'>
                        <div className='cdcontentsub'>
                            <div className='cdsubname'>
                                <div>&nbsp;</div>
                                성함
                            </div>
                            <div className='cdsubphone'>
                                <div>&nbsp;</div>
                                전화번호
                            </div>
                            <div className='cdsubznum'>
                                <div>&nbsp;</div>
                                우편번호
                            </div>
                            <div className='cdsubadd1'>
                                <div>&nbsp;</div>
                                주소
                            </div>
                            <div className='cdsubadd2'>
                                <div>&nbsp;</div>
                                상세주소
                            </div>
                        </div>

                        <div className='cdinfo'>
                            {
                                (!orderNow || orderNow.length === 0)?(<h4>주문자 정보가 존재하지 않습니다.</h4>):(
                                    
                                    <div className='incdinfo'>
                                        <div>{orderNow[0].oname}</div>
                                        <div>{orderNow[0].ophone}</div>
                                        <div>{orderNow[0].oznum}</div>
                                        <div>{orderNow[0].oadd1}</div>
                                        <div>{orderNow[0].oadd2}</div>
                                    </div>
                                )
                            }                           
                        </div> 
                    </div>
                </div>


                <div className='cdtitle2'>
                    <div>&nbsp;</div>
                    상품 정보
                </div>
                <div className='cdorderlist'>
                    <div className='onecdlistsub'>
                        <div className='subchk'>&nbsp;</div>
                        <div className='subimg'>&nbsp;</div>
                        <div className='subpname'>상품명</div>
                        <div className='subquantity'>수량</div>
                        <div className='subprice'>가격</div>
                    </div>
                    
                    {
                        (!orderNow || orderNow.length === 0)?(<h3>주문 내역이 없습니다.</h3>):(
                            
                            orderNow.map((order, idx)=>{
                                return(
                                    <div className='onecdlist'>

                                        <div className='onechk'>
                                           &nbsp;
                                        </div>

                                        <div className='oneimg'>
                                            <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+order.image} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {order.pname}
                                        </div>

                                        <div className='onequantity'>                       {order.quantity}
                                        </div>

                                        <div className='oneprice'>
                                        ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(order.price1)}
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                    <div className='cdlistEndrow'>
                        <div>총 &nbsp;{new Intl.NumberFormat('ko-KR').format(totalPrice)}&nbsp;원</div>
                    </div>

                    <div className='moveonBtn'>
                        <button onClick={()=>{navigate('/')}}>메인으로</button>
                        <button onClick={()=>{navigate('/orderall')}}>마이 오더</button>
                    </div>

                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Completeorder
