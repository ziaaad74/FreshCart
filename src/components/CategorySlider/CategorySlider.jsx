import axios from "axios";
// import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: [""],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
  });
  if (isLoading) return <Loading />;

  return (
    <>
      <section className="mb-10">
        <h2 className="text-gray-800 mb-4 text-lg ">Shop Popular Categories</h2>
        <Swiper slidesPerView={6} loop={true}>
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt=""
                />
              </div>
              <h3 className="pl-5 mt-2">{category.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
