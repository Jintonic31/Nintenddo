import {createSlice} from '@reduxjs/toolkit'

const initialState = {

    userid:'',
    email:'',
    pwd:'',
    phone:'',
    indate:'',
    znum:'',
    add1:'',
    add2:'',
    add3:'',
    provider:'',
    useyn:'',
    gender:'',
    bmonth:'',
    byear:'',
    bday:'',
    country:''
}

const userSlice = createSlice({


    name:'user',   
    initialState,   
    reducers:{  

        loginAction:(state, action) => {
            state.userid=action.payload.userid;
            state.email=action.payload.email;
            state.pwd=action.payload.pwd;
            state.phone=action.payload.phone;
            state.indate=action.payload.indate;
            state.znum=action.payload.znum;
            state.add1=action.payload.add1;
            state.add2=action.payload.add2;
            state.add3=action.payload.add3;
            state.provider=action.payload.provider;
            state.useyn=action.payload.useyn;
            state.gender=action.payload.gender;
            state.bmonth=action.payload.bmonth;
            state.byear=action.payload.byear;
            state.bday=action.payload.bday;
            state.country=action.payload.country;
            
        },
        logoutAction:(state) => {
            state.userid='';
            state.email='';
            state.pwd='';
            state.phone='';
            state.indate='';
            state.znum='';
            state.add1='';
            state.add2='';
            state.add3='';
            state.provider='';
            state.useyn='';
            state.gender='';
            state.bmonth='';
            state.byear='';
            state.bday='';
            state.country='';
            
        }
    }
})


export const {loginAction, logoutAction} = userSlice.actions;

export default userSlice;
