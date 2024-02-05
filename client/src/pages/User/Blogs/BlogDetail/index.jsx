import { Divider, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BlogItem } from '@components/BlogItem'
import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

import { API_USER_URL } from '../../../../constants'

import './BlogDetail.scss'

export const BlogDetail = () => {
  const { blogId } = useParams()

  const [blog, setBlog] = useState(null)
  const [blogNewest, setBlogNewest] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_USER_URL}/blog/${blogId}`)
        setBlog(response.data.data.blog)

        const blogNewest = await axios.get(`${API_USER_URL}/blogs?limit=4&sortBy=dateCreate&sortMethod=dsc`)
        setBlogNewest(blogNewest.data.data.blogs)
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [blogId])

  return (
    <>
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
      ) : (
        <section id="blog-detail">
          <Header isScrolling={false} isSticky={false} />
          <div className="blog-thumbnail">
            <img alt={blog.title} src={blog.thumbnail} />
          </div>
          <Container>
            <div className="blog_wrap">
              <div className="blog-detail__title">{blog.title}</div>
              <div className="blog-detail__date">{new Date(blog.dateCreate).toLocaleString()}</div>
              <div className="blog-detail__desc">{blog.description}</div>
              <Divider />
              <div className="blog-detail__content">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>
            <div className="blog-newest">
              {0 < blogNewest.length && (
                <>
                  <Divider orientation="left" style={{ borderColor: '#333' }}>
                    <span style={{ fontSize: 24 }}>BÀI VIẾT MỚI NHẤT</span>
                  </Divider>
                  <div className="newest-wrap">
                    {blogNewest.map((blog, index) => (
                      <BlogItem blog={blog} key={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Container>
          <Footer />
        </section>
      )}
    </>
  )
}
