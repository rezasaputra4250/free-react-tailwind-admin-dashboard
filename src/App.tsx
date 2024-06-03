import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Dashboard from './pages/Dashboard';
import CustomersPage from './pages/Customers/IndexPage';
import SuppliersPage from './pages/Suppliers/IndexPage';
import ProductsPage from './pages/Products/IndexPage';
import OrdersPage from './pages/Orders/IndexPage';
import OrdersDetailsPage from './pages/OrderDetails/IndexPage';
import InventoryTransactionsPage from './pages/InventoryTransactions/IndexPage';
import UsersPage from './pages/Users/IndexPage';
import RolesPage from './pages/Roles/IndexPage';
import PurchasesPage from './pages/Purchases/IndexPage';
import PurchasesDetailsPage from './pages/PurchaseDetails/IndexPage';

import CustomersAddPage from './pages/Customers/AddPage';
import SuppliersAddPage from './pages/Suppliers/AddPage';
import ProductsAddPage from './pages/Products/AddPage';
import OrdersAddPage from './pages/Orders/AddPage';
import OrdersDetailsAddPage from './pages/OrderDetails/AddPage';
import InventoryTransactionsAddPage from './pages/InventoryTransactions/AddPage';
import UsersAddPage from './pages/Users/AddPage';
import RolesAddPage from './pages/Roles/AddPage';
import PurchasesAddPage from './pages/Purchases/AddPage';
import PurchasesDetailsAddPage from './pages/PurchaseDetails/AddPage';

import CustomersDetailPage from './pages/Customers/DetailPage';
import SuppliersDetailPage from './pages/Suppliers/DetailPage';
import ProductsDetailPage from './pages/Products/DetailPage';
import OrdersDetailPage from './pages/Orders/DetailPage';
import OrdersDetailsDetailPage from './pages/OrderDetails/DetailPage';
import InventoryTransactionsDetailPage from './pages/InventoryTransactions/DetailPage';
import UsersDetailPage from './pages/Users/DetailPage';
import RolesDetailPage from './pages/Roles/DetailPage';
import PurchasesDetailPage from './pages/PurchaseDetails/DetailPage';
import PurchasesDetailsDetailPage from './pages/PurchaseDetails/DetailPage';

import CustomersEditPage from './pages/OrderDetails/EditPage';
import SuppliersEditPage from './pages/Suppliers/EditPage';
import ProductsEditPage from './pages/Products/EditPage';
import OrdersEditPage from './pages/Orders/EditPage';
import OrdersDetailsEditPage from './pages/OrderDetails/EditPage';
import InventoryTransactionsEditPage from './pages/InventoryTransactions/EditPage';
import UsersEditPage from './pages/Users/EditPage';
import RolesEditPage from './pages/Roles/EditPage';
import PurchasesEditPage from './pages/Purchases/EditPage';
import PurchasesDetailsEditPage from './pages/PurchaseDetails/EditPage';

axios.defaults.withCredentials = true;

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<ECommerceWithPageTitle />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forms/form-elements" element={<FormElements />} />
      <Route path="/forms/form-layout" element={<FormLayout />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/ui/alerts" element={<Alerts />} />
      <Route path="/ui/buttons" element={<Buttons />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* Customers Routes */}
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/add" element={<CustomersAddPage />} />
      <Route path="/customers/edit/:id" element={<CustomersEditPage />} />
      <Route path="/customers/detail/:id" element={<CustomersDetailPage />} />

      {/* Suppliers Routes */}
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/suppliers/add" element={<SuppliersAddPage />} />
      <Route path="/suppliers/edit/:id" element={<SuppliersEditPage />} />
      <Route path="/suppliers/detail/:id" element={<SuppliersDetailPage />} />

      {/* Products Routes */}
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/add" element={<ProductsAddPage />} />
      <Route path="/products/edit/:id" element={<ProductsEditPage />} />
      <Route path="/products/detail/:id" element={<ProductsDetailPage />} />

      {/* Orders Routes */}
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/add" element={<OrdersAddPage />} />
      <Route path="/orders/edit/:id" element={<OrdersEditPage />} />
      <Route path="/orders/detail/:id" element={<OrdersDetailPage />} />

      {/* OrdersDetails Routes */}
      <Route path="/ordersdetails" element={<OrdersDetailsPage />} />
      <Route path="/ordersdetails/add" element={<OrdersDetailsAddPage />} />
      <Route path="/ordersdetails/edit/:id" element={<OrdersDetailsEditPage />} />
      <Route path="/ordersdetails/detail/:id" element={<OrdersDetailsDetailPage />} />

      {/* InventoryTransactions Routes */}
      <Route path="/inventorytransactions" element={<InventoryTransactionsPage />} />
      <Route path="/inventorytransactions/add" element={<InventoryTransactionsAddPage />} />
      <Route path="/inventorytransactions/edit/:id" element={<InventoryTransactionsEditPage />} />
      <Route path="/inventorytransactions/detail/:id" element={<InventoryTransactionsDetailPage />} />

      {/* Users Routes */}
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/add" element={<UsersAddPage />} />
      <Route path="/users/edit/:id" element={<UsersEditPage />} />
      <Route path="/users/detail/:id" element={<UsersDetailPage />} />

      {/* Roles Routes */}
      <Route path="/roles" element={<RolesPage />} />
      <Route path="/roles/add" element={<RolesAddPage />} />
      <Route path="/roles/edit/:id" element={<RolesEditPage />} />
      <Route path="/roles/detail/:id" element={<RolesDetailPage />} />

      {/* Purchases Routes */}
      <Route path="/purchases" element={<PurchasesPage />} />
      <Route path="/purchases/add" element={<PurchasesAddPage />} />
      <Route path="/purchases/edit/:id" element={<PurchasesEditPage />} />
      <Route path="/purchases/detail/:id" element={<PurchasesDetailPage />} />

      {/* PurchasesDetails Routes */}
      <Route path="/purchasesdetails" element={<PurchasesDetailsPage />} />
      <Route path="/purchasesdetails/add" element={<PurchasesDetailsAddPage />} />
      <Route path="/purchasesdetails/edit/:id" element={<PurchasesDetailsEditPage />} />
      <Route path="/purchasesdetails/detail/:id" element={<PurchasesDetailsDetailPage />} />
    </Routes>
  );
}

// Component to add PageTitle to ECommerce page
function ECommerceWithPageTitle() {
  return (
    <>
      <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
      <ECommerce />
    </>
  );
}

export default App;