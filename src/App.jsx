import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/page";
import { Dashboard } from "./pages/Dashboard/page";
import { Navbar } from "./components/Navbar";
import { Quiz } from "./pages/Dashboard/Quiz/page";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Quiz/>} path="/dashboard/test/:id"/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
