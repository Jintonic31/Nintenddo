import React ,{useState, useEffect} from 'react'
import Heading from '../headerfooter/Heading'
import Footing from '../headerfooter/Footing'
import Subimg_customer from '../include/Subimg_customer'
import Submenu_customer from '../include/Submenu_customer'
import axios from 'axios'
import '../../Style/customer.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Qnaview() {
    const [qna, setQna] = useState({})
    useEffect(()=>{
        axios.get('/api/customer/getqna')
        .then((result)=>{
            setQna( result.data.qna );
        })
    },[])
    return (
        <div className='container'>
            <Heading />
            <Subimg_customer />
            <div className='subPage'>
                <div className='smenu'><Submenu_customer /></div>
                <article className='qna'>
                    {
                        (qna)?(
                            <div className='qnaview'>
                                <h2>QnA View</h2>
                                <div className='field'>
                                    <label>email</label>
                                    <div>{qna.email}</div>
                                </div>
                                <div className='field'>
                                    <label>title</label>
                                    <div>{qna.title}</div>
                                </div>
                                <div className='field'>
                                    <label>content</label>
                                    <div><pre>{qna.content}</pre></div>
                                </div>
                                <div className='field'>
                                    <label>Reply</label>
                                    <div>{qna.reply}</div>
                                </div>
                            </div>
                        ):(<div>Loading</div>)
                    }
                </article>
            </div>
            <Footing />
        </div>
    )
}

export default Qnaview
