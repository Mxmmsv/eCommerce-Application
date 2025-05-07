import { BrowserRouter, Routes, Route } from 'react-router';

import AboutUs from '@/components/page/About-us-page';
import Basket from '@/components/page/Basket-page';
import Catalog from '@/components/page/Catalog-page';
import Login from '@/components/page/Login-page';
import Main from '@/components/page/Main-page';
import ProductDetail from '@/components/page/Product-detail-page';
import Registration from '@/components/page/Registration-page';
import UserProfile from '@/components/page/User-profile-page';
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
