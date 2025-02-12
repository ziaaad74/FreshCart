/* eslint-disable react/prop-types */
import { useContext } from "react";
import { cartContext } from "../../context/Card.context";
export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  let { deleteProductFromCart, updateCartProduct } = useContext(cartContext);
  return (
    <>
      <div className="cart-body bg-gray-100 py-5 px-10 shadow-md">
        <div className="flex gap-10 mt-5">
          <img
            className="h-24 w-24 object-cover shadow-lg "
            src={imageCover}
            alt={title}
          />
          <div className="flex flex-col gap-5 text-lg">
            <h2>{title}</h2>
            <h2>{category.name}</h2>
            <h2>
              <span className="text-primary-600">Price :</span> {price} L.E
            </h2>
          </div>

          <div className=" flex flex-col justify-between ml-auto">
            <div className="count space-x-3 flex items-center justify-center">
              <div
                onClick={() => {
                  updateCartProduct({ productId: id, count: count + 1 });
                }}
              >
                <i className="fa-regular fa-square-plus text-2xl text-primary-400 cursor-pointer "></i>
              </div>
              <span className="text-xl">{count}</span>
              <div
                onClick={() => {
                  updateCartProduct({ productId: id, count: count - 1 });
                }}
              >
                <i className="fa-regular fa-square-minus text-2xl text-primary-400 cursor-pointer  "></i>
              </div>
            </div>
            <div
              onClick={() => {
                deleteProductFromCart({ productId: id });
              }}
              className="flex gap-2 items-center cursor-pointer text-white bg-gray-500 hover:bg-gray-600 transition-colors duration-200 p-2 rounded-md"
            >
              <i className="fa-solid fa-trash-can"></i>
              <h2>Remove</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
