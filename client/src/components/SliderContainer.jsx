import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SectionText from "./SectionText";
import PropertyCard from "./PropertyCard";

import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "react-query";
import { getTop10Properties } from "../api";

const mainText = "popular residencies";
const subText = "best choices";

const SliderContainer = () => {
  const { data } = useQuery(["top10Properties"], getTop10Properties);

  return (
    <Box component="div">
      <SectionText mainText={mainText} subText={subText} />

      <Container maxWidth="xl">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
        >
          {data?.map((d, i) => (
            <SwiperSlide key={i}>
              <PropertyCard {...d} img={d?.images?.[0]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default SliderContainer;
