/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast/headless";
import { userContext } from "./User.context";

export const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [cardInfo, setCardInfo] = useState([]);
  const { token } = useContext(userContext);

  async function addProductToCart({ productId }) {
    let loadingId = toast.loading("Adding to cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
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
        toast.success("Product added to your cart successfully");
        getProductFromCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  async function getProductFromCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      setCardInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting from cart...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product deleted from cart");
        setCardInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function deleteCart() {
    const toastId = toast.loading("Deleting cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Cart deleted successfully");
        setCardInfo({
          numOfCartItems: 0,
          // data: {
          //   products: [],
          //   totalCartPrice: 0,
          // },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function updateCartProduct({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCardInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getProductFromCart,
        cardInfo,
        deleteProductFromCart,
        deleteCart,
        updateCartProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
