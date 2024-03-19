import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Heading from '../Heading'
import Footing from '../Footing'
import '../../Style/Cart/cartlist.css'
import axios from 'axios'


function Cartlist() {

    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    const [cartlist, setCartlist] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        if(loginUser.email == ''){
            alert('로그인 후 이용가능합니다.')
            navigate('/loginpage')
            return;
        }else{
            axios.get('/api/carts/getcartlist', {email:loginUser})
            .then((result)=>{
                setCartlist(result.data.cartList);
                setTotalPrice(result.data.totalPrice);
            })
            .catch((err)=>{console.error(err)})
        }
    }, [])

    // 체크된 체크박스 내용 유지용 배열
    let checklist = [];

    function onCheck(cseq, checkyn){
        if(checkyn){
        // checkyn이 true라면(checked 상태라면)
            checklist.push(cseq);
            // 매개변수로 받은 cseq를 checklist 배열에 추가
        }else{
        // checkyn이 false라면(unchecked 상태라면)
            checklist = checklist.filter((value, idx, err) => {
            // #2 return 받은 value값들을 변수에 하나씩 넣어 새로운 배열 생성(filter())
                return value != cseq;
                // #1 value에 unchecked 된 cseq와 같지 않은 값만 return
            })
        }
        console.log(checklist);
    }



    return (
        <div className='Cnt'>

            <Heading />

            <div className='cartlistWrap'>
                
                <div className='buyProcess'>
                    <div className='process'>장바구니</div>
                    <div className='process'>배송정보</div>
                    <div className='process'>결제</div>
                    <div className='process'>주문완료</div>
                </div>

                <div className='clist'>
                    {
                        (cartlist)?(
                            cartlist.map((cart, idx)=>{
                                return(
                                    <div className='oneclist'>

                                        <div className='onechk'>
                                            <input type='checkbox' id={'ch'+idx} value={cart.cseq} onChange={(e)=>{
                                                onCheck(e.currentTarget.value, e.currentTarget.checked)
                                            }} />
                                        </div>

                                        <div className='oneimg'>
                                            <img src={`http://localhost:8070/images/product/productdetail/${cart.image}.png`} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {cart.pname}
                                        </div>

                                        <div className='onequantity'>
                                            <button>-</button>
                                            {cart.quantity}
                                            <button>+</button>
                                        </div>

                                        <div className='oneprice'>
                                            {cart.price1}
                                        </div>


                                    </div>
                                )
                            })
                        ):(<h3>장바구니가 비어있습니다.</h3>)
                    }
                    <div className='clistEndrow'>
                        {totalPrice}
                    </div>
                </div>

            </div>

            <Footing />

        </div>
    )
}

export default Cartlist
