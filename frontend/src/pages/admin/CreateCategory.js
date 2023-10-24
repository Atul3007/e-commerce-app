import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/all"
      );
      console.log(data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
      toast.error("error in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-field">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card w-75 "
              style={{ marginTop: "4%", padding: "20px" }}
            >
              <h4> Manage Category</h4>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        category.map(e=>(
                          <>
                          <tr> 
                            <td key={e.id}> {e.name} </td>
                            <td>
                           <button className="btn btn-primary">Edit</button>
                    </td>
                    </tr>
                      </>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
