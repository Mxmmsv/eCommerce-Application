import { BrowserRouter, Routes, Route } from 'react-router';

import AboutUs from '@/components/page/about-us-page';
import Basket from '@/components/page/basket-page';
import Catalog from '@/components/page/catalog-page';
import Login from '@/components/page/login-page';
import Main from '@/components/page/main-page';
import ProductDetail from '@/components/page/product-detail-page';
import Registration from '@/components/page/registration-page';
import UserProfile from '@/components/page/user-profile-page';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/feature/auth/login/auth-provider';
import Navbar from '@/feature/header/NavBar';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="UI-THEME">
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
          <Toaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
