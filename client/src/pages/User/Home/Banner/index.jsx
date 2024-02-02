import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRef } from 'react'

import './Banner.scss'

import slide1 from '../../../../assets/slide/slides1.jpg'
import slide2 from '../../../../assets/slide/slides2.jpg'
import slide3 from '../../../../assets/slide/slides3.jpg'

export const Banner = () => {
  const navigate = useNavigate()
  const swiperRef = useRef()

  return (
    <Swiper
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper
      }}
      pagination={{
        dynamicBullets: true
      }}
      modules={[Pagination]}
      className="banner"
    >
      <div className="slide_button-prev" onClick={() => swiperRef.current?.slidePrev()}>
        <LeftOutlined />
      </div>
      <div className="slide_button-next" onClick={() => swiperRef.current?.slideNext()}>
        <RightOutlined />
      </div>
      <SwiperSlide>
        <div className="slide_wrap">
          <img src={slide1} alt="slide1" />
          <div className="slide_content">
            <h2 data-aos="fade-up">Specialty Coffee</h2>
            <p data-aos="fade-up" data-aos-duration="1000">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
              amet lacus
            </p>
            <Button size="large" data-aos="fade-up" data-aos-duration="2000" onClick={() => navigate('/shop')}>
              Shop Now
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide_wrap">
          <img src={slide2} alt="slide1" />
          <div className="slide_content">
            <h2>Specialty Coffee</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
              amet lacus
            </p>
            <Button data-aos="fade-up" data-aos-duration="2000" size="large" onClick={() => navigate('/shop')}>
              Shop Now
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide_wrap">
          <img src={slide3} alt="slide1" />
          <div className="slide_content">
            <h2>Specialty Coffee</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
              amet lacus
            </p>
            <Button data-aos="fade-up" data-aos-duration="2000" size="large" onClick={() => navigate('/shop')}>
              Shop Now
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
