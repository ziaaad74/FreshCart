import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import "swiper/css";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="mb-10 px-4 md:px-8">
        <h2 className="text-gray-800 mb-4 text-lg sm:text-xl md:text-2xl font-semibold">
          Shop Popular Categories
        </h2>
        <Swiper
          loop={true}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h3 className="text-center mt-2 text-sm sm:text-base font-medium">
                {category.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
