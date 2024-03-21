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
    const [totalPrice, setTotalPrice] = useState([]);

    useEffect(()=>{

        if(loginUser.email === ''){
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

            <div className='completeorderWrap'>

                <div className='buyProcess3'>
                    <div className='process3'>장바구니</div>
                    <div className='process3' onClick={()=>{navigate('/writedelivery')}}>배송정보</div>
                    <div className='process3'>주문완료</div>
                </div>

                <div className='deliveryinfoWrap'>
                    <div className='dtitle'>주문 정보</div>
                    <div className='dcontent'>
                        <div className='dcontentsub'>
                            <div className='dsubname'>
                                <div>&nbsp;</div>
                                성함
                            </div>
                            <div className='dsubphone'>
                                <div>&nbsp;</div>
                                전화번호
                            </div>
                            <div className='dsubznum'>
                                <div>&nbsp;</div>
                                우편번호
                            </div>
                            <div className='dsubadd1'>
                                <div>&nbsp;</div>
                                주소
                            </div>
                            <div className='dsubadd2'>
                                <div>&nbsp;</div>
                                상세주소
                            </div>
                        </div>

                        <div className='dinfo'>
                            {
                                (!orderNow || orderNow.length === 0)?(<h4>주문자 정보가 존재하지 않습니다.</h4>):(
                                    orderNow.map((order, idx)=>{
                                        return(
                                            <div className='indinfo'>
                                                <div>{order[0].mname}</div>
                                                <div>{order[0].phone}</div>
                                                <div>{order[0].znum}</div>
                                                <div>{order[0].add1}</div>
                                                <div>{order[0].add2}</div>
                                            </div>
                                        )
                                    }) 
                                )
                            }                            
                        </div>


                        
                    </div>
                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Completeorder
