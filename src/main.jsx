import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store";
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <App />
   <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
         duration: 3000,
         style: {
            background: "#1f2937", // dark gray
            color: "#f9fafb",      // light text
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
         },
         success: {
            style: {
            background: "#16a34a",
            },
         },
         error: {
            style: {
            background: "#dc2626",
            },
         },
      }}
   />
   </Provider>,
)
