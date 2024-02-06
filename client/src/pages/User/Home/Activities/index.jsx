import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import slide1 from '@assets/blog/images-27-min-1-840x840.jpg'
import icon from '@assets/icons/tele.png'
import { Button, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Container } from '@components/Container'

import { API_USER_URL } from '../../../../constants'

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
            className="activities-swiper"
            modules={[Pagination]}
            pagination={{
              dynamicBullets: true
            }}
            slidesPerView={3}
            spaceBetween={10}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {loading ? (
              <Spin size="large" tip="Loading">
                <div className="content" />
              </Spin>
            ) : (
              activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="swiper-item">
                    <img alt="" src={activity.image} />
                    <div className="text">
                      <p>{activity.title}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img alt="" src={slide1} />
                <div className="text">
                  <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </article>
        <article className="contact">
          <Button danger size="large" onClick={() => navigate('/contact')}>
            <img alt="" src={icon} width={20} /> Liên hệ với chúng tôi
          </Button>
        </article>
      </Container>
    </section>
  )
}
