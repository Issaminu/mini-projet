"use client";
import React from "react";
import Navbar from "../../components/Navbar/AdminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
