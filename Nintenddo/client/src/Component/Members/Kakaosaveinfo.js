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
                const result = await axios.get( '/api/members/getLoginUser' );
                console.log( 'loginUser : ', result.data.loginUser )
                const userEmail = result.data.loginUser ? result.data.loginUser.email : null;
                dispatch(loginAction(userEmail));
                dispatch( loginAction( result.data.loginUser ) );
                alert('정상 로그인 되었습니다');
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
