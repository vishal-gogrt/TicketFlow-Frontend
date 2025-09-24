import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/authSlice";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Required";
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (values.password && values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(updateProfile({ name: values.name, email: values.email }));
      alert("Profile updated successfully!");
    },
  });

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Edit Profile
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
