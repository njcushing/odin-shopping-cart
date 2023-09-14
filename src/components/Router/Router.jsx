import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./../App/App";
import Cart from "./../Cart/Cart";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;