import { BrowserRouter, Routes, Route } from 'react-router';

import AboutUs from '@/components/page/AboutUs-layout';
import Basket from '@/components/page/Basket-layout';
import Catalog from '@/components/page/Catalog-layout';
import Login from '@/components/page/Login-layout';
import Main from '@/components/page/Main-layout';
import ProductDetail from '@/components/page/ProductDetail-layout';
import Registration from '@/components/page/Registration-layout';
import UserProfile from '@/components/page/UserProfile-layout';
import Navbar from '@/feature/header/NavBar';

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
