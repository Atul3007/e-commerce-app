import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./../../components/form/CategoryForm";
import { useAuth } from "../../context/Auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);

  const config = {
    headers: {
      Authorization: auth?.token, // Include your authorization token
      "Content-Type": "application/json", // Specify the content type
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/category/create-category",
        { name },
        config
      );

      if (data.success) {
        toast.success(`Successfully ${name} is created!!!`);
        getAllCategory();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };

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
              <div className="p3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((e) => (
                      <>
                        <tr>
                          <td key={e.id}> {e.name} </td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => setVisible(true)}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
