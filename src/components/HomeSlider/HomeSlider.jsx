import { Autoplay } from "swiper/modules";
import silderImage1 from "../../assets/images/slider-image-1.jpeg";
import silderImage2 from "../../assets/images/slider-image-2.jpeg";
import silderImage3 from "../../assets/images/slider-image-3.jpeg";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeSlider() {
  return (
    <>
      <div className="col-span-8">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          className="w-full h-full object-cover "
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img
              src={silderImage1}
              className="w-full h-full object-cover "
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={silderImage1}
              className="w-full h-full object-cover "
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={silderImage1}
              className="w-full h-full object-cover "
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-4">
        <Swiper>
          <SwiperSlide>
            <img
              src={silderImage2}
              className="w-full h-full object-cover "
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img src={silderImage2} className="w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={silderImage2} className="w-full" alt="" />
          </SwiperSlide>
        </Swiper>
        <Swiper>
          <SwiperSlide>
            <img src={silderImage3} className="w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={silderImage3} className="w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={silderImage3} className="w-full" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
