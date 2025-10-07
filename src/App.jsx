import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!task) return alert("Task is required");
    try {
      await axios.post(API_URL, { name: task, description });
      setTask("");
      setDescription("");
      fetchTodos(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit todo
  const handleEdit = async (item) => {
    const newName = prompt("Enter new task name", item.name);
    const newDescription = prompt("Enter new description", item.description);
    if (!newName) return;
    try {
      await axios.put(`${API_URL}/${item._id}`, { name: newName, description: newDescription });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[20rem]">
        <p className="text-xl font-bold my-2 text-gray-800">To Dos</p>
        <div className="row flex flex-col gap-2">
          {data.map((item) => (
            <div
              key={item._id}
              className="col flex gap-5 items-center justify-between border border-gray-200 rounded p-2"
            >
              <div>
                <p className="text-md font-bold text-gray-700">{item.name}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xl font-bold my-2 text-gray-800 mt-5">Add New To Do</p>
        <div className="row flex flex-col gap-2">
          <div className="border flex flex-col border-gray-200 rounded p-2">
            <label className="text-md font-bold text-gray-700">Task</label>
            <input
              className="border rounded border-gray-400"
              placeholder="Task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <label className="text-md font-bold text-gray-700 mt-1">Description</label>
            <input
              className="border rounded border-gray-400"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="border rounded bg-black text-white font-semibold p-1 cursor-pointer"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;