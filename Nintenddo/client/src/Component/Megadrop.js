import React from 'react';
import { useNavigate } from 'react-router-dom';


function Megadrop({ navigate, categoryId }) {
  const dropStyles = {
    display: categoryId ? 'flex' : 'none'
  };

  const handleDropItemClick = (linkto) => {
    navigate(linkto);
  };

  const dropMenuItems = {
    1: [
      { text: "본체", linkto: "/hardware", image: "http://localhost:8070/images/product/hardware/pcseq1.png" },
      { text: "amiibo", linkto: "/amiibo", image: "http://localhost:8070/images/product/amiibo/amiibo.png" }
    ],
    3: [
      { text: "소프트웨어", linkto: "/software", image: "http://localhost:8070/images/product/megadrop/software.png" }
    ],
    5: [
      { text: "News", linkto: "/news", image: "http://localhost:8070/images/product/megadrop/news.png" }
    ],
    7: [
      { text: "캐릭터", linkto: "/character", image: "http://localhost:8070/images/product/megadrop/character.png" }
    ],
    9: [
      { text: "고객지원", linkto: "/customer", image: "http://localhost:8070/images/product/megadrop/customer.png" }
    ],
    // 11: [
    //   { text: "장바구니", linkto: "/cartlist", image: "http://localhost:8070/images/product/megadrop/cartlist.png" }
    // ],
    13: [
      { text: "로그인", linkto: "/search", image: "http://localhost:8070/images/product/megadrop/search.png" }
    ]
  };

  return (
    <div className='Megadrop' style={dropStyles}>
      <div className='drophard' onClick={() => navigate('/hardware')}>
        <img src={dropMenuItems[categoryId]?.[0]?.image} alt={dropMenuItems[categoryId]?.[0]?.text} />
      </div>
      <div className='drophardetc'>
        {dropMenuItems[categoryId]?.map((menuItem, index) => (
          <div key={index} onClick={() => handleDropItemClick(menuItem.linkto)}>
            {menuItem.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Megadrop;
