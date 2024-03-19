import React, { useState, useEffect, useRef  } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import ProductDetail from './Productdetail'
import { useSelector } from 'react-redux'
import '../../Style/Product/controller.css'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'

function Controller() {

    const loginUser = useSelector(state=>state.user)
    // redux에 저장해둔 로그인 정보를 loginUser에 저장
    const navigate = useNavigate();

    const [imgSrc, setImgSrc] = useState({
        1: "http://localhost:8070/images/product/hardware/controllernav1.png",
        3: "http://localhost:8070/images/product/hardware/controllernav3.png",
        5: "http://localhost:8070/images/product/hardware/controllernav5.png"
    })

    const navItems = [
        { id:1, text:"컨트롤러" },
        { id:3, text:"Joy-Con" },
        { id:5, text:"기타" },
    ];

    const handleMouseOver = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/product/hardware/controllernav${id + 1}.png` });
    }

    const handleMouseOut = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/product/hardware/controllernav${id}.png` });
    }

    const [controlList, setControlList] = useState([]);
    const [joyList, setJoyList] = useState([]);
    const [chargeLIst, setChargeList] = useState([]);
    const [selectProduct, setSelectProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(()=>{


        axios.get('/api/products/getcontrollist')
        .then((result)=>{
            setControlList(result.data);
        })
        .catch((err)=>{console.error(err)})

        axios.get('/api/products/getjoylist')
        .then((result)=>{
            setJoyList(result.data);
        })
        .catch((err)=>{console.error(err)})

        axios.get('/api/products/getchargelist')
        .then((result)=>{
            setChargeList(result.data);
        })
        .catch((err)=>{console.error(err)})

    },[])

    const openModal = (pseq) => {
        setSelectProduct(pseq);
        setIsOpen(!isOpen);
    }
    const modalStyle = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"900px",
            height:"700px",
            padding:"0",
        },
    }

    const closeModal = () => {
        setSelectProduct(null);
        setIsOpen(!isOpen);
    }

    // 스크롤 이동
    const viewPoint1 = useRef();
    const viewPoint2 = useRef();
    const viewPoint3 = useRef();

    const onMoveView = (id) => {
        if(id === 1){ 
            viewPoint1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }else if(id === 3){
            viewPoint2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }else if(id === 5){
            viewPoint3.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    async function goCart(pseq){
        if(loginUser.email == ''){
        // loginUser만 쓸 경우 빈 객체도 비어있지 않은것으로 인식되어 email 존재 여부를 확인하는 것
            alert('로그인이 필요한 서비스입니다.')
            navigate('/loginpage')
            return;
            // alert 가 실행된 이후 else문이 실행되는것을 방지하기 위한 return
        }else{
            try{
                await axios.post('/api/carts/insertcart', {pseq:pseq, quantity:1, email:loginUser})
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
        <div className='cnt'>

            <Heading />

            <div className='controllerWrap'>
                
                <div className='controllerNav'>


                    {
                        navItems.map(({id, text})=>(
                            <div className={'nav'} id={`id${id}`} key={id} onClick= {()=>{onMoveView(id)} }>
                                <div
                                key={id}
                                onMouseOver={()=>{handleMouseOver(id);}}
                                onMouseOut={()=>{handleMouseOut(id)}}>
                                    <img src={imgSrc[id]} alt='' />&nbsp;&nbsp;
                                    {text}
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className='controller'>
                    <div className='imgwrap'>
                        <img src='http://localhost:8070/images/product/hardware/controllericon.png' alt='' />
                    </div>
                    <div className='aboutcontroller' ref={viewPoint1}>컨트롤러 관련</div>

                    <hr />

                    <div className='controlList'>
                       {
                        controlList && controlList.length >= 1 && (
                            <div className='controlListOne'>
                                <div className='oneimg'>
                                    <img src={`http://localhost:8070/images/product/hardware/${controlList[0].image}`} alt='' />
                                </div>
                                <div className='onetext'>

                                    <div className='name'>{controlList[0].pname}</div>


                                    <div className='subandinfo'>

                                        <div className='onetextsub'>
                                            <div>희망소비자가격</div>
                                            <div>발매일</div>
                                            <div>동봉품</div>
                                        </div>

                                        <div className='onetextinfo'>
                                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(controlList[0].price1)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{controlList[0].indate.substring(0,10)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{controlList[0].includes}</div>
                                        </div>

                                    </div>                                    
                                    
                                    <div className='content'>{controlList[0].content}</div>

                                    <button className='goOrderBtn'>바로 구매</button>
                                    <button className='goCartBtn' onClick={()=>{goCart(controlList[0].pseq)}}>장바구니</button>
                                    
                                </div>
                            </div>
                        )
                       }

                        <div className='controllerVer'>
                            {
                                (controlList)?(
                                    controlList.map((list, idx)=>{
                                        return(
                                            <div onClick={()=>{openModal(list.pseq)}} key={idx}>
                                                <img src={`http://localhost:8070/images/product/hardware/${list.image}`} alt='' />
                                            </div>
                                        )
                                    })
                                ):(null)
                            }
                        </div>

                    </div>

                    <br /><br /><br />

                    <div className='imgwrap'>
                        <img src='http://localhost:8070/images/product/hardware/joyconicon.png' alt='' />
                    </div>
                    <div className='aboutcontroller' ref={viewPoint2}>Joy-Con 관련</div>

                    <hr />

                    <div className='controlList'>
                       {
                        joyList && joyList.length >= 1 && (
                            <div className='controlListOne'>
                                <div className='oneimg'>
                                    <img src={`http://localhost:8070/images/product/hardware/${joyList[0].image}`} alt='' />
                                </div>
                                <div className='onetext'>

                                    <div className='name'>{joyList[0].pname}</div>


                                    <div className='subandinfo'>

                                        <div className='onetextsub'>
                                            <div>희망소비자가격</div>
                                            <div>발매일</div>
                                            <div>동봉품</div>
                                        </div>

                                        <div className='onetextinfo'>
                                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(joyList[0].price1)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{joyList[0].indate.substring(0,10)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{joyList[0].includes}</div>
                                        </div>

                                    </div>                                    
                                    
                                    <div className='content'>{joyList[0].content}</div>

                                    <button className='goOrderBtn'>바로 구매</button>
                                    <button className='goCartBtn' onClick={()=>{goCart(joyList[0].pseq)}}>장바구니</button>
                                    
                                </div>
                            </div>
                        )
                       }

                        <div className='controllerVer'>
                            {
                                (joyList)?(
                                    joyList.map((list, idx)=>{
                                        return(
                                            <div onClick={()=>{openModal(list.pseq)}} key={idx}>
                                                <img src={`http://localhost:8070/images/product/hardware/${list.image}`} alt='' />
                                            </div>
                                        )
                                    })
                                ):(null)
                            }
                        </div>

                    </div>

                    <br /><br /><br />

                    <div className='imgwrap'>
                        <img src='http://localhost:8070/images/product/hardware/chargericon.png' alt='' />
                    </div>
                    <div className='aboutcontroller' id='section3' ref={viewPoint3}>기타 관련</div>

                    <hr />

                    <div className='controlList'>
                       {
                        chargeLIst && chargeLIst.length >= 1 && (
                            <div className='controlListOne'>
                                <div className='oneimg'>
                                    <img src={`http://localhost:8070/images/product/hardware/${chargeLIst[0].image}`} alt='' />
                                </div>
                                <div className='onetext'>

                                    <div className='name'>{chargeLIst[0].pname}</div>


                                    <div className='subandinfo'>

                                        <div className='onetextsub'>
                                            <div>희망소비자가격</div>
                                            <div>발매일</div>
                                            <div>동봉품</div>
                                        </div>

                                        <div className='onetextinfo'>
                                            <div className='price'>&nbsp;:&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(chargeLIst[0].price1)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{chargeLIst[0].indate.substring(0,10)}</div>
                                            <div className='indate'>&nbsp;:&nbsp;&nbsp;{chargeLIst[0].includes}</div>
                                        </div>

                                    </div>                                    
                                    
                                    <div className='controllercontent'>{chargeLIst[0].content}</div>

                                    <button className='goOrderBtn'>바로 구매</button>
                                    <button className='goCartBtn' onClick={()=>{goCart(chargeLIst[0].pseq)}}>장바구니</button>
                                    
                                </div>
                            </div>
                        )
                       }

                        <div className='controllerVer'>
                            {
                                (chargeLIst)?(
                                    chargeLIst.map((list, idx)=>{
                                        return(
                                            <div onClick={()=>{openModal(list.pseq)}} key={idx}>
                                                <img src={`http://localhost:8070/images/product/hardware/${list.image}`} alt='' />
                                            </div>
                                        )
                                    })
                                ):(null)
                            }
                        </div>

                    </div>

                    




                </div>


                

            </div>
        
            <Footing />


            <Modal isOpen={isOpen} style={modalStyle}>
                <ProductDetail pseq={selectProduct} closeModal={closeModal} />
            </Modal>

        </div>
    )
}

export default Controller