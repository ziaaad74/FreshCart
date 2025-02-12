import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../context/User.Context";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken } = useContext(userContext);

  const navigate = useNavigate();

  const [invalidPasswordOrEmailerror, setInvalidPasswordOrEmailerror] =
    useState(null);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("email is required").email(),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function submitData(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.message == "success") {
        toast.success("User logged in Successfuly");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setInvalidPasswordOrEmailerror(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitData,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>
        <i className="fa-duotone fa-solid fa-user mr-3 mb-5"></i>Login :
      </h1>
      <form action="" onSubmit={formik.handleSubmit} className="space-y-3">
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
          {invalidPasswordOrEmailerror && (
            <p className="text-red-600 mt-1 text-sm">
              *{invalidPasswordOrEmailerror}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-primary-400 hover:bg-primary-600 transition-colors duration-300"
        >
          login
        </button>
      </form>
    </>
  );
}
