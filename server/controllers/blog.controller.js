const Response = require("../helpers/response.helper");
const Blog = require("../models/Blog");
const remove_Id = require("../utils/remove_Id");

exports.create = async (req, res, next) => {
  try {
    const {
      body: { code, title, description, content, thumbnail },
    } = req;

    if (!code || !title || !description || !content || !thumbnail)
      throw new Error("Invalid blog data");

    const blog = await Blog.create({
      code,
      title,
      description,
      content,
      thumbnail,
    });

    blog._doc.id = blog._id;

    return Response.success(res, {
      message: "Created blog sucssesfully!",
      blog,
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      params: { blogId },
      body: { code, title, description, content, thumbnail },
    } = req;

    if (!blogId || !code || !title || !description || !content || !thumbnail)
      throw new Error("Invalid blog data");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Fail to update blog");

    await Blog.findByIdAndUpdate(blogId, {
      code,
      title,
      description,
      content,
      thumbnail,
    });

    return Response.success(res, { message: "Updated blog sucssesfully!" });
  } catch (error) {
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    let blogs = await Blog.find();
    if (!blogs) throw new Error("Get blogs failed!");
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

    if (!blogId) throw new Error("No blog ID");
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Get blog failed!");

    blog._doc.id = blog._id;
    return Response.success(res, { blog });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { blogId },
    } = req;

    if (!blogId) throw new Error("No blog ID");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Fail to delete blog");

    await Blog.findByIdAndDelete(blogId);

    return Response.success(res, { message: "Deleted blog sucssesfully!" });
  } catch (error) {
    return next(error);
  }
};
