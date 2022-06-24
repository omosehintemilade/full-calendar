import React from "react";

import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";
import Dashboard from "./Dashboard";
import DemoApp from "./Home";

export default function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/example" element={<DemoApp />} />

          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          {/*  404 PAGE */}
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </>
  );
}
