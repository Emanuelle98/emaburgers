import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedBurgerSection } from '@/sections/FeaturedBurgerSection';
import { FullMenuSection } from '@/sections/FullMenuSection';
import { ExtrasSection } from '@/sections/ExtrasSection';
import { CartSection } from '@/sections/CartSection';
import { CheckoutSection } from '@/sections/CheckoutSection';
import { ConfirmationSection } from '@/sections/ConfirmationSection';
import type { Burger, Extra } from '@/types';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Data - Smash Burgers Uruguayas
const featuredBurgers: Burger[] = [
  {
    id: 'smash-clasica',
    name: 'La Clásica',
    description: 'Doble medallón smashado con costillas crocantes, cheddar americano derretido, cebolla caramelizada, pepinillos y salsa especial en pan brioche.',
    price: 390,
    image: '/smash-classic.jpg',
    badge: 'La más pedida',
    bgColor: 'mustard',
  },
  {
    id: 'smash-doblequeso',
    name: 'La Doble Queso',
    description: 'Triple medallón smashado, doble cheddar, panceta crispy, cebolla caramelizada y salsa de queso casera. Para los amantes del queso.',
    price: 490,
    image: '/smash-doblequeso.jpg',
    badge: 'Amantes del queso',
    bgColor: 'bubblegum',
  },
  {
    id: 'smash-bbq',
    name: 'La BBQ',
    description: 'Doble medallón smashado con salsa BBQ ahumada, aros de cebolla crispy, cheddar, panceta y un toque de picante.',
    price: 450,
    image: '/smash-bbq.jpg',
    badge: 'Ahumada',
    bgColor: 'lavender',
  },
];

const allBurgers: Burger[] = [
  ...featuredBurgers,
  {
    id: 'smash-chicken',
    name: 'Pollo Crispy',
    description: 'Pechuga de pollo crujiente, mayonesa picante, lechuga fresca y pepinillos en pan brioche.',
    price: 390,
    image: '/smash-chicken.jpg',
    bgColor: 'white',
  },
  {
    id: 'smash-veggie',
    name: 'Veggie Portobello',
    description: 'Hongo portobello a la parrilla, palta, tomate, lechuga y queso suizo en pan integral.',
    price: 380,
    image: '/smash-veggie.jpg',
    bgColor: 'white',
  },
  {
    id: 'smash-sliders',
    name: 'Mini Sliders (3)',
    description: 'Tres mini smash burgers con queso, pepinillos y salsa especial. Ideales para compartir.',
    price: 350,
    image: '/smash-sliders.jpg',
    bgColor: 'white',
  },
];

const extras: Extra[] = [
  {
    id: 'papas',
    name: 'Papas Fritas',
    price: 180,
    image: '/extra-fries.jpg',
  },
  {
    id: 'aros',
    name: 'Aros de Cebolla',
    price: 200,
    image: '/extra-rings.jpg',
  },
  {
    id: 'gaseosa',
    name: 'Gaseosa',
    price: 120,
    image: '/extra-soda.jpg',
  },
  {
    id: 'batido',
    name: 'Batido',
    price: 220,
    image: '/extra-shake.jpg',
  },
];

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Track current section
  useEffect(() => {
    const sections = ['hero', 'menu', 'extras', 'cart'];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentSection(sectionId),
          onEnterBack: () => setCurrentSection(sectionId),
        });
      }
    });
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'cart') {
      setShowCheckout(false);
      setShowConfirmation(false);
    }
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderClick = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCheckoutComplete = () => {
    setShowCheckout(false);
    setShowConfirmation(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleBackToMenu = () => {
    setShowConfirmation(false);
    setShowCheckout(false);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} currentSection={currentSection} />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Hero Section */}
        <HeroSection onOrderClick={handleOrderClick} />

        {/* Featured Burgers (Pinned) */}
        <FeaturedBurgerSection
          burger={featuredBurgers[0]}
          bgColor="soft-pink"
          circleColor="#FFEA00"
          imagePosition="right"
          zIndex={20}
        />
        <FeaturedBurgerSection
          burger={featuredBurgers[1]}
          bgColor="sky-blue"
          circleColor="#FF8A4C"
          imagePosition="left"
          zIndex={30}
        />
        <FeaturedBurgerSection
          burger={featuredBurgers[2]}
          bgColor="soft-pink"
          circleColor="#C6E858"
          imagePosition="right"
          zIndex={40}
        />

        {/* Full Menu */}
        <FullMenuSection burgers={allBurgers} />

        {/* Extras */}
        <ExtrasSection extras={extras} />

        {/* Cart */}
        {!showCheckout && !showConfirmation && (
          <CartSection onCheckout={handleCheckout} />
        )}

        {/* Checkout */}
        {showCheckout && (
          <CheckoutSection
            onBack={() => setShowCheckout(false)}
            onComplete={handleCheckoutComplete}
          />
        )}

        {/* Confirmation */}
        {showConfirmation && (
          <ConfirmationSection onBackToMenu={handleBackToMenu} />
        )}
      </main>
    </div>
  );
}

export default App;
