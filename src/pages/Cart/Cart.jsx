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
    getProductFromCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="flex items-center gap-3 mb-8">
        <i className="fa-solid fa-cart-plus text-3xl text-primary-500"></i>
        <h2 className="text-2xl sm:text-3xl text-primary-600 font-semibold">
          Shopping Cart :
        </h2>
      </div>

      {cardInfo === null ? (
        <Loading />
      ) : (
        <section>
          {cardInfo.numOfCartItems === 0 ? (
            <div className="text-center bg-gray-100 px-5 py-8 rounded-md shadow">
              <p className="mb-6 text-base sm:text-lg">
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </p>
              <Link
                to="/"
                className="bg-primary-500 hover:bg-primary-700 px-5 py-2 text-white rounded-md block mx-auto w-3/4 sm:w-auto"
              >
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {cardInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>

              <div className="cart-footer flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-red-600 text-center sm:text-left">
                  $ Your Total Cart Price Is :{" "}
                  <span>{cardInfo.data.totalCartPrice} L.E</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={deleteCart}
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-4 rounded-md text-lg w-full sm:w-auto"
                  >
                    Delete Cart
                  </button>
                  <Link
                    to="/checkout"
                    className="bg-primary-500 hover:bg-primary-600 transition-colors duration-200 text-white py-2 px-4 rounded-md text-lg w-full sm:w-auto"
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
