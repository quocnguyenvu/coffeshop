import { useEffect, useState } from 'react'
import { Container } from '../../../components/Container'
import { PageBanner } from '../../../components/PageBanner'
import axios from 'axios'
import { API_USER_URL } from '../../../constants'
import { Divider, Empty, Pagination, Spin } from 'antd'
import { BlogItem } from '../../../components/BlogItem'
import { Footer } from '../../../components/Footer'

import './Blogs.scss'

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`${API_USER_URL}/blogs?page=${currentPage}&limit=10`)

        const { data } = response
        setBlogs(data.data.blogs)
        setTotalPages(data.data.totalPages)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <PageBanner title="NHỮNG BÀI VIẾT VỀ CÀ PHÊ" />
      <section id="blogs">
        <Container>
          <Divider style={{ borderColor: '#333' }} orientation="left">
            <span style={{ fontSize: 24 }}>BÀI VIẾT HỮU ÍCH</span>
          </Divider>

          <div className="blog_wrapper">
            {loading ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.3)',
                  zIndex: 9999
                }}
              >
                <Spin size="large" />
              </div>
            ) : blogs.length > 0 ? (
              blogs.map((blog, index) => <BlogItem key={index} blog={blog} />)
            ) : (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Empty />
              </div>
            )}
          </div>
          <Divider />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Pagination current={currentPage} total={totalPages * 10} pageSize={10} onChange={handlePageChange} />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
