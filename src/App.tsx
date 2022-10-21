import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Cart, Products } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
