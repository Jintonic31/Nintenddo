import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/includes/heading.css';
import Megadrop from './Megadrop';

function Heading() {

  const navigate = useNavigate();
  
  const [imgSrc, setImgSrc] = useState({
    1: "http://localhost:8070/images/includes/image1.png",
    3: "http://localhost:8070/images/includes/image3.png",
    5: "http://localhost:8070/images/includes/image5.png",
    7: "http://localhost:8070/images/includes/image7.png",
    9: "http://localhost:8070/images/includes/image9.png",
    11: "http://localhost:8070/images/includes/image11.png",
    13: "http://localhost:8070/images/includes/image13.png"
  });
  const [dropStyle, setDropStyle] = useState({ display: "none" });
  

  //카테고리부분임~
  const handleMouseOver = (id) => {
    setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/includes/image${id + 1}.png` });
  };

  const dropMouseOver = (id) =>{
    setDropStyle({ display: "flex" });
  }

  const handleMouseOut = (id) => {
    setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/includes/image${id}.png` });
  };

  const dropMouseOut = (id) => {
    setDropStyle({ display: "none" });
  }
  // 카테고리부분임~

  // 카테고리 
  const menuItems = [
    { id: 1, text: "본체 및 amiibo" },
    { id: 3, text: "소프트웨어" },
    { id: 5, text: "News" },
    { id: 7, text: "캐릭터" },
    { id: 9, text: "고객지원" },
    { id: 11, text: "온라인 스토어" },
    { id: 13, text: "검색" }
  ];



  return (
    <>
      <div className="category">
        <div className='gomainlogo' onClick={() => navigate('/')}>
          <img src="http://localhost:8070/images/includes/nintendo.png" alt="" />
        </div>
        {menuItems.map(({ id, text }) => (
          <div className='gocategory' key={id} onMouseOver={() => dropMouseOver(id) } onMouseOut={()=>{dropMouseOut(id)}} onClick={() => navigate('/')}>
            <div className='incategory' key={id} onMouseOver={() => handleMouseOver(id)} onMouseOut={() => handleMouseOut(id)}>
              <img src={imgSrc[id]} alt={`Menu item ${id}`} />
              {text}
            </div>
          </div>
        ))}
      </div>
      
      
      <Megadrop navigate={navigate} dropStyle={dropStyle} dropMouseOver={dropMouseOver} dropMouseOut={dropMouseOut} />


      {/* <div className='Megadrop' onMouseOver={
        () => setDropStyle({ display: "flex" })} style={dropStyle} onMouseOut={() => setDropStyle({ display: "none" })}>



        <div className='drophard' onClick={()=>{navigate('/hardware')}}>
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
              <div>
                <span>
                  <img src='http://localhost:8070/images/product/hardware/golinkicon.png' alt='' />기능·특징을 비교
                </span>
              </div>
              <div onClick={()=>{
                navigate('/controller')
              }}>
                <span>
                  <img src='http://localhost:8070/images/product/hardware/golinkicon.png' alt='' />주변 기기
                </span>
              </div>
            </div>
        </div>



      </div> */}
    </>
  );
}

export default Heading;