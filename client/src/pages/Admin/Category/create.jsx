import axios from "axios";

export const CategoryCreate = () => {
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    const { code, name, description } = e.target.elements;

    const categoryData = {
      code: code.value,
      name: name.value,
      description: description.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/category/create",
        categoryData
      );

      console.log("Category created successfully!", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <h1>Category Create</h1>
      <form onSubmit={handleCreateCategory}>
        <label>
          Code:
          <input type="text" name="code" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
