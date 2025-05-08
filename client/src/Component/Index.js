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
              <img key={idx} src={`${process.env.REACT_APP_IMG_SRC}banner/main/${banner.image}`} alt={`banner-${idx}`} />
            ))}
          </Slider>
          <div className='mainBannerremote'>

            <div className='remote'>
              <img src={`${process.env.REACT_APP_IMG_SRC}banner/remoteicon/icon2.png`} />
              <div className='remotetitle1'>
                마리오 VS. 동킹콩
              </div>
            </div>
            <div className='remote'>
              <img src={process.env.REACT_APP_IMG_SRC + 'banner/remoteicon/' + 'icon2.png'} />
              <div className='remotetitle2'>
                스플래툰 3
              </div>
            </div>
            <div className='remote'>
              <img src={process.env.REACT_APP_IMG_SRC + 'banner/remoteicon/' + 'icon3.png'} />
              <div className='remotetitle3'>
                슈퍼 마리오 RPG
              </div>
            </div>
            <div className='remote'>
              <img src={process.env.REACT_APP_IMG_SRC + 'banner/remoteicon/' + 'icon4.png'} />
              <div className='remotetitle4'>
                동물의 숲
              </div>
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
            <img src={process.env.REACT_APP_IMG_SRC + 'banner/main/' + 'rightarrowicon.png'} alt='rightarrow' />
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
