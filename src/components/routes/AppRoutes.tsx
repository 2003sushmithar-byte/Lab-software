import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Layout from "../../common components/layout/Layout";
import Dashboard from "../dashboard/Dashboard";
import Signup from "../home/Signup";
import Login from "../home/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
           {/* 
          <Route path="/patients" element={<PatientList />} />
          <Route path="/tests" element={<TestList />} />
          <Route path="/billing" element={<Billing />} />
          */}
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/signup" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;