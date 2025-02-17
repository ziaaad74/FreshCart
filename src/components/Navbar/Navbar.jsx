/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/Card.context";
import { userContext } from "../../context/User.Context";
import { WishListContext } from "../../context/Wishlist.context";

export default function Navbar() {
  let { token, logOut } = useContext(userContext);
  let { cardInfo, getProductFromCart } = useContext(cartContext);
  const { productWishlist, getLoggedUserWishlist } =
    useContext(WishListContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getProductFromCart();
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 fixed top-0 right-0 left-0 w-full z-50">
        <div className="container mx-auto py-3 flex items-center justify-between px-2">
          <div className="flex items-center">
            <img src={freshCartLogo} alt="FreshCart Logo" className="w-32" />
          </div>

          {token && (
            <ul className="hidden md:flex space-x-6">
              {["Home", "Products", "Categories", "Brands", "Orders"].map(
                (item) => (
                  <NavLink
                    key={item}
                    className={({ isActive }) =>
                      `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1 before:transition-[width] before:duration-300 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`
                    }
                    to={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </NavLink>
                )
              )}
            </ul>
          )}

          <button
            className="md:hidden text-3xl text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5 z-50 transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="text-2xl absolute top-2 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              ✖
            </button>
            <ul className="flex flex-col space-y-5 mt-10">
              {["Home", "Products", "Categories", "Brands", "Orders"].map(
                (item) => (
                  <NavLink
                    key={item}
                    className={({ isActive }) =>
                      `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1 before:transition-[width] before:duration-300 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`
                    }
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </NavLink>
                )
              )}
            </ul>
          </div>

          <div className="flex items-center space-x-6">
            {!token ? (
              <div className="flex space-x-5">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-6 text-primary-600">
                <Link to="/wishlist" className="relative">
                  <i className="fa-solid fa-heart text-2xl hover:text-primary-700 transition-colors"></i>
                  {productWishlist && productWishlist.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                      {productWishlist.count}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative">
                  <i className="fa-solid fa-cart-shopping text-2xl hover:text-primary-700 transition-colors"></i>
                  {cardInfo && cardInfo.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                      {cardInfo.numOfCartItems}
                    </span>
                  )}
                </Link>

                {/* Logout */}
                <i
                  onClick={logOut}
                  className="fa-solid fa-right-from-bracket cursor-pointer text-2xl text-orange-500"
                ></i>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
