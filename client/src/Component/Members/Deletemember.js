import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import { logoutAction } from '../../store/userSlice';

import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'

function Deletemember() {
    const loginUser = useSelector( state=>state.user );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        let ans = window.confirm('정말로 탈퇴하시겠습니까?');
        if( ans ){
            axios.post('/api/members/deletemember', null, {params:{ email:loginUser.email } } )
            .then(()=>{
                dispatch( logoutAction() );
                navigate('/');
            })
            .catch((err)=>{
                console.error(err)
            })
        }else{
            navigate('/');
        }
    },[]);
    return (
        <div>
        
        </div>
    )
}

export default Deletemember
