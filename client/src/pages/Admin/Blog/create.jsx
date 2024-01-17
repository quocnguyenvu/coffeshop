import { useState } from "react";
import axiosClient from "../../../api/axios";

export const BlogCreate = () => {
  const [files, setFile] = useState();
  console.log("🚀 ~ files:", files)

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const { code, title, content, description } = e.target.elements;

    const blogData = {
      code: code.value,
      name: name.value,
      description: description.value,
      content: content.value,
      images: files,
      title: title.value,
    };

    try {
      const response = await axiosClient.post(
        "blog/create",
        blogData
      );

      console.log("Blog created successfully!", response.data);
    } catch (error) {
      console.error("Error creating Blog:", error);
    }
  };

  return (
    <div>
      <h1>Blog Create</h1>
      <form onSubmit={handleCreateBlog}>
        <label>
          Code:
          <input type="text" name="code" />
        </label>
        <br />
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Images:
          <input type="file" name="images"  onChange={(evt) => setFile(evt.target.files)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <br />
        <label>
          Content:
          <input type="text" name="content" />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
