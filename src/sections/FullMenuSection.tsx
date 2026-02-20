import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Burger } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface FullMenuSectionProps {
  burgers: Burger[];
}

export function FullMenuSection({ burgers }: FullMenuSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with stagger
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: '10vh', scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (burger: Burger) => {
    addItem({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      image: burger.image,
      type: 'burger',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="bg-sky-blue py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="font-fredoka text-section font-bold text-near-black text-center mb-12"
        >
          Nuestro Menú
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {burgers.map((burger, index) => (
            <div
              key={burger.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="kiddo-card p-5 hover:-translate-y-1.5 transition-transform duration-200"
            >
              {/* Image */}
              <div className="relative mb-4 rounded-kiddo-sm overflow-hidden bg-gray-100 aspect-square">
                <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                  <img
                    src={burger.image}
                    alt={burger.name}
                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block'}} 
                  />
                </div>
                {burger.badge && (
                  <span className="absolute top-3 right-3 bg-neon-yellow border-[2px] border-near-black rounded-full px-3 py-1 font-fredoka font-bold text-xs">
                    {burger.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="font-fredoka text-xl font-bold text-near-black mb-2">
                {burger.name}
              </h3>
              <p className="font-nunito text-sm text-dark-gray mb-3 line-clamp-2">
                {burger.description}
              </p>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between">
                <span className="font-fredoka text-lg font-bold text-near-black">
                  ${burger.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(burger)}
                  className="kiddo-btn-outline flex items-center gap-1 py-2 px-3"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
