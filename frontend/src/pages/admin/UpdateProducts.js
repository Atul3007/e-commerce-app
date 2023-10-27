import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
import { useNavigate, useLocation, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping,setShipping]=useState("");
  const [auth] = useAuth();
  const [id,setId]=useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "multipart/form-data",
    },
  };

  const { slug } = useParams();

  // Get category
  const getSingleProduct = async (req, res) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/product/get-single-product/${slug}`
      );
      setName(res.data.message.name);
      setId(res.data.message._id);
      setDescription(res.data.message.description);
      setPrice(res.data.message.price);
      setQuantity(res.data.message.quantity)
      setShipping(res.data.message.shipping);
      setCategory(res.data.message.category.name)

     //console.log(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error("Error in getting categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);


  const getAllCategory = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:8000/api/category/all"
      );
      if (data) {
        setCategories(data?.data);
       // console.log(data?.data);
      } else {
        console.log("Error in getting category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const response = await axios.put(
        `http://localhost:8000/api/product/upate-product/${id}`,
        productData,
        config
      );

      if (response.status === 201) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/product");
      } else {
        toast.error("Failed to update the product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate}>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                 {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div> 
                  ) : (  <div className="text-center">
                  <img
                    src={`http://localhost:8000/api/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div> 
              )
                  }
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping?"Yes":"No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" type="submit">
                    UPDATE PRODUCT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
