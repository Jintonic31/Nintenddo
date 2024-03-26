import { Suspense, lazy } from 'react';
const {createBrowserRouter} = require('react-router-dom')


const Loading = <div style={{color:"red"}}><h3>Loading...</h3></div>
const Index = lazy( ()=>import('../Component/Index') )
const Login = lazy( ()=>import('../Component/Members/Login') )
const Joinform = lazy( ()=>import('../Component/Members/Joinform') )
const Loginpage = lazy( ()=>import('../Component/Members/Loginpage') )
const Updatemember = lazy( ()=>import('../Component/Members/Updatemember') )
const Deletemember = lazy( ()=>import('../Component/Members/Deletemember') )

//자리침범금지




// 사회적 거리두기
const Hardware = lazy( ()=>import('../Component/Product/Hardware') )
const Software = lazy( ()=>import('../Component/Product/Software') )
const Controller = lazy( ()=>import('../Component/Product/Controller') )
const Cartlist = lazy( ()=>import('../Component/Cart/Cartlist') )
const Writedelivery = lazy( ()=>import('../Component/Cart/Writedelivery') )
const Completeorder = lazy( ()=>import('../Component/Order/Completeorder') )
const Orderall = lazy( ()=>import('../Component/Order/Orderall') )



// Aboutus
const Aboutus = lazy( ()=>import('../Component/Aboutus/Aboutus') )
const Adminlogin = lazy( ()=>import('../Component/Admin/Adminlogin') )
const Modifyproduct = lazy( ()=>import('../Component/Admin/Modifyproduct') )



//Customer




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
        path:'loginpage',
        element:<Suspense fallback={Loading}><Loginpage /></Suspense>
    },
    {
        path:'updatemember',
        element:<Suspense fallback={Loading}><Updatemember /></Suspense>
    },
    {
        path:'deletemember',
        element:<Suspense fallback={Loading}><Deletemember /></Suspense>
    },


    


    // 사회적 거리두기
    {
        path:'hardware',
        element:<Suspense fallback={Loading}><Hardware /></Suspense>
    },
    {
        path:'software',
        element:<Suspense fallback={Loading}><Software /></Suspense>
    },
    {
        path:'controller',
        element:<Suspense fallback={Loading}><Controller /></Suspense>
    },
    {
        path:'cartlist',
        element:<Suspense fallback={Loading}><Cartlist /></Suspense>
    },
    {
        path:'writedelivery',
        element:<Suspense fallback={Loading}><Writedelivery /></Suspense>
    },
    {
        path:'completeorder',
        element:<Suspense fallback={Loading}><Completeorder /></Suspense>
    },
    {
        path:'orderall',
        element:<Suspense fallback={Loading}><Orderall /></Suspense>
    },
    {
        path:'aboutus',
        element:<Suspense fallback={Loading}><Aboutus /></Suspense>
    },
    {
        path:'adminlogin',
        element:<Suspense fallback={Loading}><Adminlogin /></Suspense>
    },
    {
        path:'modifyproduct',
        element:<Suspense fallback={Loading}><Modifyproduct /></Suspense>
    },
    



]);



export default root;