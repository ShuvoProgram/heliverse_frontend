import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import User from "../pages/Users";
import TeamPage from "../pages/TeamPage";


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
            },
            {
                path: '/team',
                element: <TeamPage/>
            }
        ]
    }
])

export default routes;