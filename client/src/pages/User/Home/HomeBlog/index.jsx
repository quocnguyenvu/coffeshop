import { Button, Divider, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { BlogItem } from '@components/BlogItem'
import { Container } from '@components/Container'

import { API_USER_URL } from '../../../../constants'

import './HomeBlog.scss'
export const HomeBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_USER_URL}/blogs?limit=4`)
      setBlogs(data.data.blogs)
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
    <section id="home-blog">
      <Container>
        <Divider />
        <article className="section-header">
          <span className="sub-title">WHAT WE OFFER</span>
          <h1 className="title">
            <span>
              We Produce Blends of the Most <br />
              Aromatic Coffee
            </span>
          </h1>
        </article>
        <section className="list-blogs">
          {loading ? (
            <Spin size="large" tip="Loading">
              <div className="content" />
            </Spin>
          ) : (
            blogs.map((blog) => <BlogItem blog={blog} key={blog._id} />)
          )}
        </section>
        <article className="view-more">
          <Button ghost type="primary">
            Xem tất cả
          </Button>
        </article>
      </Container>
    </section>
  )
}
