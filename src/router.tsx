import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { PricePlans } from "./pages/price-plans";
import { Pages } from "./pages/pages";
import { Products } from "./pages/products";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.pricePlans.path} element={<PricePlans />} />
        <Route path={ROUTES.pages.path} element={<Pages />} />
        <Route path={ROUTES.products.path} element={<Products />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.products.path} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
