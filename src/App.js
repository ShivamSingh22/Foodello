import React from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import Error from "./components/Error.js";
import Contact from "./components/Contact.js";
import { createBrowserRouter, RouterProvider,Outlet} from "react-router-dom";
import RestaurantDetail from "./components/RestaurantDetail.js";

const AppLayout = () => {
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantDetail/>,
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
