'use client';
import React from 'react';
import Navbar from '../../components/Navbar/ManagerNavBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar />
      <div className="mt-12 lg:mt-0 lg:ml-64 w-full ">{children}</div>
    </div>
  );
};

export default AdminLayout;
