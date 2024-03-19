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
    const [changeqty, setChangeqty] = useState(1);


    useEffect(()=>{
        if(loginUser.email == ''){
            alert('로그인 후 이용가능합니다.')
            navigate('/loginpage')
            return;
        }else{
            axios.get('/api/carts/getcartlist')
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

    async function onDeleteCart(){
        if(checklist.length == 0){
            return alert('선택된 항목이 없습니다.')
        }

        // #1 선택된 리스트(checklist)를 하나씩 반복문을 돌면서 지우고
        for(let i=0; i<checklist.length; i++){
            await axios.delete(`/api/carts/deletecart/${checklist[i]}`);
        }

        // #2-1 서버에서 cartlist와 totalprice 다시 가져온다
        const result = await axios.get('/api/carts/getcartlist')
        setCartlist(result.data.cartList);
        setTotalPrice(result.data.totalPrice);

        checklist = [];
        if(result.data.cartList){
            // #2-2 다시 가져온 list의 checked 속성을 하나씩 해제한다
            for(let i=0; i<result.data.cartList.length; i++){
                document.getElementById('ch'+i).checked = false;
            }
        }
            
    }

    async function updateQty(cseq, qty, pseq, indate) {
        try {
            const updatedQty = cartlist.find(item => item.cseq === cseq).quantity + qty;
            if (updatedQty < 1) {
                return; // 최소 수량이 1입니다. 음수인 경우 업데이트하지 않습니다.
            }
    
            const result = await axios.post('/api/carts/updateqty', { cseq, pseq, quantity:updatedQty, indate, email:loginUser.email })
            setChangeqty(result.data.qty)
    
            
        } catch (err) {
            console.error(err);
        }
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
                    <div className='oneclistsub'>
                        <div className='subchk'>선택</div>
                        <div className='subimg'>&nbsp;</div>
                        <div className='subpname'>상품명</div>
                        <div className='subquantity'>수량</div>
                        <div className='subprice'>가격</div>
                    </div>
                    
                    {
                        (!cartlist || cartlist.length === 0)?(<h3>장바구니가 비어있습니다.</h3>):(
                            
                            cartlist.map((cart, idx)=>{
                                return(
                                    <div className='oneclist'>

                                        <div className='onechk'>
                                            <input type='checkbox' id={'ch'+idx} value={cart.cseq} onChange={(e)=>{
                                                onCheck(e.currentTarget.value, e.currentTarget.checked)
                                            }} />
                                        </div>

                                        <div className='oneimg'>
                                            <img src={`http://localhost:8070/images/product/productdetail/${cart.image}`} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {cart.pname}
                                        </div>

                                        <div className='onequantity'>
                                            <button onClick={()=>{updateQty(cart.cseq, -1, cart.pseq, cart.indate)}}>-</button>

                                            {changeqty}
                                            {/* #1 여기 idx를 넣어서 개별적으로 관리할 수는 없나..?
                                            #2 2 이상 안올라가...... #3 마이너스버튼 안됨 */}

                                            <button onClick={()=>{updateQty(cart.cseq, 1, cart.pseq, cart.indate)}}>+</button>
                                        </div>

                                        <div className='oneprice'>
                                        ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(cart.price1)}
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                    <div className='clistEndrow'>
                        <div>총 &nbsp;{new Intl.NumberFormat('ko-KR').format(totalPrice)}&nbsp;원</div>
                        <div onClick={()=>{onDeleteCart()}}>
                            <img src='http://localhost:8070/images/cart/trash.png' alt='' />
                            삭제
                        </div>
                    </div>

                    <div className='moveonBtn'>
                        <button>목록으로</button>
                        <button>계속</button>
                    </div>

                </div>

                

            </div>

            <Footing />

        </div>
    )
}

export default Cartlist
