import React ,{useEffect, useState}from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../Style/includes/heading.css'



function Heading() {
    const navigate = useNavigate();
    const [imgSrc1,setImgSrc1] = useState("http://localhost:8070/images/includes/image1.png")
    const [imgSrc3,setImgSrc3] = useState("http://localhost:8070/images/includes/image3.png")
    const [imgSrc5,setImgSrc5] = useState("http://localhost:8070/images/includes/image5.png")
    const [imgSrc7,setImgSrc7] = useState("http://localhost:8070/images/includes/image7.png")
    const [imgSrc9,setImgSrc9] = useState("http://localhost:8070/images/includes/image9.png")
    const [imgSrc11,setImgSrc11] = useState("http://localhost:8070/images/includes/image11.png")
    const [imgSrc13,setImgSrc13] = useState("http://localhost:8070/images/includes/image13.png")

    const handleMouseOver1 = () =>{
      setImgSrc1("http://localhost:8070/images/includes/image2.png")
    }

    const handleMouseOut1 = () =>{
      setImgSrc1("http://localhost:8070/images/includes/image1.png")
    }

    const handleMouseOver3 = () =>{
      setImgSrc3("http://localhost:8070/images/includes/image4.png")
    }

    const handleMouseOut3 = () =>{
      setImgSrc3("http://localhost:8070/images/includes/image3.png")
    }

    const handleMouseOver5 = () =>{
      setImgSrc5("http://localhost:8070/images/includes/image6.png")
    }

    const handleMouseOut5 = () =>{
      setImgSrc5("http://localhost:8070/images/includes/image5.png")
    }

    const handleMouseOver7 = () =>{
      setImgSrc7("http://localhost:8070/images/includes/image8.png")
    }

    const handleMouseOut7 = () =>{
      setImgSrc7("http://localhost:8070/images/includes/image7.png")
    }

    const handleMouseOver9 = () =>{
      setImgSrc9("http://localhost:8070/images/includes/image10.png")
    }

    const handleMouseOut9 = () =>{
      setImgSrc9("http://localhost:8070/images/includes/image9.png")
    }

    const handleMouseOver11 = () =>{
      setImgSrc11("http://localhost:8070/images/includes/image12.png")
    }

    const handleMouseOut11 = () =>{
      setImgSrc11("http://localhost:8070/images/includes/image11.png")
    }

    const handleMouseOver13 = () =>{
      setImgSrc13("http://localhost:8070/images/includes/image14.png")
    }

    const handleMouseOut13 = () =>{
      setImgSrc13("http://localhost:8070/images/includes/image13.png")
    }


    const [dropStyle, setDropStyle] = useState({display:"none"});

    function showMegaDrop(e){
      setDropStyle({display:"flex"});
    }

    function hideMegaDrop(e){
      setDropStyle({display:"none"});
    }


    return (
      <>
        <div class="category" >
          <div onClick={()=>{
            navigate('/')
          }}>
            <img src="http://localhost:8070/images/includes/nintendo.png" />
          </div>

          <div onMouseOver={(e)=>{handleMouseOver1(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut1(e); }} onClick={()=>{navigate('/')}}>
            <img src={imgSrc1} />
            본체 및 amiibo
          </div>

          <div onMouseOver={(e)=>{handleMouseOver3(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut3(e); hideMegaDrop(e); }} onClick={()=>{navigate('/')}}><img src={imgSrc3} />소프트웨어</div>

          <div onMouseOver={(e)=>{handleMouseOver5(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut5(e); hideMegaDrop(); }} onClick={()=>{navigate('/')}}><img src={imgSrc5} />News</div>

          <div onMouseOver={(e)=>{handleMouseOver7(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut7(e); hideMegaDrop(e); }} onClick={()=>{navigate('/')}}><img src={imgSrc7} />캐릭터</div>

          <div onMouseOver={(e)=>{handleMouseOver9(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut9(e); hideMegaDrop(e); }} onClick={()=>{navigate('/')}}><img src={imgSrc9} />고객지원</div>

          <div onMouseOver={(e)=>{handleMouseOver11(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut11(e); hideMegaDrop(e); }} onClick={()=>{navigate('/')}}><img src={imgSrc11} />온라인 스토어</div>

          <div onMouseOver={(e)=>{handleMouseOver13(e); showMegaDrop(e); }} onMouseOut={(e)=>{handleMouseOut13(e); hideMegaDrop(e); }} onClick={()=>{navigate('/')}}><img src={imgSrc13} />검색</div>
          
        </div>


        <div className='Megadrop' onMouseOver={(e)=>{showMegaDrop(e); }}style={dropStyle} onMouseOut={(e)=>{hideMegaDrop(e);}}>
          <div className='dropHard'>
            <img src='http://localhost:8070/images/product/hardware/pcseq1.png' />
          </div>
          <div className='dropetc'>
            <div>
              <img src='http://localhost:8070/images/product/hardware/pcseq3.png' />
              <div className='pcseq3title'>amiibo</div>
            </div>
            <div className='pcseq7'>
              <img src='http://localhost:8070/images/product/hardware/pcseq7.png' />
              <div>게임&워치<br />젤다의 전설</div>
            </div>
            <div className='pcseq6'>
              <img src='http://localhost:8070/images/product/hardware/pcseq6.png' />
              <div>Pokemon Go<br />Plus</div>
            </div>
            <div className='etc'>
              <div>기능·특징을 비교</div>
              <div>주변 기기</div>
            </div>
          </div>
        </div>

      </>
    )
}

export default Heading
