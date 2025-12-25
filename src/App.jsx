import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import ArtificialJewellery from './components/ArtificialJewellery'
import SilverJewellery from './components/SilverJewellery'
import FreshArrivals from './pages/FreshArrivals'
import BestSellers from './pages/BestSellers'
import Description from './components/Description'
import Checkout from './components/Checkout'
import AdminRouter from './admin/AdminRouter'
import Bill from './pages/Bill'

function App() {
  const getRoute = () => {
    const hash = window.location.hash.replace(/^#/, '') || '/';
    return hash;
  };

  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {route !== '/bill' && <NavBar />}
      {route === '/' && <Home />}
      {route === '/cart' && <Cart />}
      {route === '/wishlist' && <Wishlist />}
      {route === '/artificial' && <ArtificialJewellery />}
      {route === '/silver' && <SilverJewellery />}
      {route === '/fresh-arrivals' && <FreshArrivals />}
      {route === '/best-sellers' && <BestSellers />}
      {route.startsWith('/product/') && <Description />}
      {route.startsWith('/admin') && <AdminRouter />}
      {route === '/checkout' && <Checkout />}
      {route === '/bill' && <Bill />}
      {route !== '/bill' && <Footer />}
    </>
  )
}

export default App
