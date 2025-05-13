import { BrowserRouter, Routes, Route } from 'react-router';

import AboutUs from '@/components/page/about-us-page';
import Basket from '@/components/page/basket-page';
import Catalog from '@/components/page/catalog-page';
import Login from '@/components/page/login-page';
import Main from '@/components/page/main-page';
import ProductDetail from '@/components/page/product-detail-page';
import Registration from '@/components/page/registration-page';
import UserProfile from '@/components/page/user-profile-page';
import Navbar from '@/components/ui/navBar/NavBar';
import { Toaster } from '@/components/ui/sonner';

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
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
