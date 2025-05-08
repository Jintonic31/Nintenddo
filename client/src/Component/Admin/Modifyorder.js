import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode'

import Heading from '../Heading'
import Footing from '../Footing'
import axios from 'axios'
import Modal from 'react-modal'
import '../../Style/admin/ModifyOrder.css'

function Modifyorder() {

    const navigate = useNavigate();
    const adminUser = useSelector(state => state.admins)
    
    useEffect(()=>{
        if(adminUser.adminid === ''){
            alert('접근권한 없음. 메인페이지로 이동합니다.')
            navigate('/')
        }
    },[])

    const [oneorder, setOneorder] = useState([]);

    useEffect(()=>{
        axios.get('/api/admins/getOrderone')
        .then((result)=>{
            setOneorder(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])


    const [oname, setOname] = useState();
    const [ophone, setOphone] = useState();
    const [oznum, setOznum] = useState();
    const [oadd1, setOadd1] = useState();
    const [oadd2, setOadd2] = useState();
    const [result, setResult] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = ()=>{
        setIsOpen(!isOpen);
    }
    const customStyles = {
        overlay: {
            backgroundColor:"rgba(0,0,0,0.5)",
        },
        content: {
            left:"0",
            margin:"auto",
            width:"500px",
            height:"600px",
            padding:"0",
            overflow:"hidden",
        },
    };
    const completeHandler = (data)=>{
        console.log(data);
        setOznum(data.zonecode);
        setOadd1(data.address);
        setIsOpen(false);        
    }


    function formatDate(utc){
        const date = new Date(utc);
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }

    function onResult(result){
        if(result === '1'){return '결제완료'}
        if(result === '2'){return '배송중'}
        if(result === '3'){return '배송완료'}
        if(result === '4'){return '구매확정'}
    }

    function onsubmit(){
        
        if(result === '' || result === undefined){
            alert('처리 상태를 선택하세요')
            return;
        }

        // console.log("첫번째 : " + oneorder[0].oname)

        // const updatedOname = oname !== '' && oname !== null ? oname : oneorder[0].oname;
        // const updatedOphone = ophone !== '' && ophone !== null ? ophone : oneorder[0].ophone;
        // const updatedOznum = oznum !== '' && oznum !== null ? oznum : oneorder[0].oznum;
        // const updatedOadd1 = oadd1 !== '' && oadd1 !== null ? oadd1 : oneorder[0].oadd1;
        // const updatedOadd2 = oadd2 !== '' && oadd2 !== null ? oadd2 : oneorder[0].oadd2;

        // if(oname === '' || oname === 'undefined'){
        //     setOname(oneorder[0].oname)
        // }
        // console.log("두번째 : " + oneorder[0].oname)
        

        axios.post('/api/admins/updateorder', {oname, ophone, oznum, oadd1, oadd2, result})
        .then((result)=>{
            alert('수정 완료. 목록으로 돌아갑니다.')
            navigate('/adminorderlist')
        })
        .catch((err)=>{console.error(err)})
    }
    
    

    return (
        <div className='Cnt'>

            <Heading />

            <div className='modifyoWrap'>

                <div className='modifylabel'>
                    <div className='redbar'>&nbsp;</div>
                        Modify Order
                    </div>

                    <div className='onemolist'> 
                        <div className='onemolistsub'>
                            <div className='mosubname'>수령인</div>
                            <div className='mosubtel'>연락처</div>
                            <div className='mosubznum'>우편번호</div>
                            <div className='mosubadd'>주소</div>
                            <div className='mosubadd'>상세주소</div>
                            
                        </div>
                        
                        <div className='onemolistinfo'>
                            {oneorder.length > 0 && (
                                <div className='inonemolist'>
                                    
                                    <div className='moonename'>
                                        <div>{oneorder[0].oname}</div>
                                        <input type='text' value={oname} placeholder='수정' onChange={(e)=>{setOname(e.currentTarget.value)}} />
                                    </div>

                                    <div className='moonetel'>
                                        <div>{oneorder[0].ophone}</div>
                                        <input type='text' value={ophone} placeholder='수정' onChange={(e)=>{setOphone(e.currentTarget.value)}} />
                                    </div>

                                    <div className='mooneznum'>
                                        <div>{oneorder[0].oznum}</div>
                                        <div className='moonenew'>
                                            <input type='text' value={oznum} />
                                            <button onClick={()=>{ toggle() }}>찾기</button>
                                        </div>
                                        <div>
                                            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} >
                                                <DaumPostcode onComplete={completeHandler} />
                                            </Modal>
                                        </div>
                                        
                                    </div>

                                    <div className='mooneadd'>
                                        <div>{oneorder[0].oadd1}</div>
                                        <input type='text' value={oadd1} />
                                    </div>

                                    <div className='mooneadd'>
                                        <div>{oneorder[0].oadd2}</div>
                                        <input type='text' value={oadd2} placeholder='수정' onChange={(e)=>{setOadd2(e.currentTarget.value)}}/>
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    

                    <div className='onemolist'>
                        <div className='onemolistsub'>
                            <div className='mosubno'>주문번호</div>
                            <div className='mosubuser'>주문자</div>
                            <div className='mosubimg'>&nbsp;</div>
                            <div className='mosubpname'>상품명</div>
                            <div className='mosubqty'>수량</div>
                            <div className='mosubindate'>주문일자</div>
                            <div className='mosubprice'>결제금액</div>
                            <div className='mosubresult'>처리상태</div>
                        </div>

                        <div className='onemolistinfo'>
                            {
                                (!oneorder || oneorder.length === 0)?(<h3>완료된 주문이 없습니다.</h3>):(
                                    
                                    oneorder.map((odone, idx)=>{
                                        return(
                                            <div className='inonemolist'>

                                                <div className='mooneno'>
                                                    {odone.oseq}
                                                </div>

                                                <div className='mooneuser'>
                                                    {odone.email}
                                                </div>

                                                <div className='mooneimg'>

                                                    <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+odone.image} alt='' />

                                                </div>

                                                <div className='moonepname'>
                                                    {odone.pname}
                                                </div>

                                                <div className='mooneqty'>
                                                    {odone.quantity}
                                                </div>

                                                <div className='mooneindate'>{formatDate(odone.indate)}</div>

                                                <div className='mooneprice'>
                                                    ￦&nbsp;{new Intl.NumberFormat('ko-KR').format(odone.price1)}
                                                </div>

                                                <div className='mooneresult'>
                                                    <div>
                                                        {onResult(odone.result)}
                                                    </div>
                                                    <select onChange={(e)=>{setResult(e.target.value);}}>
                                                        <option value={''} selected>
                                                            ---선택---
                                                        </option>
                                                        <option value={'1'}>결제완료</option>
                                                        <option value={'2'}>배송중</option>
                                                        <option value={'3'}>배송완료</option>
                                                        <option value={'4'}>구매확정</option>
                                                    </select>
                                                    
                                                </div>

                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                </div>

                <div className='moBtns'>
                    <button onClick={()=>{navigate('/adminorderlist')}}>목록으로</button>
                    <button onClick={()=>{onsubmit()}}>저장하기</button>
                </div>

            </div>

            <Footing />
        
        </div>
    )
}

export default Modifyorder
