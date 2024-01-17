const Response = require("../helpers/response.helper");
const remove_Id = require("../utils/remove_Id");
const uploadImage = require("../utils/uploadImage");

const Blog = require('../models/Blog');
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
      images,
      body: { code, title, description, content },
    } = req;
      console.log("🚀 ~ images:", images)
    let blog;

    if (!code || !title || !description || !content) throw new Error(failMessage);

    if(images) {
      const files = await uploadImage(images);
      blog = await Blog.create({
        code,
        title,
        description,
        content,
        images : files
      });
    } else {
      blog = await Blog.create({
        code,
        title,
        description,
        content
      });
    }
    console.log("🚀 ~ blog:", blog)

    blog._doc.id = blog._id;

    return Response.success(res, { message: createSuccessMessage, blog });
  } catch (error) {
    return next(error);
  }
};
