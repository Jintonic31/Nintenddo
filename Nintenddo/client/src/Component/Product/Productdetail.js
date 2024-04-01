import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/Product/productdetail.css'


function Productdetail(props) {

    const pseq = props.pseq;
    const [oneproduct, setOneProduct] = useState([]);
    const closeModal = props.closeModal; // closeModal props로 받기
    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    useEffect(()=>{
        axios.post(`/api/products/getoneproduct/${pseq}`)
        .then((result)=>{
            setOneProduct(result.data.product);
        })
        .catch((err)=>{console.error(err)})
    },[])

    function formatDate(utc){
        const date = new Date(utc);
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    async function goOrder(pseq){
        if(loginUser.email === ''){
        // loginUser만 쓸 경우 빈 객체도 비어있지 않은것으로 인식되어 email 존재 여부를 확인하는 것
            alert('로그인이 필요한 서비스입니다.')
            navigate('/loginpage')
            return;
            // alert 가 실행된 이후 else문이 실행되는것을 방지하기 위한 return
        }else{
            try{
                
                let ans = window.confirm('장바구니에 있는 상품도 함께 주문하시겠습니까?');
                if(ans){
                // ans가 true일 경우
                    await axios.post('/api/carts/insertcart', {pseq:pseq, quantity:1, email:loginUser.email})
                    navigate('/writedelivery');
                }else{
                    await axios.delete('/api/carts/deleteallcart');
                    await axios.post('/api/carts/insertcart', {pseq:pseq, quantity:1, email:loginUser.email})
                    navigate('/writedelivery')
                }
            }catch(err){
                console.error(err);
            }
        }
    }

    async function goCart(pseq){
        if(loginUser.email === ''){
        // loginUser만 쓸 경우 빈 객체도 비어있지 않은것으로 인식되어 email 존재 여부를 확인하는 것
            alert('로그인이 필요한 서비스입니다.')
            navigate('/loginpage')
            return;
            // alert 가 실행된 이후 else문이 실행되는것을 방지하기 위한 return
        }else{
            try{
                await axios.post('/api/carts/insertcart', {pseq:pseq, quantity:1, email:loginUser.email})
                let ans = window.confirm('장바구니 추가 완료! 장바구니로 이동할까요?');
                if(ans){
                // ans가 true일 경우
                    navigate('/cartlist');
                }
            }catch(err){
                console.error(err);
            }
        }
    }


    return (

        <div className='pdetailcnt'>
            <div className='pdetailcloseBtn'>
                <img src='http://localhost:8070/images/product/productdetail/closebtn.png' onClick={closeModal}/>
            </div>

            <div className='detailWrap'>
                <div className='detailimg'>
                    <img src={`http://localhost:8070/images/product/productdetail/${oneproduct.image}`} alt='' />
                </div>

                <div className='detailtext'>
                    <div className='name'>{oneproduct.pname}</div>

                    <div className='dsubandinfo'>

                        <div className='onetextsub'>
                            <div>희망소비자가격</div>
                            <div>발매일</div>
                            <div>동봉품</div>
                        </div>

                        <div className='onetextinfo'>
                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(oneproduct.price1)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{formatDate(oneproduct.indate)}</div>
                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{oneproduct.includes}</div>
                        </div>
                        
                    </div> 

                    <div className='content'>{oneproduct.content}</div>

                    <button className='goOrderBtn' onClick={()=>{goOrder(oneproduct.pseq)}}>바로 구매</button>
                    <button className='goCartBtn' onClick={()=>{goCart(oneproduct.pseq)}}>장바구니</button>
    



                </div>
                
            </div>
            
        </div>
    )
}

export default Productdetail
