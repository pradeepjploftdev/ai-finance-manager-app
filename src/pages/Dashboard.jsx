import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpenseExtractor from "../components/ExpenseExtractor";
import { logoutUser } from "../store/auth/authThunk";
import Home from "./Home";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Dispatch Redux logout
    dispatch(logoutUser());

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="relative">
      <div className="flex justify-between fixed top-0 left-0 w-full z-50 bg-black text-white px-5 py-2">
        <h1 className="text-2xl font-bold mb-4">iFM</h1>
        <div className="flex items-center gap-2">
          <p className="rounded-full flex items-center justify-center bg-red-400 text-white border-2 capitalize h-8 w-8">{user?.name && user?.name[0]}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-2 cursor-pointer py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* <ExpenseExtractor /> */}
      <Home className="mt-[10rem]"/>

      {/* <div className="flex items-center justify-center mt-[10rem]">
        <div className="max-w-[20rem] border p-4 rounded border-gray-300 w-full">
          <table className="text-center w-full">
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Item/Purpose</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Test Cat</td>
              <td>Test item</td>
              <td>23</td>
            </tr>
          </table>

          <textarea
            className="border border-gray-300 h-20 w-full rounded mt-4"
            placeholder="Enter prompt here"
          />
          <button
            className="bg-black text-white w-full p-2 rounded-lg font-semibold cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
