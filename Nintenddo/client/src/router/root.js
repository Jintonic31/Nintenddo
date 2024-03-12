import { Suspense, lazy } from 'react';
const {createBrowserRouter} = require('react-router-dom')


const Loading = <div style={{color:"red"}}><h3>Loading...</h3></div>
const Index = lazy( ()=>import('../Component/Index') )
const Login = lazy( ()=>import('../Component/Members/Login') )
const Joinform = lazy( ()=>import('../Component/Members/Joinform') )



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




]);



export default root;