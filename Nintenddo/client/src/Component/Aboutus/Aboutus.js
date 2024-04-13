import React, {useEffect} from 'react'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/aboutus/aboutus.css'
const {kakao} = window;



function Aboutus() {


    useEffect(()=>{
        // 지도의 중심 위치 설정이동
        const container = document.getElementById('map');
        const options = {center : new kakao.maps.LatLng(37.560769, 126.971219)};
        const kakaoMap = new kakao.maps.Map(container, options);

        // 표시 지역 마킹
        const markerPosition = new kakao.maps.LatLng(37.560769, 126.971219);
        const markerImageSrc = process.env.REACT_APP_IMG_SRC +'aboutus/mapmarker.png';    // 마커 이미지 경로
        const markerImageSize = new kakao.maps.Size(50,50); // 마커 사이즈
        const markerImageOptions = {offset: new kakao.maps.Point(25, 50)};  // 마커 오프셋
        const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOptions);

        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image:markerImage
        });
        marker.setMap(kakaoMap);
        // setMap(kakaoMap);
    }, [])


    return (
        <div className='cnt'>

            <Heading />

            <div className='aboutusLabel'>
                <div>&nbsp;</div>About Us
            </div>

            <div className='aboutusWrap'>

                <div className='aboutUs'>

                    <div className='aboutTitle'>
                        <div>
                            <img src= {process.env.REACT_APP_IMG_SRC +'aboutus/'+'aboutuslogo.png'} alt='' />
                        </div>
                        <span>
                            한국닌텐도&nbsp;
                            <span>Nintendo of Korea</span>
                        </span>

                    </div>

                    <div className='aboutContent'>
                        <div className='contentone'>
                            <div className='subject'>회사명</div>
                            <div className='aboutInfo'>한국닌텐도</div>
                        </div>

                        <div className='contentone'>
                            <div className='subject'>사업내용</div>
                            <div className='aboutInfo'> 가정용 레저기기 판매</div>
                        </div>

                        <div className='contentone'>
                            <div className='subject'>
                                설립일자
                            </div>
                            <div className='aboutInfo'>
                                2006년 7월 7일
                            </div>
                        </div>

                        <div className='contentone'>
                            <div className='subject'>
                                소재지
                            </div>
                            <div className='aboutInfo'>
                                서울특별시 중구 통일로2길 AIA타워 2층
                            </div>
                        </div>
                            
                        <div className='contentone'>
                            <div className='subject'>
                                대표이사
                            </div>
                            <div className='aboutInfo'>
                                마우라 타카히로
                            </div>
                        </div> 
                            
                    </div>

                </div>


                <div className='aboutMap'>
                    <div id='map' style={{width:"100%", height:"100%"}}>

                    </div>
                </div>

            </div>
            <Footing />
            
        </div>
    )
}

export default Aboutus
