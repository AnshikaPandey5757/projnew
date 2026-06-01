import { Suspense, lazy } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import LoadingSpinner from "../components/common/LoadingSpinner";

/* -------------------------
   Lazy Imports
------------------------- */

const Home = lazy(() =>
  import("../pages/Home")
);

const Dashboard = lazy(() =>
  import("../pages/Dashboard")
);

const Login = lazy(() =>
  import("../pages/auth/Login")
);

const Signup = lazy(() =>
  import("../pages/auth/Signup")
);

const VerifyIdentity = lazy(() =>
  import("../pages/auth/VerifyIdentity")
);

const ItemDetails = lazy(() =>
  import("../pages/ItemDetails")
);

const LendItem = lazy(() => import("../pages/LendItems"));

const BorrowRequests = lazy(() => import("../pages/BorrowRequest"));

const Profile = lazy(() =>
  import("../pages/Profile")
);

const Notifications = lazy(() =>
  import("../pages/Notifications")
);

const TrustReport = lazy(() =>
  import("../pages/TrustReport")
);

const Settings = lazy(() =>
  import("../pages/Settings")
);

/* -------------------------
   404 Page
------------------------- */

function NotFound() {
  return (
    <div
      className="
        min-h-screen
        bg-[#0B0F1A]
        flex
        items-center
        justify-center
        text-white
        px-6
      "
    >
      <div className="text-center">
        <h1
          className="
            font-syne
            text-8xl
            font-bold
          "
        >
          404
        </h1>

        <p className="mt-4 text-gray-400">
          Page not found.
        </p>
      </div>
    </div>
  );
}

/* -------------------------
   App Routes
------------------------- */

const AppRoutes = () => {
  return (
    <Suspense
      fallback={<LoadingSpinner />}
    >
      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify"
          element={<VerifyIdentity />}
        />

        <Route
          path="/item/:id"
          element={<ItemDetails />}
        />

        {/* PROTECTED */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lend"
          element={
            <ProtectedRoute>
              <LendItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <BorrowRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trust-report"
          element={
            <ProtectedRoute>
              <TrustReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* REDIRECTS */}

        <Route
          path="/home"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;