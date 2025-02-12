import { useContext } from "react";
import { cartContext } from "../../context/Card.context";
import { Link } from "react-router-dom";
import { WishListContext } from "../../context/Wishlist.context";

/* eslint-disable react/prop-types */
export default function Card({ productInfo }) {
  let { addProductToCart } = useContext(cartContext);
  let { addProuductWishList } = useContext(WishListContext);

  const {
    ratingsAverage,
    price,
    title,
    imageCover,
    category,
    description,
    id,
  } = productInfo;
  return (
    <>
      <div className="card group/card rounded-md shadow-lg overflow-hidden mb-5">
        <div className=" relative">
          <img src={imageCover} alt="" />
          <div className="layer absolute group-hover/card:opacity-100 transition-opacity duration-500 bg-gray-700 h-full w-full top-0 left-0 bg-opacity-40 opacity-0 flex items-center justify-center gap-3 ">
            <div
              onClick={() => {
                addProuductWishList({ productId: productInfo.id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-primary-600 text-white"
            >
              <i className="fa-solid fa-heart"></i>
            </div>
            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-primary-600 text-white"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-primary-600 text-white"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-body p-3 space-y-2">
          <header className="space-y-2">
            <h2 className="text-primary-600 text-lg line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h2>
            <h3 className="text-sm uppercase">{category.name}</h3>
          </header>
          <p className="text-gray-500 line-clamp-2">{description}</p>
          <div className="cardInfo flex items-center justify-between mt-3 ">
            <h2 className="text-md">{price}</h2>
            <h3 className="text-slate-600">
              <i className="fa-solid fa-star text-yellow-400"></i>{" "}
              {ratingsAverage}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
