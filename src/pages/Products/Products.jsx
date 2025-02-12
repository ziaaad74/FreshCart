// import DropdownFilter from "../../Components/DropdownFilter/DropdownFilter";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { useFormik } from "formik";
import Loading from "../../Components/Loading/Loading";
import { ProductsContext } from "../../context/Products.context";
import Card from "../../Components/Card/Card";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";

export default function Prouducts() {
  const { data, isLoading, searchProducts, searchedData, status } =
    useContext(ProductsContext);
  const formik = useFormik({
    initialValues: {
      valueInput: "",
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Discover a variety of products in different categories on Freshcart. Shop now and enjoy exclusive deals."
        />
        <meta
          name="keywords"
          content="Freshcart, Products, Shopping, Online Store, Deals, Categories"
        />
        <meta property="og:title" content="Products - Freshcart" />
        <meta
          property="og:description"
          content="Explore our extensive product catalog and find the best deals on Freshcart. Your go-to online store for quality products."
        />
      </Helmet>

      <section>
        <div className="grid grid-cols-12 gap-5 mb-8">
          <div className="search col-span-12 sm:col-span-8 lg:col-span-10">
            <input
              name="valueInput"
              type="search"
              value={formik.values.valueInput}
              placeholder="Search ..."
              className="form-control rounded-full focus:outline-none focus:border-primary-700 "
              onChange={(e) => {
                formik.handleChange(e);
                searchProducts(e.target.value);
              }}
            />
            {}
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <DropdownFilter />
          </div>
        </div>

        <section className="cards grid sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {(status === "products".toLowerCase()
            ? data.products.data
            : status === "sortHigh".toLowerCase()
            ? data.sortedHProducts.data
            : status === "sortLow".toLowerCase()
            ? data.sortedLProducts.data
            : searchedData
          ).map((proudect) => (
            <Card productInfo={proudect} key={proudect._id} />
          ))}
        </section>
      </section>
    </>
  );
}
