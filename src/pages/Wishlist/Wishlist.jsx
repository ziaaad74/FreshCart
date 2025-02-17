/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../context/Wishlist.context";
import { cartContext } from "../../context/Card.context";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function WishList() {
  const { getLoggedUserWishlist, productWishlist, deleteProductFromWishlist } =
    useContext(WishListContext);
  const { addProductToCart } = useContext(cartContext);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist - Freshcart</title>
        <meta
          name="description"
          content="Add products to your wishlist and save your favorite items for later at Freshcart."
        />
        <meta
          name="keywords"
          content="Wishlist, Freshcart, Shopping Wishlist, Favorite Products, Online Store"
        />
        <meta property="og:title" content="Wishlist - Freshcart" />
        <meta
          property="og:description"
          content="Create and manage your wishlist on Freshcart. Save your favorite products and buy them later."
        />
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold mb-5 text-primary-500 border-b-2 border-primary-500 pb-2 flex items-center gap-2">
        <i className="fa-solid fa-heart text-3xl"></i> My Wishlist
      </h1>

      <section className="shadow-md p-5 rounded-md bg-gray-100 space-y-4 mb-5">
        {productWishlist && productWishlist?.data.length !== 0 ? (
          productWishlist.data.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row bg-white rounded-md items-center gap-5 shadow-md p-5 relative"
            >
              <div className="w-full sm:w-[150px] h-[200px] sm:h-[150px] flex-shrink-0">
                <img
                  src={product.imageCover}
                  className="w-full h-full object-cover rounded-md"
                  alt={product.title}
                />
              </div>

              <div className="flex flex-1 flex-col sm:flex-row justify-between gap-3 items-center w-full text-center sm:text-left">
                <article>
                  <h3 className="text-base sm:text-lg font-semibold">
                    {product.title}
                  </h3>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                    ${product.price}
                  </h4>
                </article>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => addProductToCart({ productId: product.id })}
                    className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition w-full sm:w-auto"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() =>
                      deleteProductFromWishlist({ productId: product.id })
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : productWishlist?.data.length === 0 ? (
          <div className="text-center p-5">
            <p className="mb-7">
              <b>Oops!</b> Your wishlist is empty. Go to home page and start
              adding products you like to wishlist
            </p>
            <Link
              to="/"
              className="bg-primary-500 hover:bg-primary-600 px-5 py-2 text-white rounded-md"
            >
              Back To Home
            </Link>
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
