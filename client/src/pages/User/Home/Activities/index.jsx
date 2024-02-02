import { Container } from '@components/Container'
import { Button, Spin } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_USER_URL } from '../../../../constants'

import slide1 from '@assets/slide/slides1.jpg'
import icon from '@assets/icons/tele.png'

import './Activities.scss'

export const Activities = () => {
  const navigate = useNavigate()
  const swiperRef = useRef()

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_USER_URL}/activities`)
      setActivities(data.data.blogs)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <section id="home-activities">
      <Container>
        <section className="section-header">
          <div className="dat-title" data-aos="fade-right">
            <span className="sub-title">SEE OUR PHOTOS</span>
            <h1 className="title">
              <span>Our Activities</span>
            </h1>
          </div>
          <div className="description" data-aos="fade-up">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est.
          </div>
          <div className="slide_button">
            <div onClick={() => swiperRef.current?.slidePrev()}>
              <LeftOutlined />
            </div>
            <div onClick={() => swiperRef.current?.slideNext()}>
              <RightOutlined />
            </div>
          </div>
        </section>
        <article>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            pagination={{
              dynamicBullets: true
            }}
            slidesPerView={3}
            spaceBetween={10}
            modules={[Pagination]}
            className="activities-swiper"
          >
            {loading ? (
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            ) : (
              activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="swiper-item">
                    <img src={activity.image} alt="" />
                    <div className="text">
                      <p>{activity.title}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src={slide1} alt="" />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </article>
        <article className="contact">
          <Button danger size="large" obClick={() => navigate('/contact')}>
            <img width={20} src={icon} alt="" /> Liên hệ với chúng tôi
          </Button>
        </article>
      </Container>
    </section>
  )
}
