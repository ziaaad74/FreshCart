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
      <div className="flex items-center gap-3 mb-8">
        <i className="fa-solid fa-cart-plus text-3xl text-primary-500"></i>
        <h2 className="text-3xl text-primary-600 font-semibold">
          Shopping Cart :
        </h2>
      </div>
      {cardInfo === null ? (
        <Loading />
      ) : (
        <section>
          {cardInfo.numOfCartItems == 0 ? (
            <div className="text-center bg-gray-100 px-5 py-8 rounded-md shadow">
              <p className="mb-10">
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </p>
              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-700  px-5
               py-2"
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
              <div className=" cart-footer flex justify-between items-center mt-8  ">
                <h2 className="text-lg font-semibold text-red-600">
                  $ Your Total Cart Price Is :{" "}
                  <span>{cardInfo.data.totalCartPrice} L.E</span>
                </h2>
                <div className="space-x-5">
                  <button
                    onClick={deleteCart}
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-3 rounded-md text-lg"
                  >
                    Delete Cart
                  </button>
                  <Link
                    to="/checkout"
                    className=" bg-primary-500 hover:bg-primary-600 transition-colors duration-200 text-white p-3 rounded-md text-lg"
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
