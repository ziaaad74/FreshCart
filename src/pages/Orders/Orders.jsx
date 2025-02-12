/* eslint-disable react-hooks/exhaustive-deps */
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  const token = localStorage.getItem("token");
  let { id } = jwtDecode(token);

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  } else {
    console.warn("No token found in localStorage");
  }

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      mehotd: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {orders ? (
        <section className="space-y-7">
          <h2 className="text-primary-600 text-3xl font-semibold">
            Order History
          </h2>
          {orders.map((order) => (
            <>
              <div
                key={order.id}
                className="order-body p-3 rounded-md bg-gray-100 border-2 border-gray-500 border-opacity-25 shadow-md"
              >
                <header className="flex justify-between items-center ">
                  <div>
                    <span className="text-lg font-semibold ">Order ID : </span>
                    <span className="text-lg font-semibold ">#39959</span>
                  </div>
                  <div className="space-x-3 mt-3">
                    {order.isPaid ? (
                      <span className="text-white p-2 bg-primary-500 rounded-lg">
                        Is Paid
                      </span>
                    ) : (
                      <span className="text-white p-2 bg-red-500 rounded-lg">
                        <i className="fa-solid fa-xmark  mr-2"></i>
                        Not Paid
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="text-white p-2 bg-primary-500 rounded-lg">
                        Order Has been deliverd
                      </span>
                    ) : (
                      <span className="text-white p-2 bg-blue-500 rounded-lg">
                        <i className="fa-solid fa-tag mr-2"></i>
                        In Transit
                      </span>
                    )}
                  </div>
                </header>
                <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  p-4 mt-5">
                  {order.cartItems.map((product) => (
                    <>
                      <div key={product._id} className="orders  ">
                        <img
                          className="w-full"
                          src={product.product.imageCover}
                          alt=""
                        />
                        <h2 className="text-lg font-semibold line-clamp-1 text-slate-800 mt-3">
                          {product.product.title}
                        </h2>
                        <div className="flex items-center justify-between px-1 mt-2">
                          <h2 className="text-lg  text-primary-500">
                            Price : {product.price}
                          </h2>
                          <h2 className="font-semibold">
                            count : <span>{product.count}</span>
                          </h2>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <h2 className="mt-2 text-xl font-semibold">
                  $ Total Order Price :{" "}
                  <span className="text-primary-500">14203</span> L.E
                </h2>
              </div>
            </>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
