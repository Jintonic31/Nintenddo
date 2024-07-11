import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import '../../Style/admin/ModifyProduct.css'

function Modifyproduct() {

    const navigate = useNavigate();
    const adminUser = useSelector(state => state.admins)
    
    useEffect(()=>{
        if(adminUser.adminid === ''){
            alert('접근권한 없음. 메인페이지로 이동합니다.')
            navigate('/')
        }
    },[]) 

    const [oneproduct, setOneProduct] = useState([]);

    const [pcseq, setPcseq] = useState();
    const [pname, setPname] = useState();
    const [content, setContent] = useState();
    const [imgsrc, setImgsrc] = useState('');
    const [filename, setFilename] = useState();
    const [price1, setPrice1] = useState();
    const [price2, setPrice2] = useState();
    const [price3, setPrice3] = useState();
    const [bestyn, setBestyn] = useState();
    const [useyn, setUseyn] = useState();
    const [includes, setIncludes] = useState();



    useEffect(()=>{
        axios.post('/api/admins/getoneproduct')
        .then((result)=>{
            setOneProduct(result.data.product);
        })
        .catch((err)=>{console.error(err)})
    },[])



    function imgup(e){
        const formData = new FormData();
        // ㄴ FormData : JavaScript를 통해 파일 업로드 및 기타 (HTML)폼 데이터를 서버로 전송하는 것이 가능 
        // ㄴ (HTML)폼 데이터 : 사용자가 form태그 안에서 입력 필드(text, checkbox, radio 등)를 통해 정보를 제출할 수 있는 모든 데이터

        formData.append('image', e.target.files[0]);
        // ㄴ 파일 입력 필드에서 선택한 첫번째 파일을 image라는 이름으로 추가(append)

        axios.post('/api/admins/imgup', formData)
        .then((result)=>{
            setFilename(result.data.filename);
            // setImgsrc(result.data.filesrc)
            setImgsrc(`${process.env.REACT_APP_IMG_SRC}product/productdetail/${result.data.filename}`)
        })
        .catch((err)=>{console.error(err)})
    }


    function onPcseq(pcseq) {
        if (pcseq === 1) {return "하드웨어";}
        else if (pcseq === 2) {return "소프트웨어";}
        else if (pcseq === 3) {return "아미보";}
        else if (pcseq === 4) {return "앱";}
        else if (pcseq === 5) {return "컨트롤러";}
        else if (pcseq === 6) {return "조이콘";}
        else if (pcseq === 7) {return "기타";}
    }

    function onsubmit(){
        axios.post('/api/admins/updateproduct', {pseq:oneproduct.pseq, pcseq, pname, content, includes, price1, price2, price3, useyn, bestyn, image:filename})
        .then((result)=>{
            alert('수정 완료. 목록으로 돌아갑니다.')
            navigate('/adminproductlist')
        })
        .catch((err)=>{console.error(err)})
    }

    function ondelete(){
        axios.delete('/api/admins/deleteproduct')
        try{
            alert('삭제 완료. 목록으로 돌아갑니다.')
            navigate('/adminproductlist')
        }catch(err){
            console.error(err);
        }
    }


    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifylabel'>
                <div className='redbar'>&nbsp;</div>
                Modify Product
            </div>

            <div className='modifypdtWrap'>

                <div className='modifypdtimg'>
                    <div>Before</div>
                    <img src={`${process.env.REACT_APP_IMG_SRC}product/productdetail/${oneproduct.image}`}  alt='' />
                    <div>After</div>
                    <img src={imgsrc} alt='수정 후 이미지' />
                </div>

                <div className='modifypdttext'>

                    <div className='onemodifyfield'>
                        <div className='subject'>NO.</div>
                        <input className='inputbox' type='text' value={oneproduct.pseq} readOnly />
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>분류</div>
                        <input className='inputbox' type='text' value={onPcseq(oneproduct.pcseq)} readOnly />
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>상품명</div>
                        <input className='inputbox' type='text' placeholder={oneproduct.pname} value={pname} onChange={(e)=>{setPname(e.currentTarget.value)}} />
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>상품정보</div>
                        <textarea className='inputbox'  placeholder={oneproduct.content} value={content} style={{height:"150px", width:"98%"}} type='text' onChange={(e)=>{setContent(e.currentTarget.value)}} />
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>동봉품</div>
                        <input className='inputbox' type='text' placeholder={oneproduct.includes} value={includes} onChange={(e)=>{setIncludes(e.currentTarget.value)}} />
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>
                            <div className='price'>판매가</div>
                            <div className='price'>원가</div>
                            <div className='price'>마진</div>
                        </div>
                        <div className='inputboxdiv'>
                            <input type='text' placeholder={oneproduct.price1} value={price1} onChange={(e)=>{setPrice1(e.currentTarget.value)}} />
                            <input type='text' placeholder={oneproduct.price2} value={price2}  onChange={(e)=>{setPrice2(e.currentTarget.value)}} />
                            <input type='text' placeholder={oneproduct.price3} value={price3}  onChange={(e)=>{setPrice3(e.currentTarget.value)}} />
                        </div>
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>
                            <div className='yesorno'>사용 여부</div>
                            <div className='yesorno'>인기 여부</div>
                            </div>
                        <div className='inputboxdiv'>
                            <select onChange={(e) => { setUseyn(e.target.value); }}>
                                <option value='' selected>필수선택</option>
                                <option value={'Y'}>Y</option>
                                <option value={'N'}>N</option>
                            </select>
                            <select onChange={(e) => { setBestyn(e.target.value); }}>
                                <option value='' selected>필수선택</option>
                                <option value={'Y'}>Y</option>
                                <option value={'N'}>N</option>
                            </select>
                        </div>
                    </div>

                    <div className='onemodifyfield'>
                        <div className='subject'>이미지</div>
                        <input className='inputbox' type='file' onChange={ (e)=>{imgup(e)} } />
                    </div>

                </div>

            </div>

            <div className='modifyBtns'>
                <button onClick={()=>{navigate('/adminproductlist')}}>목록으로</button>
                <button onClick={()=>{onsubmit()}}>저장하기</button>
                <button onClick={()=>{ondelete()}}>삭제하기</button>
            </div>
                

            <Footing />
        </div>
    )
}

export default Modifyproduct
