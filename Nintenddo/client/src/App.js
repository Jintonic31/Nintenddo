import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom"

import root from './router/root';   

function App() {
    return (
      <RouterProvider router={root}></RouterProvider>
    );
}

export default App;