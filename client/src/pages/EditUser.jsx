import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
// import "./EditUser.css";

const EditUser = () => {
  // Ensure 'EditUser' is the name of the component
  const { authorizationToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        // toast.success("Updated Successfully");
        navigate("/admin/users");
      } else {
        toast.error("Not Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image reg-img">
            <img
              src="/images/design.png"
              alt="a nurse with a cute look"
              width="400"
              height="500"
            />
          </div>

          <div className="registration-form">
            <h1 className="main-heading mb-3">Update form</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  placeholder="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="number"
                  name="phone"
                  value={user.phone}
                  placeholder="phone"
                  onChange={handleChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
