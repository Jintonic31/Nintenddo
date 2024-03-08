import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'
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

  return (
    <div class="category" onmouseover="showMegaDrop()" onmouseout="hideMegaDrop()">
      <div onClick={()=>{
        navigate('/')
      }}><img src="http://localhost:8070/images/includes/nintendo.png" /></div>

      <div onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc1} /> 본체 및 amiibo</div>

      <div onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc3} />소프트웨어</div>

      <div onMouseOver={handleMouseOver5} onMouseOut={handleMouseOut5} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc5} />News</div>

      <div onMouseOver={handleMouseOver7} onMouseOut={handleMouseOut7} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc7} />캐릭터</div>

      <div onMouseOver={handleMouseOver9} onMouseOut={handleMouseOut9} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc9} />고객지원</div>

      <div onMouseOver={handleMouseOver11} onMouseOut={handleMouseOut11} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc11} />온라인 스토어</div>

      <div onMouseOver={handleMouseOver13} onMouseOut={handleMouseOut13} onClick={()=>{
        navigate('/')
      }}><img src={imgSrc13} />검색</div>
      
    </div>
  )
}

export default Heading
