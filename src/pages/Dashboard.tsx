import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaUser, FaBox, FaUsers, FaUserCircle, FaClipboardList, FaListAlt, FaShoppingCart, FaTag, FaBuilding, FaSignOutAlt, FaCog } from 'react-icons/fa'; // Import ikon yang diperlukan

const SidebarItem = ({ icon, text, to }) => (
  <div className="mb-4 flex items-center">
    {icon && <icon.type className="mr-2" />}
    <Link to={to} className="text-blue-500 hover:underline">
      {text}
    </Link>
  </div>
);

const DashboardPage: React.FC = () => {
  useEffect(() => {
    // Cek apakah pengguna memiliki sesi
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // Jika tidak, arahkan pengguna ke halaman login
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <SidebarItem icon={<FaChartBar />} text="Dashboard" to="/dashboard" />
      <SidebarItem icon={<FaUser />} text="Users" to="/users" />
      <SidebarItem icon={<FaBox />} text="Products" to="/products" />
      <SidebarItem icon={<FaUsers />} text="Customers" to="/customers" />
      <SidebarItem icon={<FaUserCircle />} text="Roles" to="/roles" />
      <SidebarItem icon={<FaClipboardList />} text="Inventory Transactions" to="/inventaryTransacsions" />
      <SidebarItem icon={<FaListAlt />} text="Order Details" to="/ordersdetails" />
      <SidebarItem icon={<FaShoppingCart />} text="Orders" to="/orders" />
      <SidebarItem icon={<FaListAlt />} text="Purchase Details" to="/purchasedetails" />
      <SidebarItem icon={<FaShoppingCart />} text="Purchases" to="/purchases" />
      <SidebarItem icon={<FaBuilding />} text="Suppliers" to="/suppliers" />
      <SidebarItem icon={<FaCog />} text="Settings" to="/settings" />
      <SidebarItem icon={<FaSignOutAlt />} text="Log Out" to="/logout" />
    </div>
  );
};

export default DashboardPage;
