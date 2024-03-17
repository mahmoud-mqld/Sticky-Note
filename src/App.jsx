import "./App.css";
import Home from './Components/Home/Home';
import Sidebar from "./Components/Sidebar/Sidebar";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Note from './Components/Note/Note';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import InverseProtectedRoute from "./Components/InverseProtectedRoute/InverseProtectedRoute";
import Notfound from './Components/Notfound/NotFound';

function App() {

  let routes = createHashRouter([
    {
      path:'',element: <Layout/> , children: [
        {
        path: "register", element: <InverseProtectedRoute><Register/></InverseProtectedRoute> 
      },
      {
        path:"login", element:<InverseProtectedRoute> <Login/></InverseProtectedRoute>
      },
      {
        path:'home',element:<Home/>
      },
      {
        index:true,element:<Login/>
      },
      {
        path:'*',element:<Notfound/>
      }
    ]
    }
  ])
 
  return <>

<RecoilRoot>
  <RouterProvider router={routes}/>
</RecoilRoot>
  




  </>;
}

export default App;
