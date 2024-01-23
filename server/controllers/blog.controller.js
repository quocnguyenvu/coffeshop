const Response = require("../helpers/response.helper");
const remove_Id = require("../utils/remove_Id");
const uploadImage = require("../utils/uploadImage");

const Blog = require("../models/Blog");
const {
  response: {
    createSuccessMessage,
    updateSuccessMessage,
    deleteSuccessMessage,
    failMessage,
  },
} = require("../constants");

// create
exports.create = async (req, res, next) => {
  try {
    const {
      file,
      body: { code, title, description, content },
    } = req;
    let blog;

    if (!code || !title || !description || !content)
      throw new Error(failMessage);

    if (file) {
      const result = await uploadImage(file);

      blog = await Blog.create({
        code,
        title,
        description,
        content,
        thumbnail: result.url,
      });
    } else {
      blog = await Blog.create({
        code,
        title,
        description,
        content,
      });
    }

    blog._doc.id = blog._id;

    return Response.success(res, { message: createSuccessMessage, blog });
  } catch (error) {
    return next(error);
  }
};

// get all
exports.getAll = async (req, res, next) => {
  try {
    let blogs = await Blog.find();
    if (!blogs) throw new Error(failMessage);
    const count = await Blog.find().count();

    for (let blog of blogs) {
      const total = await Blog.find({ blogId: blog._id }).count();
      blog._doc.totalProducts = total;
    }

    return Response.success(res, {
      blogs: remove_Id(blogs),
      total: count,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const {
      params: { blogId },
    } = req;

    if (!blogId) throw new Error(failMessage);
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error(failMessage);
    // Add ID
    blog._doc.id = blog._id;
    return Response.success(res, { blog });
  } catch (error) {
    return next(error);
  }
};
