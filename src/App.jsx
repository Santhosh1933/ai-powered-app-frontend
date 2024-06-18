import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/page";
import { Dashboard } from "./pages/Dashboard/page";
import { Navbar } from "./components/Navbar";
import { Quiz } from "./pages/Dashboard/Quiz/page";
import { Review } from "./pages/Dashboard/Review/page";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { UpgradePage } from "./pages/Upgrade/page";
import { Guide } from "./pages/Guide/page";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SignedOut>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<UpgradePage />} path="/upgrade" />
          <Route element={<Guide />} path="/faq" />
        </Routes>
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<UpgradePage />} path="/upgrade" />
          <Route element={<Quiz />} path="/dashboard/test/:id" />
          <Route element={<Review />} path="/dashboard/review/:id" />
          <Route element={<Guide />} path="/faq" />
        </Routes>
      </SignedIn>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
