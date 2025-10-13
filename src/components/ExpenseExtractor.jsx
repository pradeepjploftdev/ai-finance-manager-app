import { useState } from "react";
import axios from "axios";

function ExpenseExtractor() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({ category: "", amount: "" });

  const handleExtract = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/expense/extract", { text });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to extract expense");
    }
  };

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter expense prompt" />
      <button onClick={handleExtract}>Extract Expense</button>

      <div>
        <p>Category: {result.category}</p>
        <p>Amount: {result.amount}</p>
      </div>
    </div>
  );
}

export default ExpenseExtractor;