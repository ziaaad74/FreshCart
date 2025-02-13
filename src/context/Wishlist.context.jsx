/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function WhishListProvider({ children }) {
  const { token } = useContext(userContext);
  const [productWishlist, setProductWishlist] = useState(null);
  const [checkProduct, setCheckProduct] = useState(false);

  async function addProuductWishList({ productId }) {
    const toastload = toast.loading("Adding product to your wishlist...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product has been added to your wishlist successfully!");
        console.log(data);
        getLoggedUserWishlist();
        setCheckProduct(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add product to wishlist."
      );
    } finally {
      toast.dismiss(toastload);
    }
  }

  async function getLoggedUserWishlist() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setProductWishlist(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProductFromWishlist({ productId }) {
    const removeProduct = toast.loading(
      "Removing product from your wishlist..."
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        getLoggedUserWishlist();
        toast.success(
          "Product has been removed from your wishlist successfully"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product from wishlist."
      );
    } finally {
      toast.dismiss(removeProduct);
    }
  }

  function checkedProduct({ productId }) {
    if (!productWishlist || !productWishlist.data) return false;
    const productInfo = productWishlist.data.find(
      (productFind) => productFind._id === productId
    );
    return productInfo;
  }
  return (
    <WishListContext.Provider
      value={{
        addProuductWishList,
        getLoggedUserWishlist,
        productWishlist,
        deleteProductFromWishlist,
        checkProduct,
        checkedProduct,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
