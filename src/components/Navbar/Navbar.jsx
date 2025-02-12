/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { cartContext } from "../../context/Card.context";
import { userContext } from "../../context/User.context";
import { WishListContext } from "../../context/Wishlist.context";
export default function Navbar() {
  let { token, logOut } = useContext(userContext);
  let { cardInfo, getProductFromCart } = useContext(cartContext);
  const { productWishlist, getLoggedUserWishlist } =
    useContext(WishListContext);

  useEffect(() => {
    getProductFromCart();
    getLoggedUserWishlist();
  }, []);
  return (
    <>
      <nav className="bg-slate-100 fixed top-0 right-0 left-0 w-full z-50">
        <div className="nav-body container py-3 flex items-center justify-between ">
          {token && (
            <header className="flex gap-10">
              <img src={freshCartLogo} alt="" />
              <ul className="space-x-5 mt-1  ">
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </ul>
            </header>
          )}

          {!token && (
            <div className="register space-x-5">
              <NavLink
                className={({ isActive }) => {
                  return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`;
                }}
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return `relative before:absolute before:bg-primary-400 before:h-0.5 before:w-0 before:left-0 before:-bottom-1  before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`;
                }}
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          )}

          {token && (
            <div className="icons flex items-center justify-center mt-2 space-x-6 text-primary-600">
              <Link to="/wishlist" className="cart relative cursor-pointer  ">
                <i
                  className={` ${
                    productWishlist !== null && productWishlist.count > 0
                      ? "fa-solid text-primary-600  "
                      : "fa-solid"
                  }
                    }  text-2xl hover:text-primary-700  fa-heart duration-300 transition-colors`}
                ></i>
                <div className="heart-counter absolute h-5 w-5 flex items-center  justify-center rounded-full bg-primary-600 top-0 right-0 translate-x-1/2 -translate-y-1/2">
                  {productWishlist === null ? (
                    <i
                      className="fa-solid fa-spinner  text-white h-5 w-5 animate-spin flex items-center justify-center"
                      title="Wait"
                    ></i>
                  ) : (
                    <span className="text-white"> {productWishlist.count}</span>
                  )}
                </div>
              </Link>
              <Link to="/cart" className="cart relative cursor-pointer  ">
                <i
                  className={` ${
                    cardInfo !== null && cardInfo.numOfCartItems > 0
                      ? "fa-cart-shopping text-primary-600  "
                      : "fa-cart-shopping"
                  }
                    }  text-2xl hover:text-primary-700 duration-300 fa-solid transition-colors`}
                ></i>
                <div className="cart-counter absolute h-5 w-5 flex items-center justify-center rounded-full bg-primary-600 top-0 right-0 translate-x-1/2 -translate-y-1/2">
                  {cardInfo === null ? (
                    <i
                      className="bg-primary-500 fa-spinner text-white h-5 w-5 animate-spin flex items-center justify-center"
                      title="Wait"
                    ></i>
                  ) : (
                    <span className="text-white">
                      {" "}
                      {cardInfo.numOfCartItems}
                    </span>
                  )}
                </div>
              </Link>
              <div className="logout">
                <i
                  onClick={logOut}
                  className="fa-solid fa-right-from-bracket cursor-pointer text-2xl text-orange-500 ml-6"
                ></i>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
