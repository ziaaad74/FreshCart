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
      method: "GET",
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
        <section className="  p-4 sm:p-6 space-y-7">
          <h2 className="text-primary-600 text-2xl sm:text-3xl font-semibold text-center sm:text-left">
            Order History
          </h2>

          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-md bg-gray-100 border border-gray-300 shadow-md"
            >
              {/* هيدر الطلب */}
              <header className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div>
                  <span className="text-lg font-semibold">Order ID: </span>
                  <span className="text-lg font-semibold text-gray-700">
                    #39959
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.isPaid ? (
                    <span className="text-white p-2 bg-green-500 rounded-lg text-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="text-white p-2 bg-red-500 rounded-lg text-sm">
                      <i className="fa-solid fa-xmark mr-1"></i> Not Paid
                    </span>
                  )}

                  {order.isDelivered ? (
                    <span className="text-white p-2 bg-primary-500 rounded-lg text-sm">
                      Delivered
                    </span>
                  ) : (
                    <span className="text-white p-2 bg-blue-500 rounded-lg text-sm">
                      <i className="fa-solid fa-truck mr-1"></i> In Transit
                    </span>
                  )}
                </div>
              </header>

              {/* قائمة المنتجات داخل الطلب */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 mt-5">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <img
                      className="w-full h-40 object-cover rounded-lg"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                    <h2 className="text-md font-semibold text-gray-800 mt-3 text-center line-clamp-2">
                      {product.product.title}
                    </h2>
                    <div className="flex justify-between w-full text-sm text-gray-700 mt-2">
                      <span className="text-primary-500 font-semibold">
                        Price: {product.price} L.E
                      </span>
                      <span className="font-semibold">
                        Qty: {product.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* إجمالي سعر الطلب */}
              <h2 className="mt-4 text-lg font-semibold text-center sm:text-left">
                Total Order Price:{" "}
                <span className="text-primary-500">{14203}</span> L.E
              </h2>
            </div>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
