import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

gsap.registerPlugin(ScrollTrigger);

interface CartSectionProps {
  onCheckout: () => void;
}

export function CartSection({ onCheckout }: CartSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal } = useCartStore();

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (items.length === 0) {
    return (
      <section
        ref={sectionRef}
        id="cart"
        className="bg-sky-blue py-20 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center"
      >
        <div ref={cardRef} className="kiddo-card p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-soft-pink border-[2.5px] border-near-black rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🍔</span>
          </div>
          <h2 className="font-fredoka text-2xl font-bold text-near-black mb-3">
            Tu carrito está vacío
          </h2>
          <p className="font-nunito text-dark-gray mb-6">
            ¡Tu panza está vacía... llenala con una smash!
          </p>
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="kiddo-btn"
          >
            Ver Menú
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="cart"
      className="bg-sky-blue py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={cardRef} className="kiddo-card p-6 sm:p-8">
          <h2 className="font-fredoka text-section font-bold text-near-black mb-8">
            Tu Pedido
          </h2>

          {/* Line Items */}
          <div className="space-y-4 mb-8">
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="flex items-center gap-4 p-4 bg-white border-[2px] border-near-black rounded-kiddo-sm"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border-[2px] border-near-black"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-fredoka text-base sm:text-lg font-bold text-near-black truncate">
                    {item.name}
                  </h3>
                  <p className="font-nunito text-sm text-dark-gray">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-white border-[2px] border-near-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-fredoka font-bold text-lg w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-neon-yellow border-[2px] border-near-black rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Price & Delete */}
                <div className="text-right hidden sm:block">
                  <p className="font-fredoka font-bold text-near-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t-[2px] border-near-black pt-6 mb-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-nunito text-dark-gray">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-nunito text-dark-gray">
                <span>IVA (22%)</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t-[2px] border-dashed border-near-black">
              <span className="font-fredoka text-xl font-bold text-near-black">Total</span>
              <span className="font-fredoka text-2xl font-bold text-near-black">
                ${getTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className="kiddo-btn w-full flex items-center justify-center gap-2"
          >
            Finalizar Pedido
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
