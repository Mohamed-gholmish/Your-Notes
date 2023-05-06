import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import NoteContextProvider from "./Context/NoteContext.jsx";

function App() {
  const routes = createBrowserRouter([{
    path:"/",element :<ProtectedRoute><Layout/></ProtectedRoute> , children:[{index : true ,element:<Home/>}] },
  {path:"/Login",element:<Login/>},
{path:"/Register",element : <Register/>}]);
  return (<><NoteContextProvider><UserContextProvider><RouterProvider router={routes}/></UserContextProvider></NoteContextProvider> </>);
}

export default App;

// <protectedroute><layout></layout></protectedroute>
// instead of make protected route for all elemts in lay out