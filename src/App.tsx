import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Home from './pages/Home';
import InvestorRelations from './pages/InvestorRelations';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About />;
      case 'products':
        return <Products />;
      case 'profile':
        return <InvestorRelations />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer setActivePage={setActivePage} />
      </div>
    </LanguageProvider>
  );
}

export default App;
