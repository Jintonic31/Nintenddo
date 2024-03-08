import React from 'react'
import {useNavigate} from 'react-router-dom'


function Heading() {
    const navigate = useNavigate();

  return (
    <div class="category">
      <div onClick={()=>{
        navigate('/')
      }}><img src="" />닌텐도이미지 </div>

      <div onClick={()=>{
        navigate('/')
      }}>본체 및 amiibo</div>

      <div onClick={()=>{
        navigate('/')
      }}>소프트웨어</div>

      <div onClick={()=>{
        navigate('/')
      }}>News</div>

      <div onClick={()=>{
        navigate('/')
      }}>캐릭터</div>

      <div onClick={()=>{
        navigate('/')
      }}>고객지원</div>

      <div onClick={()=>{
        navigate('/')
      }}>온라인 스토어</div>

      <div onClick={()=>{
        navigate('/')
      }}>검색</div>
      
    </div>
  )
}

export default Heading
