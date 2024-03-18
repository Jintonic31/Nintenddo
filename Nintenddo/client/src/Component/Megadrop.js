import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/includes/heading.css';

function Megadrop(props) {


    const navigate = useNavigate();
    const { dropStyle, dropMouseOver, dropMouseOut, id } = props;


    return (
        <>
            <div className='Megadrop' onMouseOver={
                () => dropMouseOver(id)} style={dropStyle} onMouseOut={() => dropMouseOut(id)}>
                <div className='drophard' onClick={() => navigate('/hardware')}>
                    <img src='http://localhost:8070/images/product/hardware/pcseq1.png' />
                </div>
                <div className='drophardetc'>
                    <div>
                    <img src='http://localhost:8070/images/product/hardware/pcseq3.png' />
                    <div className='pcseq3title'>amiibo</div>
                    </div>
                    <div>
                    <img src='http://localhost:8070/images/product/hardware/pcseq7.png' />
                    <div><span>게임&워치</span><span>젤다의 전설</span></div>
                    </div>
                    <div>
                    <img src='http://localhost:8070/images/product/hardware/pcseq6.png' />
                    <div><span>Pokemon Go</span><span>Plus</span></div>
                    </div>
                    <div className='etc'>
                    <div onClick={()=> {navigate('/hardware')}}>
                        <span>
                        <img src='http://localhost:8070/images/product/hardware/golinkicon.png' alt='' />기능·특징을 비교
                        </span>
                    </div>
                    <div onClick={() => { navigate('/controller') }}>
                        <span>
                        <img src='http://localhost:8070/images/product/hardware/golinkicon.png' alt='' />주변 기기
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </>
        

        
    )
}

export default Megadrop
