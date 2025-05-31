import { BrowserRouter, Routes, Route } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/feature/auth/login/auth-provider';
import ProtectedRoute from '@/feature/auth/login/protected-route';
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

import { ScrollToTop } from './service/scroll-to-top';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="UI-THEME">
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Toaster position="top-center" richColors closeButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/category/:id" element={<Catalog />} />
            <Route path="/catalog/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
