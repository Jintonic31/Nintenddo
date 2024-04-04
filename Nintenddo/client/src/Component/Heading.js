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
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isMouseOnMenu, setIsMouseOnMenu] = useState(false);

  const handleMouseOver = (id) => {
    handleMenuMouseEnter();
    setActiveCategoryId(id);
    setImgSrc(prevImgSrc => ({
      ...prevImgSrc,
      [id]: `http://localhost:8070/images/includes/image${id + 1}.png`
    }));
    if(isMouseOnMenu){
      setDropStyle({ display: "flex" });
    }
  };


  const handleMouseOut = (id) => {
    setImgSrc({ ...imgSrc, [id]: `http://localhost:8070/images/includes/image${id}.png` });
    console.log(1, isMouseOnMenu);
    if (isMouseOnMenu === false) { 
      setDropStyle({ display: "none" });
    }
  };

  const handleMenuMouseEnter = (id) => {
    setIsMouseOnMenu(true);
  };

  const handleMenuMouseLeave = (id) => {
    setIsMouseOnMenu(false);
  };

  const menuItems = [
    { id: 1, text: "본체 및 amiibo", linkto:"/hardware" },
    { id: 3, text: "소프트웨어", linkto:"/software" },
    { id: 5, text: "News", linkto:"/newslist" },
    { id: 7, text: "캐릭터", linkto:"/character" },
    { id: 9, text: "고객지원", linkto:"/customer" },
    { id: 11, text: "장바구니", linkto:"/cartlist" },
    { id: 13, text: "로그인", linkto:"/login" }
  ];

  return (
    <div className="category">
      <div className='gomainlogo' onClick={() => navigate('/')}>
        <img src="http://localhost:8070/images/includes/nintendo.png" alt="" />
      </div>
      <div className='gocategoryWrap'>
      {menuItems.map(({ id, text, linkto }) => (
        <div
          className='gocategory'
          key={id}
          onMouseOver={() => handleMouseOver(id)}
          onMouseOut={() => handleMouseOut(id)}
          onClick={() => navigate(linkto)}
        >
          <div className='incategory' >
            <img
              src={imgSrc[id]}
              alt=''
            />
            {text}
          </div>
        </div>
      ))}
      </div>
      <Megadrop
        navigate={navigate}
        categoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
        dropStyle={dropStyle}
        // handleMenuMouseEnter={handleMenuMouseEnter} 
        // handleMenuMouseLeave={handleMenuMouseLeave} 
      />
    </div>
  );
}

export default Heading;