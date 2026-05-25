import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import LessonChatPage from "./pages/LessonChatPage";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminUserHistory from "./pages/AdminUserHistory";
import AddCategory from "./pages/AddCategory";
import AddSubCategory from "./pages/AddSubCategory";
import EditCategory from "./pages/EditCategory";
import EditSubCategory from "./pages/EditSubCategory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:categoryId"
          element={
            <ProtectedRoute>
              <SubCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:categoryId/:subCategoryId"
          element={
            <ProtectedRoute>
              <LessonChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:userId/history"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUserHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/:categoryId/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/:categoryId/subcategories/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddSubCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/:categoryId/subcategories/:subCategoryId/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditSubCategory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;