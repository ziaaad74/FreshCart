import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import { CartProvider } from "./context/Card.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Offline from "./components/Offline/Offline";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Brands from "./pages/Brands/Brands";
import Wishlist from "./pages/Wishlist/Wishlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./context/User.Context";
import ProductsProvider from "./context/Products.context";
import WhishListProvider from "./context/Wishlist.context";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <Wishlist /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  let myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>
              <WhishListProvider>
                <RouterProvider router={router} />
              </WhishListProvider>
            </CartProvider>
          </ProductsProvider>
        </UserProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Offline>
        <div className="bg-gray-200 p-4 font-semibold shadow text-slate-600 rounded-lg fixed right-8 bottom-8 z-50">
          <i className="fa-solid fa-wifi mr-2 text-red-600"></i>
          <span>Check Your Internet Connection</span>
        </div>
      </Offline>
    </>
  );
}
