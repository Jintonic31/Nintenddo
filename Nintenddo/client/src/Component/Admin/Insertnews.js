import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/admin/InsertNews.css'

function Insertnews() {

    const adminUser = useSelector(state => state.admins)
    const navigate = useNavigate();

    useEffect(()=>{
        if(adminUser.adminid === ''){
            alert('접근권한 없음. 메인페이지로 이동합니다.')
            navigate('/')
        }
    },[])    

    const [title, setTitle] = useState();
    const [content1, setContent1] = useState();
    const [content2, setContent2] = useState();
    const [content3, setContent3] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    // const [filename1, setFilename1] = useState();
    // const [filename2, setFilename2] = useState();
    // const [filename3, setFilename3] = useState();

    const [imgList, setImgList] = useState([]);
    const [imgsrc1, setImgsrc1] = useState('');
    const [imgsrc2, setImgsrc2] = useState('');
    const [imgsrc3, setImgsrc3] = useState('');

    // useEffect(() => {
    //     console.log(filename1);
    //     console.log(filename2);
    //     console.log(filename3);
    // }, [filename1, filename2, filename3]); // filename1이 업데이트될 때마다 실행됨

    async function imgup(e, idx){
        let formData = new FormData();
        // ㄴ FormData : JavaScript를 통해 파일 업로드 및 기타 (HTML)폼 데이터를 서버로 전송하는 것이 가능 
        // ㄴ (HTML)폼 데이터 : 사용자가 form태그 안에서 입력 필드(text, checkbox, radio 등)를 통해 정보를 제출할 수 있는 모든 데이터

        formData.append('image', e.target.files[0]);
        // ㄴ 파일 입력 필드에서 선택한 첫번째 파일을 image라는 이름으로 추가(append)

        const result = await axios.post('/api/admins/newsimgup', formData)


        if(idx == 1){
            setImgsrc1(result.data.filename)
            // setFilename1(result.data.filename.substring(59))
            // setImgsrc1(`${process.env.REACT_APP_IMG_SRC}/news/${result.data.filename}`)
        }else if( idx == 2 ){
            setImgsrc2(result.data.filename)
            // setFilename2(result.data.filename.substring(59))
            // setImgsrc2(`${process.env.REACT_APP_IMG_SRC}/news/${result.data.filename}`)
        }else if( idx == 3 ){
            setImgsrc3(result.data.filename)
            // setFilename3(result.data.filename.substring(59))
            // setImgsrc3(`${process.env.REACT_APP_IMG_SRC}/news/${result.data.filename}`)
        }

        setImgList(arr => [...arr, result.data.filename]);
        console.log("imgList : " + [imgList]);
        // arr.push(result.data.filename);
        // setImgList( [...arr] );
        // console.log(result.data.filename);
    }

    function onsubmit(){
        axios.post('/api/admins/insertnews', {title, content1, content2, content3, image1:imgList[0], image2:imgList[1], image3:imgList[2]} )
        .then((result)=>{
            alert('작성 완료! 목록으로 돌아갑니다.')
            navigate('/adminnewslist')
        })
        .catch((err)=>{console.error(err)})
    }



    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifylabel'>
                <div className='redbar'>&nbsp;</div>
                Insert News
            </div>

            <div className='modifyinWrap'>

                <div className='rowfield'>
                    <div className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        제목
                    </div>
                    <input type='text' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}} />
                </div>
                
                <div className='field'>
                    <div className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        이미지
                    </div>
                    <div className='afterimage'>
                        <img src={imgsrc1} alt='첫번째 이미지' />
                    </div>
                    
                    <input type='file' value={image1} onChange={(e)=>{imgup(e, 1)}} />
                </div>

                <div className='field'>
                    <div className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        내용
                    </div>
                    <textarea className='inputbox' value={content1} style={{height:"300px", width:"80%"}} onChange={(e)=>{setContent1(e.currentTarget.value)}} />
                </div>

                <div className='field' id='img2'>
                    <div 
                    className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        이미지
                    </div>
                    
                    <div className='afterimage'>
                        <img src={imgsrc2} alt='두번째 이미지' />
                    </div>
                    <input type='file' className='inputbox' value={image2} onChange={(e)=>{imgup(e, 2)}} />
                </div>

                <div className='field'>
                    <div className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        내용
                    </div>
                    <textarea className='inputbox' value={content2} style={{height:"200px", width:"80%"}} onChange={(e)=>{setContent2(e.currentTarget.value)}} />
                </div>

                <div className='field' id='img3'>
                    <div className='subject'>
                        <div className='blackbar'>&nbsp;</div>
                        이미지
                    </div>
                    
                    <div className='afterimage'>
                        <img src={imgsrc3} alt='세번째 이미지' />
                    </div>
                    <input type='file' className='inputbox' value={image3} onChange={(e)=>{imgup(e, 3)}} />
                </div>

                <div className='field'>
                    <div className='subject'>내용</div>
                    <textarea className='inputbox' value={content3} style={{height:"200px", width:"80%"}} onChange={(e)=>{setContent3(e.currentTarget.value)}} />
                </div>

            </div>

            <div className='modifyBtns'>
                <button onClick={()=>{navigate('/adminnewslist')}}>목록으로</button>
                <button onClick={()=>{onsubmit()}}>저장하기</button>
            </div>

            <Footing />
            
        </div>
    )
}

export default Insertnews
