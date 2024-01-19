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
