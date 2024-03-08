import { Suspense, lazy } from 'react';
const {createBrowserRouter} = require('react-router-dom')


const Loading = <div style={{color:"red"}}><h3>Loading...</h3></div>
const Index = lazy( ()=>import('../Component/Index') )


const root = createBrowserRouter([

    {
        path:'',
        element:<Suspense fallback={Loading}><Index /></Suspense>
    },




]);



export default root;