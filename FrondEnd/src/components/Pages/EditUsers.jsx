import  { useState } from "react";
import { useParams } from "react-router-dom";

function EditUsers() {
  const [formData, setFormData] = useState({
    salary: "",
   vacationDays: ""

  });
console.log(formData.salary)
  const { id } = useParams();
  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Vacation Days"
          name="vacationDays"
          value={formData.vacationDays}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          placeholder="Work Hours"
          name="workHours"
          value={formData.workHours}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contract Limit"
          name="contractLimit"
          value={formData.contractLimit}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Created At"
          name="createdAt"
          value={formData.createdAt}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Updated At"
          name="updatedAt"
          value={formData.updatedAt}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        /> */}
        <button type="submit">Update Employee</button>
      </form>
    </>
  );
}

export default EditUsers;
