import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/includes/heading.css';
import Megadrop from './Megadrop';

function Heading() {
  const navigate = useNavigate();
  const [image, setImage] = useState({
    1: 'image1',
    3: 'image3',
    5: 'image5',
    7: 'image7',
    9: 'image9',
    11: 'image11',
    13: 'image13'
  });
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const menuItems = [
    { id: 1, text: "본체 및 amiibo", linkto:"/hardware" },
    { id: 3, text: "소프트웨어", linkto:"/software" },
    { id: 5, text: "News", linkto:"/news" },
    { id: 7, text: "캐릭터", linkto:"/character" },
    { id: 9, text: "고객지원", linkto:"/customer" },
    { id: 11, text: "장바구니", linkto:"/cartlist" },
    { id: 13, text: "로그인", linkto:"/login" }
  ];
  const [dropStyle, setDropStyle] = useState({ display: "none" });
  const handleMouseOver = (id) => {
    setImage({ ...image, [id]: `http://localhost:8070/images/includes/image${id + 1}.png` });
  };

  const dropMouseOver = (id) =>{
    setDropStyle({ display: "flex" });
  }

  const handleMouseOut = (id) => {
    setImage({ ...image, [id]: `http://localhost:8070/images/includes/image${id}.png` });
  };

  const dropMouseOut = (id) => {
    setDropStyle({ display: "none" });
  }

  return (
    <div className="category">
      <div className='gomainlogo' onClick={() => navigate('/')}>
        <img src="http://localhost:8070/images/includes/nintendo.png" alt="" />
      </div>
      {menuItems.map(({ id, text, linkto }) => (
        <div
          className='gocategory'
          key={id}
          onMouseOver={() => handleMouseOver(id)}
          onMouseOut={() => handleMouseOut(id)}
          onClick={() => navigate(linkto)}
        >
          <div className='incategory'>
            <img
              src={`http://localhost:8070/images/includes/${image[id]}.png`}
              alt=''
            />
            {text}
          </div>
        </div>
      ))}
      <Megadrop
        navigate={navigate}
        categoryId={activeCategoryId}
      />
    </div>
  );
}

export default Heading;
