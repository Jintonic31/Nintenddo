import React ,{useState} from 'react'
import Heading from '../headerfooter/Heading'
import Footing from '../headerfooter/Footing'
import Subimg_customer from '../include/Subimg_customer'
import Submenu_customer from '../include/Submenu_customer'
import axios from 'axios'
import '../../Style/customer.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Writeqna() {
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const loginUser = useSelector(state=>state.user);
    const navigate = useNavigate();

    function onSubmit(){
        axios.post( '/api/customer/writeqna', { subject, content, id:loginUser.userid, rep:'N'} )
        .then(()=>{
            navigate('/customers')
        })
        .catch((err)=>{
            console.error(err)
        })
    }
    return (
        <div className='container'>
            <Heading />
            <Subimg_customer />
            <div className='subPage'>
                <div className='smenu'><Submenu_customer /></div>
                <article>
                    <div className='qnawriteform'>
                        <h2>Write QnA</h2>
                        <div className="field">
                            <label>Subject</label>
                            <input type="text" value={subject} onChange={
                                (e)=>{ setSubject(e.currentTarget.value) }
                            }/>
                        </div>
                        <div className="field">
                            <label>Content</label>
                            <textarea rows="7" value={content} onChange={
                                (e)=>{ setContent(e.currentTarget.value) }
                            }></textarea>
                        </div>
                        <div className='btns'>
                            <button onClick={
                                ()=>{
                                    onSubmit()
                                }
                            }>글쓰기</button>
                            <button>리스트로</button>
                        </div>
                    </div>
                </article>
            </div>
            <Footing />
        </div>
    )
}

export default Writeqna
