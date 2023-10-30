import React from "react";

import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import router from "./routes/Router";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
