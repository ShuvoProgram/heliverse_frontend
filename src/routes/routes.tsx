import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../pages/Users";
import TeamPage from "../pages/TeamPage";
import TeamDetails from "../pages/TeamDetails";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <User/>
            },
            {
                path: '/team',
                element: <TeamPage/>
            },
            {
                path: '/team/:id',
                element: <TeamDetails/>
            }
        ]
    }
])

export default routes;