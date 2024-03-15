import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import ProductDetail from './Productdetail'
import '../../Style/Product/controller.css'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

function Controller() {

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
    const [selectProduct, setSelectProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        axios.get('/api/products/getcontrollist')
        .then((result)=>{
            setControlList(result.data);
        })
        .catch((err)=>{console.error(err)})
    },[])

    const openModal = (pseq) => {
        setSelectProduct(pseq);
        setIsOpen(!isOpen);
    }

    const closeModal = () => {
        setSelectProduct(null);
        setIsOpen(!isOpen);
    }

    return (
        <div className='cnt'>

            <Heading />

            <div className='controllerWrap'>
                
                <div className='controllerNav'>


                    {
                        navItems.map(({id, text})=>(
                            <div className={'nav'}>
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
                    <div className='aboutcontroller'>컨트롤러 관련</div>

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
                                    <button className='goCartBtn'>장바구니</button>
                                    
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

                </div>

            </div>
        
            <Footing />


            <Modal isOpen={isOpen} onRequestClose={closeModal} pseq={selectProduct}>
                <ProductDetail />
            </Modal>

        </div>
    )
}

export default Controller
