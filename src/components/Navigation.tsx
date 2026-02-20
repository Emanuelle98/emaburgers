import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function Navigation({ onNavigate, currentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'menu', label: 'Menú' },
    { id: 'extras', label: 'Extras' },
    { id: 'cart', label: 'Carrito' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b-[2.5px] border-near-black py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 font-fredoka text-2xl sm:text-3xl font-bold text-near-black hover:scale-105 transition-transform"
          >
            <img 
              src="/logo-ema.png" 
              alt="Ema" 
              className="h-8 sm:h-10 w-auto"
            />
            <span>Ema</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2 rounded-full font-nunito font-semibold text-sm transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-neon-yellow border-[2.5px] border-near-black'
                    : 'hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex items-center gap-2 bg-white border-[2.5px] border-near-black rounded-full px-4 py-2 hover:bg-neon-yellow transition-colors duration-200"
              style={{ boxShadow: '0 4px 0 #141414' }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-nunito font-bold text-sm hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-bubblegum border-[2px] border-near-black text-near-black w-6 h-6 rounded-full flex items-center justify-center font-fredoka font-bold text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-white border-[2.5px] border-near-black rounded-full p-2"
              style={{ boxShadow: '0 4px 0 #141414' }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-[2.5px] border-near-black rounded-kiddo-sm p-4 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-nunito font-semibold mb-2 ${
                  currentSection === item.id
                    ? 'bg-neon-yellow'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
