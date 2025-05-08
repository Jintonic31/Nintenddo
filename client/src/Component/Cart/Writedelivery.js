import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Heading from '../Heading'
import Footing from '../Footing'
import Modal from 'react-modal'
import DaumPostcode from 'react-daum-postcode'
import '../../Style/Cart/writedelivery.css'
import axios from 'axios'


function Cartlist() {

    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    const [cartlist, setCartlist] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [oname, setOname] = useState('');
    const [ophone, setOphone] = useState('');
    const [oznum, setOznum] = useState('');
    const [oadd1, setOadd1] = useState('');
    const [oadd2, setOadd2] = useState('');

    const [isOpen, setIsOpen] = useState(false);


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

    const toggle = ()=>{
        setIsOpen(!isOpen);
        // 우편번호 찾기 버튼을 누르면 이 함수가 실행되면서 
        // isOpen의 값을 반대(true)로 바꿈
        // = 모달창이 열림
    }

    // 모달창을 위한 style
    const customStyles = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"500px",
            height:"600px",
            padding:"0",
            overflow:"hidden",
        },
    };

    const completeHandler = (data)=>{
    // data에는 주소 검색 후 클릭했을 때 데이터들이 전달됨
        console.log(data);
        setOznum(data.zonecode);
        setOadd1(data.address);
        setIsOpen(false);
        // ㄴ 주소 입력 > 주소 클릭한 뒤에 isOpen을 false로 세팅해 모달창을 닫음
    }

    

    async function onsubmit(){

        try{

            if( !cartlist || cartlist.length === 0 ){
                alert('장바구니 내역이 없습니다.')
                navigate('/cartlist');
                return;
            }

            if(!oname) {return alert('이름을 입력하세요.')}
            if(!ophone) {return alert('전화번호를 입력하세요.')}
            if(!oznum) {return alert('주소를 입력하세요.')}
            if(!oadd2) {return alert('상세주소를 입력하세요.')}

            const result = await axios.post('/api/orders/insertorder', {oname, ophone, oznum, oadd1, oadd2});
            const oseq = result.data.oseq;

            // await axios.post('/api/members/updatedeliveryinfo', {email:loginUser.email, mname, phone, znum, add1, add2} )

            // 세션과 result에 추가된 oseq를 저장하기 위한 axios
            await axios.get(`/api/orders/saveoseq/${oseq}`);

            let ans = window.confirm('주문 성공. 주문을 확인하시겠습니까?');
            if(ans){
                navigate('/completeorder')
            }else{
                navigate('/writedelivery')
            }
        }catch(err){
            console.error(err);
        }
    }



    return (
        <div className='Cnt'>

            <Heading />

            <div className='wirtedeliveryWrap'>
                
                <div className='buyProcess2'>
                    <div className='process2'>장바구니</div>
                    <div className='process2'>배송정보</div>
                    <div className='process2'>주문완료</div>
                </div>

                <div className='deliveryinfoWrap'>
                    <div className='dtitle'>배송 정보 입력</div>
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
                            <input type='text' value={oname} onChange={(e)=>{setOname(e.currentTarget.value)}} />
                            <input type='text' value={ophone} onChange={(e)=>{setOphone(e.currentTarget.value)}} />
                            <div className='dinfoznum'>
                                <input type='text' value={oznum} />
                                <button onClick={()=>{ toggle() }}>찾기</button>
                            </div>
                            <div>
                                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} >
                                    <DaumPostcode onComplete={completeHandler} />
                                </Modal>
                            </div>
                            <input type='text' value={oadd1} />
                            <input type='text' value={oadd2} onChange={(e)=>{setOadd2(e.currentTarget.value)}}/>
                            
                        </div>


                        
                    </div>
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
                        (!cartlist || cartlist.length === 0)?(<h3>장바구니가 비어있습니다.</h3>):(
                            
                            cartlist.map((cart, idx)=>{
                                return(
                                    <div className='onenolist'>

                                        <div className='onechk'>
                                           &nbsp;
                                        </div>

                                        <div className='oneimg'>
                                            <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+cart.image} alt='' />
                                        </div>

                                        <div className='onepname'>
                                            {cart.pname}
                                        </div>

                                        <div className='onequantity'>              {cart.quantity}
                                        </div>

                                        <div className='oneprice'>
                                        ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(cart.price1)}
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                    <div className='cdlistEndrow'>
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

export default Cartlist
