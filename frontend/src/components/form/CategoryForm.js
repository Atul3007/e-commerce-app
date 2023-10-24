import React, { useEffect } from "react";

const CategoryForm = () => {
  const [value, setValue] = useEffect("");
  return (
    <>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
