import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = ["banner.jpg", "contact.jpg", "value.jpg"];

const Carousel = () => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={`../../public/images/${image}`}
            alt="property-img"
            width="100%"
            className="carousel-image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
