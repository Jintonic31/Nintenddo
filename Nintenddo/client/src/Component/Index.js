import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Footing from './Footing';
import Heading from './Heading';
import Mainnews from '../Component/News/Mainnews';
import Mainsoftware from '../Component/Product/Mainsoftware';
import '../Style/Index.css';
import '../Style/chatbot.css';

import Chatbot from '../Component/Customer/Chatbot';

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

function Index() {
  const [bannerList, setBannerList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({}); // 초기화된 사용자 정보

  useEffect(() => {
    axios.get('/api/banners/mainbanner')
      .then((result) => {
        setBannerList(result.data);
      })
      .catch((err) => {
        console.error('Error loading banners:', err);
        // 오류 발생 시 적절한 처리
      });

    
  }, []);

  return (
    <div className='indexCnt'>
      <Heading />
      <div className='mainBanner'>
        <div className='mainBannerList'>
          <Slider {...settings}>
            {bannerList.map((banner, idx) => (
              <img key={idx} src={`http://localhost:8070/images/banner/main/${banner.image}`} alt={`banner-${idx}`} />
            ))}
          </Slider>
          <div className='mainBannerremote'>
            {/* 배너 내용 */}
          </div>
        </div>
      </div>
      <article className='mainArticle'>
        <Mainnews />
        <div className='buyprepaynum'>
          <span>Nintendo Switch</span>
          <span>
            닌텐도 선불 번호 구입
            <img src='http://localhost:8070/images/banner/main/rightarrowicon.png' alt='rightarrow' />
          </span>
        </div>
        <Mainsoftware />
        <Chatbot />
      </article>
      <Footing />
    </div>
  );
}

export default Index;
