import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import ProductDetail from './Productdetail'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/Product/software.css'

function Software() {

    const [softList, setSoftList] = useState([]);
    const [unreleaseList, setUnreleaseList] = useState([])
    const [displayNum, setDisplayNum] = useState(8)
    const [displayNum2, setDisplayNum2] = useState(8)
    const [keyword, setKeyword] = useState();
    const [selectProduct, setSelectProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        axios.post('/api/products/getsoftlist', null, {params:{pcseq:2}})
        .then((result)=>{
            setSoftList(result.data)
        })
        .catch((err)=>{console.error(err)})

        axios.post('/api/products/getunreleaselist', null, {params:{pcseq:2}})
        .then((result)=>{
            setUnreleaseList(result.data);
        })
        .catch((err)=>{console.error(err)})
    },[])

    const handleKeywordChange = (e) => {
         setKeyword(e.target.value.toLowerCase()); // 검색어를 소문자로 변환하여 상품명과 비교하기 위해

        // 검색어가 없으면 모든 상품을 보이도록 함
        if (!e.target.value.trim()) {
        // trim : 문자열 양 끝 공백 제거
        // 즉 양 끝 공백을 제거한 상태에서 e.target.value의 값이 공란(!)이라면 keyword 초기화
            setKeyword('');
        }
    };

    const openModal = (pseq) => {
        setSelectProduct(pseq);
        setIsOpen(!isOpen);
    }
    const modalStyle = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"900px",
            height:"700px",
            padding:"0",
        },
    }

    const closeModal = () => {
        setSelectProduct(null);
        setIsOpen(!isOpen);
    }

    const handleShowMore = () => {
        setDisplayNum(displayNum + 4);
    }
    const handleShowMore2 = () => {
        setDisplayNum2(displayNum2 + 4);
    }

    return (


        <div className='Cnt'>

            <Heading />

            <div className='softBanner'>
                    {
                        (softList)?(
                            softList.slice(0,8).map((soft, idx)=>{
                                return(
                                    <div className='softBannerImg'>
                                        <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+soft.image} alt='' />
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>

                <div className='searchSoft'>
                    <input type='text' placeholder='키워드를 입력해주세요' value={keyword} onChange={handleKeywordChange} />
                    <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+'gosearch.png'} alt='' />
                </div>


            <div className='softwareCnt'>

                
                <div className='softwareTitle'>
                    <div className='titleKr'>최신 소프트웨어</div>
                    <div className='titleEn'>Released</div>
                </div>

                <div className='softwareContent'>
                    {
                        (softList)?(
                            softList
                            .slice(0,displayNum)
                            .map((soft, idx)=>{
                                if(!keyword || soft.pname.toLowerCase().includes(keyword))
                                return(
                                    <div className='softwareList' onClick={()=>{openModal(soft.pseq)}}>
                                        <div className='softlistImage'>
                                            <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+soft.image} alt='' />
                                        </div>
                                        
                                        <div className='softlisthardware'>
                                            Nintendo Switch
                                        </div>
                                        <div className='softlisttitle'>{soft.pname}</div>

                                        <div className='softindate'>
                                            소프트웨어<br />
                                            발매일 : {soft.indate.substring(0,10)}
                                        </div>
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>
                
                {softList.length > displayNum && (
                    <div className='showmoreBtn'>
                        <button onClick={handleShowMore}>
                            <img src= {process.env.REACT_APP_IMG_SRC +'news/'+'showmorebtn.png'} alt='' />
                            더보기
                        </button>
                    </div>
                )}
                
                
                

                <div className='softwareTitle'>
                    <div className='titleKr'>발매예정 소프트웨어</div>
                    <div className='titleEn'>Comming Soon</div>
                </div>

                <div className='softwareContent'>
                    {
                        (unreleaseList)?(
                            unreleaseList
                            .slice(0, displayNum2)
                            .map((soft, idx)=>{
                                return(
                                    <div className='softwareList'>
                                        <div className='softlistImage'>
                                            <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+soft.image} alt='' />
                                        </div>
                                        
                                        <div className='softlisthardware'>
                                            Nintendo Switch
                                        </div>
                                        <div className='softlisttitle'>{soft.pname}</div>

                                        <div className='softindate'>
                                            소프트웨어<br />
                                            발매예정일 : {soft.indate.substring(0,10)}
                                        </div>
                                    </div>
                                )
                            })
                        ):(null)
                    }
                </div>
                
                {unreleaseList.length > displayNum2 && (
                    <div className='showmoreBtn'>
                        <button onClick={handleShowMore2}>
                            <img src= {process.env.REACT_APP_IMG_SRC +'news/'+'showmorebtn.png'} alt='' />
                            더보기
                        </button>
                    </div>
                )}
                

            </div>

            <Footing />

            <Modal isOpen={isOpen} style={modalStyle}>
                <ProductDetail pseq={selectProduct} closeModal={closeModal} />
            </Modal>

        </div>
    )
}

export default Software
