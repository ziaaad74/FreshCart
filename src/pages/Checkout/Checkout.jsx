import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { cartContext } from "../../context/Card.context";
import { userContext } from "../../context/User.context";
export default function Checkout() {
  const { token } = useContext(userContext);
  const { cardInfo, getProductFromCart } = useContext(cartContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const phoneRegx = /^(02)?01[0125][0-9]{8}/;

  async function createCashOrder(values) {
    let toastLoading = toast.loading("Waiting to create your order");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cardInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.status === "success") {
        toast.success(data.status);
        getProductFromCart();
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      toast.dismiss(toastLoading);
    }
  }

  async function createOnlineOrder(values) {
    let toastLoading = toast.loading("Waiting to create your order");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.status === "success") {
        toast.success("Go to stripe");
        getProductFromCart();
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      toast.dismiss(toastLoading);
    }
  }

  const validationSchema = Yup.object({
    shippingAddress: Yup.object().shape({
      city: Yup.string()
        .required("* City is required")
        .min(2, "* City must be at least 2 characters long"),
      phone: Yup.string()
        .matches(phoneRegx, "* We accept only egyptian number digits")
        .required("* Phone is required"),
      details: Yup.string()
        .required("* Details are required")
        .min(10, "* Details must be at least 10 characters"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      if (paymentMethod === "cash") createCashOrder(values);
      else createOnlineOrder(values);
    },
  });
  const isPhoneTouchedAndError =
    formik.touched.shippingAddress?.phone &&
    formik.errors.shippingAddress?.phone;
  const isCityTouchedAndError =
    formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city;
  const isDetailsTouchedAndError =
    formik.touched.shippingAddress?.details &&
    formik.errors.shippingAddress?.details;

  return (
    <>
      <Helmet>
        <title>Checkout - Freshcart</title>
        <meta
          name="description"
          content="Complete your purchase and choose between online payment or cash on delivery at Freshcart."
        />
        <meta
          name="keywords"
          content="Checkout, Freshcart, Online Payment, Cash on Delivery, Shopping"
        />
        <meta property="og:title" content="Checkout - Freshcart" />
        <meta
          property="og:description"
          content="Finish your shopping experience and choose your preferred payment method at Freshcart."
        />
      </Helmet>
      <section>
        <h1 className="font-bold text-2xl">Shipping Address</h1>
        <form className="py-5 space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              className="form-control focus:outline-none focus:border-primary-700"
              type="text"
              name="shippingAddress.city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shippingAddress.city}
              placeholder="City"
            />
            {isCityTouchedAndError && (
              <p className="text-red-600 font-medium">
                {formik.errors.shippingAddress.city}
              </p>
            )}
          </div>
          <div className="phone">
            <input
              className="form-control focus:outline-none focus:border-primary-700 "
              type="tel"
              name="shippingAddress.phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shippingAddress.phone}
              placeholder="Phone"
            />
            {isPhoneTouchedAndError && (
              <p className="text-red-600 font-medium">
                {formik.errors.shippingAddress.phone}
              </p>
            )}
          </div>
          <div className="details">
            <textarea
              className="form-control focus:outline-none focus:border-primary-700 "
              name="shippingAddress.details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shippingAddress.details}
              placeholder="Details"
            ></textarea>
            {isDetailsTouchedAndError && (
              <p className="text-red-600 font-medium">
                {formik.errors.shippingAddress.details}
              </p>
            )}
          </div>

          <div className="btns flex gap-3 items-center flex-wrap  ">
            <button
              onClick={() => {
                setPaymentMethod("cash");
              }}
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 duration-300 transition-colors px-3 py-2"
            >
              Cash Order
            </button>
            <button
              onClick={() => {
                setPaymentMethod("online");
              }}
              type="submit"
              className="btn bg-primary-600 hover:bg-primary-700 duration-300 transition-colors px-3 py-2"
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
