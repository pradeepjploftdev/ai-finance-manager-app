import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItems } from "../store/item/itemThunk";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/api/items";

function Home() {
    const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);

  const [editItem, SetEditItem] = useState()
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  // Add new todo
  const handleAdd = async () => {
    if (!task) return alert("Task is required");
    dispatch(addItem({ name: task, description }))
    toast.success('Task added successfully')
    setTask("")
    setDescription("")
    dispatch(getItems())
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Task deleted successfully')
      dispatch(getItems())
    } catch (err) {
      console.error(err);
    }
  };

  // Edit todo
  const handleEditClick = async (item) => {
    SetEditItem(item)
    setTask(item.name)
    setDescription(item.description)
  };

  const handleEdit = async (item) => {
    try {
      await axios.put(`${API_URL}/${item._id}`, { name: task, description: description });
      toast.success('Task updated successfully')
      dispatch(getItems())
      SetEditItem()
      setTask("")
    setDescription("")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        duration: 2500,
        style: {
          background: "#111827",
          color: "#f9fafb",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
        },
      }} />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {editItem ? "Edit Task" : "To-Dos"}
        </h1>

        {/* Task List */}
        <AnimatePresence>
          {items.filter((item) => item?._id !== editItem?._id).map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-500 cursor-pointer hover:text-blue-600 transition">
                  <Edit onClick={() => handleEditClick(item)} />
                </span>
                <span className="text-red-500 cursor-pointer hover:text-red-600 transition">
                  <DeleteForever onClick={() => handleDelete(item._id)} />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add/Edit Form */}
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              disabled={!task}
              className="flex-1 bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition-colors shadow hover:shadow-md"
              onClick={editItem ? () => handleEdit(editItem) : handleAdd}
            >
              {editItem ? "Update Task" : "Add Task"}
            </button>
            {editItem && (
              <button
                className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors shadow hover:shadow-md"
                onClick={() => {
                  SetEditItem();
                  setTask("");
                  setDescription("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;