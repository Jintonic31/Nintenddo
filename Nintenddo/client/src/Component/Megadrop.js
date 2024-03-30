import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Megadrop({ navigate, categoryId, setActiveCategoryId }) {


  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    axios.get('/api/news/getnewslist')
      .then((result)=>{
          setNewsList(result.data)
      })
      .catch((err)=>{console.error(err)})
  }, [])




  const dropStyles = {
    display: categoryId ? 'flex' : 'none'
  };

  const handleMouseOut = () => {
     setActiveCategoryId(null);

  };

  const handleDropItemClick = (linkto) => {
    navigate(linkto);
  };

  const dropMenuItems = {
    1: [
      { text: "본체", linkto: "/hardware", image: "http://localhost:8070/images/product/productdetail/pcseq1.png" ,
      under:
      <div className='dropunder'>
        <div>
          <img src='http://localhost:8070/images/product/productdetail/pcseq3.png' />
          <div className='undertitle'>amiibo</div>
        </div>
        <div>
          <img src='http://localhost:8070/images/product/productdetail/pcseq7.png' />
          <div className='undertitle'><span>게임&워치</span><span>젤다의 전설</span></div>
        </div>
        <div>
          <img src='http://localhost:8070/images/product/productdetail/pcseq6.png' />
          <div className='undertitle'><span>Pokemon Go</span><span>Plus</span></div>
        </div>
        <div className='etc'>
          <div onClick={()=> {navigate('/hardware')}}>
              <span>
              <img src='http://localhost:8070/images/product/productdetail/golinkicon.png' alt='' />기능·특징을 비교
              </span>
          </div>
          <div onClick={() => { navigate('/controller') }}>
              <span>
              <img src='http://localhost:8070/images/product/productdetail/golinkicon.png' alt='' />주변 기기
              </span>
          </div>
        </div>
      </div>},
    ],
    3: [
      { text: "소프트웨어", linkto: "/software", image: "http://localhost:8070/images/product/megadrop/software.png" }
    ],
    5: [
      { text: "", linkto: "/news", image:'',
      under:
      <div className='dropunder'>
        {
          (newsList)?(
            newsList.slice(0,4).map((news, idx)=>{
              return(
                <div className='dropnews' onClick={()=>{navigate('/newslist')}}>
                  <div>
                    <img src={`http://localhost:8070/images/news/${news.image1}`} />
                  </div>
                  <span>{news.title}</span>
                </div>
              )
            })
          ):(null)
        }
      </div>
      }
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
      { text: "로그인", linkto: "/search", image: "http://localhost:8070/images/product/megadrop/search.png", under:<div>내용</div>}
    ]
  };

  return (
    <div className='Megadrop' style={dropStyles}>
      <div className='drophard' onClick={() => navigate('/hardware')} onMouseOut={()=>{handleMouseOut();}}>
        <img src={dropMenuItems[categoryId]?.[0]?.image} alt={dropMenuItems[categoryId]?.[0]?.text} />

      </div>
      <div className='drophardetc'>
        {dropMenuItems[categoryId]?.map((menuItem, index) => (
          <div key={index} onClick={() => handleDropItemClick(menuItem.linkto)}>
            {menuItem.text}
            <div>{menuItem.under && <div>{menuItem.under}</div>}</div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Megadrop;
