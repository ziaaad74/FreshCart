/* eslint-disable react/prop-types */
import { useContext } from "react";
import { cartContext } from "../../context/Card.context";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  let { deleteProductFromCart, updateCartProduct } = useContext(cartContext);

  return (
    <div className="cart-body bg-gray-100 py-5 px-5 md:px-10 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
        <img
          className="h-24 w-24 md:h-32 md:w-32 object-cover shadow-lg rounded-lg"
          src={imageCover}
          alt={title}
        />
        <div className="flex flex-col items-center md:items-start gap-2 text-lg text-center md:text-left">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <h2 className="text-gray-600">{category.name}</h2>
          <h2>
            <span className="text-primary-600 font-semibold">Price :</span>{" "}
            {price} L.E
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center md:ml-auto gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                updateCartProduct({ productId: id, count: count + 1 })
              }
              className="text-2xl text-primary-400 hover:text-primary-600 transition"
            >
              <i className="fa-regular fa-square-plus cursor-pointer"></i>
            </button>
            <span className="text-xl font-semibold">{count}</span>
            <button
              onClick={() =>
                updateCartProduct({ productId: id, count: count - 1 })
              }
              className="text-2xl text-primary-400 hover:text-primary-600 transition"
            >
              <i className="fa-regular fa-square-minus cursor-pointer"></i>
            </button>
          </div>

          <button
            onClick={() => deleteProductFromCart({ productId: id })}
            className="flex items-center gap-2 text-white bg-gray-500 hover:bg-gray-600 transition p-2 rounded-md"
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
