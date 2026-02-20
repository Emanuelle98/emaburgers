import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard, Banknote, Check, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

gsap.registerPlugin(ScrollTrigger);

interface CheckoutSectionProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutSection({ onBack, onComplete }: CheckoutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const { getTotal, clearCart } = useCartStore();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    clearCart();
    onComplete();
  };

  const isFormValid = formData.name && formData.phone && formData.address;

  return (
    <section
      ref={sectionRef}
      className="bg-soft-pink py-20 px-4 sm:px-6 lg:px-8 min-h-screen"
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 font-nunito font-semibold text-near-black hover:text-dark-gray transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al carrito
        </button>

        <div ref={cardRef} className="kiddo-card p-6 sm:p-8">
          <h2 className="font-fredoka text-section font-bold text-near-black mb-8">
            Finalizar Pedido
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-fredoka text-xl font-bold text-near-black">
                Datos de Entrega
              </h3>
              
              <div>
                <label className="block font-nunito font-semibold text-sm text-dark-gray mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Pérez"
                  className="kiddo-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-nunito font-semibold text-sm text-dark-gray mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="099 123 456"
                  className="kiddo-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-nunito font-semibold text-sm text-dark-gray mb-2">
                  Dirección de entrega
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Av. 18 de Julio 1234, apto 301"
                  rows={3}
                  className="kiddo-input w-full resize-none"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-fredoka text-xl font-bold text-near-black">
                Método de Pago
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-kiddo-sm border-[2.5px] border-near-black transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-neon-yellow'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  style={{ boxShadow: paymentMethod === 'card' ? '0 4px 0 #141414' : 'none' }}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-nunito font-semibold text-sm">Tarjeta</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-kiddo-sm border-[2.5px] border-near-black transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-neon-yellow'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  style={{ boxShadow: paymentMethod === 'cash' ? '0 4px 0 #141414' : 'none' }}
                >
                  <Banknote className="w-6 h-6" />
                  <span className="font-nunito font-semibold text-sm">Efectivo</span>
                </button>
              </div>
            </div>

            {/* Total & Submit */}
            <div className="border-t-[2px] border-near-black pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-fredoka text-xl font-bold text-near-black">
                  Total a pagar
                </span>
                <span className="font-fredoka text-2xl font-bold text-near-black">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`kiddo-btn w-full flex items-center justify-center gap-2 ${
                  !isFormValid || isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-near-black border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirmar Pedido
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
