import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/Product/controller.css'
import { Link } from 'react-router-dom'

function Controller() {

    const [redLine, setRedLine] = useState({display:"none"});
    const [imgSrc, setImgSrc] = useState({
        1: "http://localhost:8070/images/product/hardware/controllernav1.png",
        3: "http://localhost:8070/images/product/hardware/controllernav3.png",
        5: "http://localhost:8070/images/product/hardware/controllernav5.png"
    })

    const navItems = [
        { id:1, text:"컨트롤러" },
        { id:2, text:"Joy-Con" },
        { id:3, text:"기타" },
    ];

    const handleMouseOver = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/product/hardware/controllernav${id + 1}.png` });
        setRedLine({display:"flex"});
    }

    const handleMouseOut = (id) => {
        setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/product/hardware/controllernav${id}.png` });
        setRedLine({display:"flex"});
    }

    return (
        <div className='cnt'>

            <Heading />

            <div className='controllerWrap'>
                
                <div className='controllerNav'>
                    <div className='nav'>
                        <img src='http://localhost:8070/images/product/hardware/controllernav1.png' alt='' />
                        컨트롤러
                    </div>
                    <div className='nav'>
                        <img src='http://localhost:8070/images/product/hardware/controllernav2.png' alt='' />
                        Joy-Con
                    </div>
                    <div className='nav'>
                        <img src='http://localhost:8070/images/product/hardware/controllernav3.png' alt='' />
                        충전기
                    </div>
                </div>

            </div>
        
            <Footing />

        </div>
    )
}

export default Controller
