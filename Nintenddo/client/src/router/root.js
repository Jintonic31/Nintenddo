import { Suspense, lazy } from 'react';
const {createBrowserRouter} = require('react-router-dom')


const Loading = <div style={{color:"red"}}><h3>Loading...</h3></div>
const Index = lazy( ()=>import('../Component/Index') )
const Login = lazy( ()=>import('../Component/Members/Login') )
const Joinform = lazy( ()=>import('../Component/Members/Joinform') )
const Hardware = lazy( ()=>import('../Component/Product/Hardware') )



const root = createBrowserRouter([

    {
        path:'',
        element:<Suspense fallback={Loading}><Index /></Suspense>
    },

    {
        path:'login',
        element:<Suspense fallback={Loading}><Login /></Suspense>
    },
    {
        path:'joinform',
        element:<Suspense fallback={Loading}><Joinform /></Suspense>
    },





    {
        path:'hardware',
        element:<Suspense fallback={Loading}><Hardware /></Suspense>
    },




]);



export default root;