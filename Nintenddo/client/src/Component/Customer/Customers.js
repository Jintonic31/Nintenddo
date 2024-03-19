import React , {useState, useEffect} from 'react'
import axios from 'axios'
//import '../../Style/customer.css'

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Customers() {
    const [qnaList, setQnaList] = useState([]);
    const [paging, setPaging]  =useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/api/customer/qnalist/1')
        .then((result)=>{
            setQnaList( result.data.qnalist );
            setPaging( result.data.paging);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[])

    useEffect(
        ()=>{
            window.addEventListener("scroll", handleScroll);
            return ()=>{
                window.removeEventListener("scroll", handleScroll);
            }
        }
    );

    const handleScroll=()=>{
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight; 
        if(scrollTop + clientHeight >= scrollHeight ) {
            //alert(paging.page);
            onPageMove( Number( paging.page ) + 1 );
        }
    }
    function onPageMove(p){
        axios.get(`/api/customer/qnalist/${p}`)
        .then((result)=>{
            let qnas = [];
            qnas = [...qnaList];
            qnas = [...qnas, ...result.data.qnalist];
            setQnaList([...qnas]);
            setPaging( result.data.paging );
        }) 
        .catch((err)=>{console.error(err)})
    }


    function qnaView(qseq){
        axios.post('/api/customer/qseqsv', null, {params:{ qseq } } )
        .then(()=>{
            navigate('/qnaview')
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    return (
        <div className='container'>
            <div className='subPage'>
                <div className='smenu'></div>
                <article>
                    <h2>Qna List</h2>
                    <div className="qnatable">
                        <div className="row">
                            <div className="col">번호</div>	<div className="col">제목</div>
                            <div className="col">등록일</div><div className="col">답변여부</div>
                        </div>
                        {
                            (qnaList)?(
                                qnaList.map((qna, idx)=>{
                                    return (
                                        <div className="row" key='idx'>
                                            <div className="col">{qna.qseq}</div>
                                            <div className="col" onClick={
                                                ()=>{
                                                    qnaView(qna.qseq);
                                                }
                                            }>{qna.subject}</div>
                                            <div className="col">{qna.indate.substring(0,10)}</div>
                                            <div className="col">{qna.rep}</div>
                                        </div>
                                    )
                                })
                            ):(
                                <div className="row">
                                    <div className="col">Qna가 하나도 없습니다</div>
                                </div>
                            )
                        }
                    </div>
                </article>
            </div>     
        </div>
    )
}

export default Customers
