import { BrowserRouter, Routes, Route } from 'react-router';

import AboutUs from '@/components/layout/AboutUs-layout';
import Basket from '@/components/layout/Basket-layout';
import Catalog from '@/components/layout/Catalog-layout';
import Login from '@/components/layout/Login-layout';
import Main from '@/components/layout/Main-layout';
import ProductDetail from '@/components/layout/ProductDetail-layout';
import Registration from '@/components/layout/Registration-layout';
import UserProfile from '@/components/layout/UserProfile-layout';
import Navbar from '@/components/ui/navBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
