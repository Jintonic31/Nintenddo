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
  const [bannerList, setBannerList] = useState();
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    axios.get('/api/banners/mainbanner')
      .then((result) => {
        setBannerList(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='indexCnt'>
      <Heading />
      <div className='mainBanner'>
        <div className='mainBannerList'>
          <Slider {...settings}>
            {bannerList ? (
              bannerList.map((banner, idx) => (
                <img src={`http://localhost:8070/images/banner/main/${banner.image}`} alt={`banner-${idx}`} />
              ))
            ) : (null)}
          </Slider>
          <div className='mainBannerremote'>
            <div className='remote'>
              <img src='http://localhost:8070/images/banner/remoteicon/icon1.png' alt='icon1' />
              <div className='remotetitle1'>마리오 VS. 동킹콩</div>
            </div>
            <div className='remote'>
              <img src='http://localhost:8070/images/banner/remoteicon/icon2.png' alt='icon2' />
              <div className='remotetitle2'>스플래툰 3</div>
            </div>
            <div className='remote'>
              <img src='http://localhost:8070/images/banner/remoteicon/icon3.png' alt='icon3' />
              <div className='remotetitle3'>슈퍼 마리오 RPG</div>
            </div>
            <div className='remote'>
              <img src='http://localhost:8070/images/banner/remoteicon/icon4.png' alt='icon4' />
              <div className='remotetitle4'>동물의 숲</div>
            </div>
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
        <Chatbot customerInfo={customerInfo} />
      </article>
      <Footing />
    </div>
  );
}

export default Index;