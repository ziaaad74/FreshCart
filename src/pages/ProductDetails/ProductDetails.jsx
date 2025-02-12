/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/Card.context";
import Loading from "../../components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addProductToCart } = useContext(cartContext);

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        maethod: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getrelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails === null) return;
    getrelatedProducts();
  }, [productDetails]);

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {productDetails ? (
        <>
          <Helmet>
            <title>{ProductDetails.name}</title>
          </Helmet>
          <section className="grid grid-cols-12 gap-12">
            <div className=" col-span-3">
              <ReactImageGallery
                showNav={false}
                showPlayButton={false}
                items={productDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="col-span-9 space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl text-primary-500 font-semibold">
                  {productDetails.title}
                </h2>
                <h2 className="text-xl font-semibold">
                  {productDetails.category.name}
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                {productDetails.description}
              </p>
              <div className="flex items-center justify-between">
                <h2 className=" text-lg text-primary-500 font-semibold">
                  $ {productDetails.price}{" "}
                </h2>
                <div className="text-lg">
                  <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="bg-primary-500 hover:bg-primary-700 text-lg text-white rounded-md py-2 w-full"
              >
                Add To Cart
              </button>
            </div>
          </section>

          <section>
            {relatedProducts ? (
              <>
                <h2 className="my-7 text-center text-2xl text-gray-700">
                  Related Products
                </h2>
                <Swiper slidesPerView={6} spaceBetween={15}>
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <Card productInfo={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
