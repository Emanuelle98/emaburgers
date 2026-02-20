import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Clock, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ConfirmationSectionProps {
  onBackToMenu: () => void;
}

export function ConfirmationSection({ onBackToMenu }: ConfirmationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const check = checkRef.current;
    const pill = pillRef.current;

    if (!section || !card || !check || !pill) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        card,
        { y: '10vh', scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          check,
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.8)' },
          '-=0.3'
        )
        .fromTo(
          pill,
          { y: '3vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sky-blue py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center"
    >
      <div ref={cardRef} className="kiddo-card p-8 sm:p-12 text-center max-w-md w-full">
        {/* Checkmark */}
        <div
          ref={checkRef}
          className="w-24 h-24 bg-lime border-[3px] border-near-black rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ boxShadow: '0 6px 0 #141414' }}
        >
          <Check className="w-12 h-12 text-near-black" strokeWidth={3} />
        </div>

        {/* Title */}
        <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-near-black mb-3">
          ¡Pedido recibido!
        </h2>
        <p className="font-nunito text-lg text-dark-gray mb-8">
          Estamos smashando tu hamburguesa 🔥
        </p>

        {/* Time Estimate */}
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2 bg-neon-yellow border-[2.5px] border-near-black rounded-full px-6 py-3 mb-8"
          style={{ boxShadow: '0 4px 0 #141414' }}
        >
          <Clock className="w-5 h-5" />
          <span className="font-fredoka font-bold text-near-black">
            25–35 min
          </span>
        </div>

        {/* Back to Menu */}
        <button
          onClick={onBackToMenu}
          className="kiddo-btn-outline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al menú
        </button>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-[2px] border-gray-200">
          <p className="font-nunito text-sm text-dark-gray">
            © Ema Burgers — Hecho con ❤️ en Uruguay 🇺🇾
          </p>
        </div>
      </div>
    </section>
  );
}
