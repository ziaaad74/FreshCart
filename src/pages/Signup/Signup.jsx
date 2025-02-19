import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();

  const [accountExsistError, setaccountExsistError] = useState(null);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(\+20|0020)?1(0|1|2|5)\d{8}$/;

  const validationSchema = object({
    name: string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name can't be more than 20 characters"),
    email: string().required("email is required").email(),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "rePassword must be the same as Password"),
    phone: string()
      .required()
      .matches(phoneRegex, "Sorrry, we accept egyptian numbers only"),
  });

  async function submitData(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("User Created Successfuly");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccountExsistError(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitData,
  });
  return (
    <>
      <Helmet>
        <title>Sign UP</title>
      </Helmet>
      <h1 className="px-2 text-primary-600">
        <i className="fa-duotone fa-solid fa-user mr-2 mb-5"></i>Register Now :
      </h1>

      <form action="" onSubmit={formik.handleSubmit} className="space-y-3 px-2">
        <div className="username">
          <input
            className="form-control focus:border-primary-600 focus:outline-none"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>
        <div className="email">
          <input
            className="form-control focus:border-primary-600 focus:outline-none"
            type="text"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 mt-1 text-sm">*{formik.errors.email}</p>
          )}

          {accountExsistError && (
            <p className="text-red-600 mt-1 text-sm">*{accountExsistError}</p>
          )}
        </div>
        <div className="password">
          <input
            className="form-control focus:border-primary-600 focus:outline-none"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 mt-1 text-sm">
              *{formik.errors.password}
            </p>
          )}
        </div>
        <div className="rePassword">
          <input
            className="form-control focus:border-primary-600 focus:outline-none"
            type="password"
            placeholder="Confirm Your Password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600 mt-1 text-sm">
              *{formik.errors.rePassword}
            </p>
          )}
        </div>
        <div className="phone">
          <input
            className="form-control focus:border-primary-600 focus:outline-none"
            type="tel"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600 mt-1 text-sm">*{formik.errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-primary-400 hover:bg-primary-600 transition-colors duration-300"
        >
          Regitser
        </button>
      </form>
    </>
  );
}
