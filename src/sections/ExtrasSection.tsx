import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Extra } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ExtrasSectionProps {
  extras: Extra[];
}

export function ExtrasSection({ extras }: ExtrasSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
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

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
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

  const toggleExtra = (extra: Extra) => {
    if (selectedExtras.has(extra.id)) {
      setSelectedExtras((prev) => {
        const newSet = new Set(prev);
        newSet.delete(extra.id);
        return newSet;
      });
    } else {
      setSelectedExtras((prev) => new Set(prev).add(extra.id));
      addItem({
        id: extra.id,
        name: extra.name,
        price: extra.price,
        image: extra.image,
        type: 'extra',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="extras"
      className="bg-soft-pink py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="font-fredoka text-section font-bold text-near-black text-center mb-12"
        >
          Completá tu pedido
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {extras.map((extra, index) => {
            const isSelected = selectedExtras.has(extra.id);
            
            return (
              <div
                key={extra.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => toggleExtra(extra)}
                className={`cursor-pointer rounded-kiddo-sm border-[2.5px] border-near-black p-4 transition-all duration-200 ${
                  isSelected
                    ? 'bg-neon-yellow'
                    : 'bg-white hover:-translate-y-1'
                }`}
                style={{ boxShadow: '0 6px 0 #141414' }}
              >
                {/* Image */}
                <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={extra.image}
                    alt={extra.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-neon-yellow/30 flex items-center justify-center">
                      <div className="w-10 h-10 bg-neon-yellow border-[2.5px] border-near-black rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-near-black" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-fredoka text-base sm:text-lg font-bold text-near-black text-center mb-1">
                  {extra.name}
                </h3>
                <p className="font-nunito text-sm font-semibold text-dark-gray text-center">
                  ${extra.price.toFixed(2)}
                </p>

                {/* Add Button */}
                <button
                  className={`w-full mt-3 py-2 rounded-full border-[2px] border-near-black font-nunito font-bold text-xs flex items-center justify-center gap-1 transition-colors ${
                    isSelected
                      ? 'bg-white'
                      : 'bg-neon-yellow hover:bg-yellow-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3" />
                      Agregado
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      Agregar
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
