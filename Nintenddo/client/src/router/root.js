import { Suspense, lazy } from 'react';
const {createBrowserRouter} = require('react-router-dom')


const Loading = <div style={{color:"red"}}><h3>Loading...</h3></div>
const Index = lazy( ()=>import('../Component/Index') )
const Login = lazy( ()=>import('../Component/Members/Login') )
const Joinform = lazy( ()=>import('../Component/Members/Joinform') )
const Loginpage = lazy( ()=>import('../Component/Members/Loginpage') )
const Updatemember = lazy( ()=>import('../Component/Members/Updatemember') )
const Deletemember = lazy( ()=>import('../Component/Members/Deletemember') )
const Kakaosaveinfo = lazy( ()=>import('../Component/Members/Kakaosaveinfo') )

//자리침범금지




// Product
const Hardware = lazy( ()=>import('../Component/Product/Hardware') )
const Software = lazy( ()=>import('../Component/Product/Software') )
const Controller = lazy( ()=>import('../Component/Product/Controller') )
const Cartlist = lazy( ()=>import('../Component/Cart/Cartlist') )
const Writedelivery = lazy( ()=>import('../Component/Cart/Writedelivery') )
const Completeorder = lazy( ()=>import('../Component/Order/Completeorder') )
const Orderall = lazy( ()=>import('../Component/Order/Orderall') )


//News
const Newsdetail = lazy( ()=>import('../Component/News/Newsdetail') )
const Newslist = lazy( ()=>import('../Component/News/Newslist') )



// Aboutus
const Aboutus = lazy( ()=>import('../Component/Aboutus/Aboutus') )
const Adminlogin = lazy( ()=>import('../Component/Admin/Adminlogin') )
const Adminproductlist = lazy( ()=>import('../Component/Admin/Adminproductlist') )
const Modifyproduct = lazy( ()=>import('../Component/Admin/Modifyproduct') )
const Insertproduct = lazy( ()=>import('../Component/Admin/Insertproduct') )
const Adminnewslist = lazy( ()=>import('../Component/Admin/Adminnewslist') )
const Modifynews = lazy( ()=>import('../Component/Admin/Modifynews') )
const Insertnews = lazy( ()=>import('../Component/Admin/Insertnews') )
const Adminorderlist = lazy( ()=>import('../Component/Admin/Adminorderlist') )
const Modifyorder = lazy( ()=>import('../Component/Admin/Modifyorder') )





//Customer
const Chatbot = lazy( ()=>import('../Component/Customer/Chatbot') )
const Customers = lazy( ()=>import('../Component/Customer/Customers') )
const Qnaview = lazy( ()=>import('../Component/Customer/Qnaview') )
const Writeqna = lazy( ()=>import('../Component/Customer/Writeqna') )



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
    {
        path:'kakaosaveinfo',
        element:<Suspense fallback={Loading}><Kakaosaveinfo /></Suspense>
    },


    


    // Product, Cart, Order
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


    // News
    {
        path:'newsdetail',
        element:<Suspense fallback={Loading}><Newsdetail /></Suspense>
    },
    {
        path:'newslist',
        element:<Suspense fallback={Loading}><Newslist /></Suspense>
    },
    


    // Aboutus
    {
        path:'aboutus',
        element:<Suspense fallback={Loading}><Aboutus /></Suspense>
    },
    {
        path:'adminlogin',
        element:<Suspense fallback={Loading}><Adminlogin /></Suspense>
    },
    {
        path:'adminproductlist',
        element:<Suspense fallback={Loading}><Adminproductlist /></Suspense>
    },
    {
        path:'modifyproduct',
        element:<Suspense fallback={Loading}><Modifyproduct /></Suspense>
    },
    {
        path:'insertproduct',
        element:<Suspense fallback={Loading}><Insertproduct /></Suspense>
    },
    {
        path:'adminnewslist',
        element:<Suspense fallback={Loading}><Adminnewslist /></Suspense>
    },
    {
        path:'modifynews',
        element:<Suspense fallback={Loading}><Modifynews /></Suspense>
    },
    {
        path:'insertnews',
        element:<Suspense fallback={Loading}><Insertnews /></Suspense>
    },
    {
        path:'adminorderlist',
        element:<Suspense fallback={Loading}><Adminorderlist /></Suspense>
    },
    {
        path:'modifyorder',
        element:<Suspense fallback={Loading}><Modifyorder /></Suspense>
    },
    
    
    {
        path:'chatbot',
        element:<Suspense fallback={Loading}><Chatbot /></Suspense>
    },
    {
        path:'customers',
        element:<Suspense fallback={Loading}><Customers /></Suspense>
    },
    {
        path:'qnaview',
        element:<Suspense fallback={Loading}><Qnaview /></Suspense>
    },
    {
        path:'writeqna',
        element:<Suspense fallback={Loading}><Writeqna /></Suspense>
    },



]);



export default root;