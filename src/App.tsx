import { BrowserRouter, Routes, Route } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/feature/auth/login/auth-provider';
import Navbar from '@/feature/header/NavBar';
import AboutUs from '@/pages/about-us-page';
import Basket from '@/pages/basket-page';
import Catalog from '@/pages/catalog-page';
import Login from '@/pages/login-page';
import Main from '@/pages/main-page';
import ProductDetail from '@/pages/product-detail-page';
import Registration from '@/pages/registration-page';
import UserProfile from '@/pages/user-profile-page';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
