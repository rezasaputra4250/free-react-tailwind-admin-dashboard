import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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
import ProductsPage from "./pages/Products/Index";
import AddProductPage from "./pages/Products/Add";
import EditProductPage from "./pages/Products/Edit";
import Dashboard from './pages/Dashboard';
import DetailProductPage from './pages/Products/Detail';
import CustomersPage from './pages/Customers/IndexPage';
import CustomersAddPage from './pages/Customers/AddPage';
import CustomersEditPage from './pages/Customers/EditPage';
import CustomersDetailPage from './pages/Customers/DetailPage';
import axios from 'axios';
axios.defaults.withCredentials = true

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <ECommerce />
          </>
        }
      />
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

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
      <Route path="/products/edit/:id" element={<EditProductPage />} />
      <Route path="/products/detail/:id" element={<DetailProductPage />} />

      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/add" element={<CustomersAddPage />} />
      <Route path="/customers/edit/:id" element={<CustomersDetailPage />} />
      <Route path="/customers/detail/:id" element={<CustomersEditPage />} />
    </Routes>
  );
}

export default App;
