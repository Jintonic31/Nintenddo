import {createSlice} from '@reduxjs/toolkit'

const initialState = {


    userid:'',
    pwd:'',
    name:'',
    email:'',
    phone:'',
    znum:'',
    add1:'',
    add2:'',
    add3:'',
    indate:'',
    useyn:'',
    provider:'',
}

const userSlice = createSlice({


    name:'user',   
    initialState,   
    reducers:{  

        loginAction:(state, action) => {
            state.userid=action.payload.userid;
            state.pwd=action.payload.pwd;
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.phone=action.payload.phone;
            state.znum=action.payload.znum;
            state.add1=action.payload.add1;
            state.add2=action.payload.add2;
            state.add3=action.payload.add3;
            state.indate=action.payload.indate;
            state.useyn=action.payload.useyn;
            state.provider=action.payload.provider;
        },
        logoutAction:(state) => {
            state.userid='';
            state.pwd='';
            state.name='';
            state.email='';
            state.phone='';
            state.znum='';
            state.add1='';
            state.add2='';
            state.add3='';
            state.indate='';
            state.useyn='';
            state.provider='';
        }
    }
})


export const {loginAction, logoutAction} = userSlice.actions;

export default userSlice;
