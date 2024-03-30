import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminid:'',
    pwd:'',
    phone:''
}

const adminsSlice = createSlice({

    name:'admins',
    initialState,
    reducers:{
        adminAction:(state, action) => {
            state.adminid = action.payload.adminid;
            state.pwd = action.payload.pwd;
            state.phone = action.payload.phone;
        },
        adminoutAction:(state, action) => {
            state.adminid = '';
            state.pwd = '';
            state.phone = '';
        }
    }
})

export const {adminAction, adminoutAction} = adminsSlice.actions;

export default adminsSlice;