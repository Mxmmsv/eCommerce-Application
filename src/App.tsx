import { BrowserRouter, Routes, Route } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/feature/auth/login/auth-provider';
import { Header } from '@/feature/header/header';
import AboutUs from '@/pages/about-us-page';
import Cart from '@/pages/cart-page';
import Catalog from '@/pages/catalog-page';
import Home from '@/pages/home-page';
import Login from '@/pages/login-page';
import NotFound from '@/pages/not-found-page';
import ProductDetail from '@/pages/product-detail-page';
import UserProfile from '@/pages/profile-user-page';
import Registration from '@/pages/registration-page';
import Wishlist from '@/pages/wishlist-page';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="UI-THEME">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
