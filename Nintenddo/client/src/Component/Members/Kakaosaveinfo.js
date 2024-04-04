import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import axios from 'axios'

function Kakaosaveinfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.post('/api/members/getLoginUser' );
                console.log( 'loginUser : ', result.data.loginUser )
                dispatch( loginAction( result.data.loginUser ) );
                alert('환영합니다!');
                navigate('/');
            }catch(err){
                console.error(err)
            }
        }
        fetchData();
    },[])
    return (
        <div>
            
        </div>
  )
}

export default Kakaosaveinfo
