import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import AuthLayout from "./auth/AuthLayout";
import QueryProvider from "./components/providers/query.provider";
import Settings from "./pages/app/setting/Settings";
import Login from "./auth/components/Login";
import Home from "./pages/home/Home";
import PasswordChange from "./pages/app/setting/PasswordChange";
import Statistic from "./pages/app/users/Statistic";
import Report from "./pages/app/report/Report";

createRoot(document.getElementById("root")!).render(
  <>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path={"/user"} element={<Statistic />} />
            <Route path="/users/settings" element={<Settings />} />
            <Route path="/users/change" element={<PasswordChange />} />
            <Route path={"/report"} element={<Report />} />
            
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </>
);
