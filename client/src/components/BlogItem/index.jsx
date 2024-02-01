import PropTypes from 'prop-types';

import './Blog.scss';
import { useNavigate } from 'react-router-dom';

export const BlogItem = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <article id="blog" onClick={() => navigate(`/blog/${blog.id}`)}>
      <div className="blog_image">
        <img src={blog.thumbnail} alt={blog.title} />
      </div>
      <div className="blog_content">
        <div className="blog_date">
          {new Date(blog.dateCreate).toLocaleString()}
        </div>
        <div className="blog_title">{blog.title}</div>
        <div className="blog_desc">{blog.description}</div>
      </div>
    </article>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};
