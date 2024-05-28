import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContacts = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Not deleted Successfully ");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, [deleteContacts]);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Contacts Data </h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((curUser, index) => {
                  return (
                    <tr key={index}>
                      <td>{curUser.username}</td>
                      <td>{curUser.email}</td>
                      <td>{curUser.message}</td>
                      <td>Edit</td>
                      <td>
                        <button onClick={() => deleteContacts(curUser._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="admin-contacts-table" colSpan="5">
                    No data to Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
