/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { cartContext } from "../../context/Card.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getProductFromCart, cardInfo, deleteCart } = useContext(cartContext);

  useEffect(() => {
    getProductFromCart;
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="flex items-center gap-3 mb-8 px-4 sm:px-6 lg:px-8">
        <i className="fa-solid fa-cart-plus text-2xl sm:text-3xl text-primary-500"></i>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-primary-600 font-semibold">
          Shopping Cart :
        </h2>
      </div>
      {cardInfo === null ? (
        <Loading />
      ) : (
        <section className="px-4 sm:px-6 lg:px-8">
          {cardInfo.numOfCartItems == 0 ? (
            <div className="text-center bg-gray-100 p-5 md:p-8 rounded-md shadow">
              <p className="mb-6 md:mb-10 text-sm sm:text-base">
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </p>
              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-700 px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base"
              >
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 ">
                {cardInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="cart-footer flex flex-col md:flex-row justify-between items-center mt-8 gap-4 px-4 sm:px-6 lg:px-8">
                <h2 className="text-sm sm:text-lg font-semibold text-red-600 text-center md:text-left">
                  $ Your Total Cart Price Is :
                  <span className="block sm:inline">
                    {" "}
                    {cardInfo.data.totalCartPrice} L.E
                  </span>
                </h2>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5">
                  <button
                    onClick={deleteCart}
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-4 sm:px-3 sm:py-2 rounded-md text-sm sm:text-lg w-full sm:w-auto"
                  >
                    Delete Cart
                  </button>
                  <Link
                    to="/checkout"
                    className="bg-primary-500 hover:bg-primary-600 transition-colors duration-200 text-white py-2 px-4 sm:px-3 sm:py-2 rounded-md text-sm sm:text-lg w-full sm:w-auto text-center"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
