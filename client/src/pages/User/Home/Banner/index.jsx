import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import "./Banner.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import slide1 from '../../../../assets/slide/slides1.jpg';
import slide2 from '../../../../assets/slide/slides2.jpg';
import slide3 from '../../../../assets/slide/slides3.jpg';

export const Banner = () => {
  return (
    <Swiper
      className='banner'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    >
      <SwiperSlide>
        <img src={slide1} alt="slide1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide2} alt="slide2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide3} alt="slide3" />
      </SwiperSlide>
    </Swiper>
  );
};
