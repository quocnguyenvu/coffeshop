const Response = require("../helpers/response.helper");
const Blog = require("../models/Blog");
const remove_Id = require("../utils/remove_Id");

exports.create = async (req, res, next) => {
  try {
    const {
      body: { title, description, content, thumbnail },
    } = req;

    if (!title || !description || !content || !thumbnail)
      throw new Error("Invalid blog data");

    const blog = await Blog.create({
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
      body: { title, description, content, thumbnail },
    } = req;

    if (!blogId || !title || !description || !content || !thumbnail)
      throw new Error("Invalid blog data");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Fail to update blog");

    await Blog.findByIdAndUpdate(blogId, {
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "dateCreate";
    const sortMethod = req.query.sortMethod || "asc";

    const sortOptions = {};
    sortOptions[sortBy] = sortMethod === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const blogs = await Blog.find().sort(sortOptions).skip(skip).limit(limit);

    if (!blogs) throw new Error("Get blogs failed!");

    const count = await Blog.find().count();

    for (let blog of blogs) {
      const total = await Blog.find({ blogId: blog._id }).count();
      blog._doc.totalProducts = total;
    }

    return Response.success(res, {
      blogs: remove_Id(blogs),
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
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
