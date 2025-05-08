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
        if(loginUser.email === ''){
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
        if(checklist.length === 0){
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

    async function updateQty(cseq, qty, pseq, indate, idx) {
        try {

            const updatedQty = cartlist[idx].quantity + qty;
            // cartlist의 idx번째 상품의 기존 수량에서 추가할 수량을 더한 값을 변수 updatedQty에 저장
            if (updatedQty < 1) {
                return;
                // 최소 수량이 1로 그 이하일 경우 수량 업데이트를 취소
            }

            const result = await axios.post('/api/carts/updateqty', { cseq, pseq, quantity:updatedQty, indate, email:loginUser.email })
            // 서버에 수량 업데이트를 위한 값을 보냄

            const updatedCartlist = [...cartlist];
            // 기존에 있던 cartlist라는 배열을 복사(...)해서 updatedCartlist라는 새로운 배열을 만듦

            updatedCartlist[idx].quantity = result.data.qty;
            // 서버에서 qty라는 이름으로 보낸 수량을 새로운 배열의 idx번째 quantity 값으로 설정

            setCartlist(updatedCartlist);
            // 기존의 cartlist 배열을 수량이 업데이트된 버전의 데이터를 가지고 있는 배열인 updatedCartlist로 바꿈

            const updatedTotalPrice = updatedCartlist.reduce((acc, curr) => {
            // reduce : 배열의 각 요소에 대해 콜백함수를 실행해 하나의 결과값을 반환하는 메서드 
            // acc : 콜백 함수에서 반환되기 이전 값 = 누적중인값
            // curr : 순회중인 배열의 현재 값
                return acc + (curr.price1 * curr.quantity);
                // 배열 요소를 모두 한번씩 찍고 그 요소를 누적하여 더한 값을 return함
                // ex : [1, 2, 3, 4] / return acc+curr일 때
                // => curr이 1이면 acc가 1 -> curr이 2면 acc가 3 -> curr이 3이면 acc가 6 -> curr이 4면 acc가 10

            }, 0);

            setTotalPrice(updatedTotalPrice);



        } catch (err) {
            console.error(err);
        }
    }

    async function onsubmit(){

        try{

            if( !cartlist || cartlist.length === 0 ){
                alert('장바구니 내역이 없습니다.')
                navigate('/cartlist');
                return;
            }else{
                return navigate('/writedelivery')
            }


        }catch(err){
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
                                            <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+cart.image} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {cart.pname}
                                        </div>

                                        <div className='onequantity'>
                                            <button onClick={()=>{updateQty(cart.cseq, -1, cart.pseq, cart.indate, idx)}}>-</button>

                                            {cart.quantity}


                                            <button onClick={()=>{updateQty(cart.cseq, 1, cart.pseq, cart.indate, idx)}}>+</button>
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
                            <img src= {process.env.REACT_APP_IMG_SRC +'cart/'+'trash.png'} alt='' />
                            삭제
                        </div>
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

export default Cartlist
