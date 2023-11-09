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
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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
        "https://lucky-jade-yoke.cyclic.app/api/category/create-category",
        { name },
        config
      );
     // console.log(data);
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://lucky-jade-yoke.cyclic.app/api/category/update-category/${selected._id}`,
        { name: updatedName },
        config
      );

      if (data) {
        toast.success(`Successfully ${name} is updated!!!`);
        getAllCategory();
        setUpdatedName("");
        setVisible(false);
        setSelected(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the updating form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://lucky-jade-yoke.cyclic.app/api/category/all"
      );
      setCategory(data.data);
    } catch (error) {
      console.log(error);
      toast.error("error in getting category");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://lucky-jade-yoke.cyclic.app/api/category/delete-category/${selected._id}`
      );

      if (data) {
        toast.success(`Successfully deleted!!!`);
        getAllCategory();
        setUpdatedName("");
        setVisible(false);
        setSelected(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
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
                              onClick={() => {
                                setVisible(true),
                                  setUpdatedName(e.name),
                                  setSelected(e);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                setSelected(e), handleDelete();
                              }}
                            >
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
            <CategoryForm
              handleSubmit={handleUpdateSubmit}
              value={updatedName}
              setValue={setUpdatedName}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
