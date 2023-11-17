import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import User from "../pages/Users";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/users',
                element: <User/>
            }
        ]
    }
])

export default routes;