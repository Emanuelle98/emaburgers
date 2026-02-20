import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOrderClick: () => void;
}

export function HeroSection({ onOrderClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const circle = circleRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    const burger = burgerRef.current;
    const cta = ctaRef.current;
    const pill = pillRef.current;

    if (!section || !card || !circle || !logo || !tagline || !burger || !cta || !pill) return;

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } });

      loadTl
        .fromTo(circle, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' })
        .fromTo(card, { y: '12vh', scale: 0.85, rotate: -2 }, { y: 0, scale: 1, rotate: 0, duration: 0.7 }, '-=0.4')
        .fromTo(logo.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 }, '-=0.3')
        .fromTo(tagline, { x: '-6vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .fromTo(burger, { x: '10vw', scale: 0.9, rotate: 6 }, { x: 0, scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.2)' }, '-=0.4')
        .fromTo(cta, { y: '6vh', scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }, '-=0.3')
        .fromTo(pill, { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.2');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([card, circle, logo, tagline, burger, cta, pill], { clearProps: 'all' });
            loadTl.progress(1);
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(card, { x: 0, rotate: 0, scale: 1 }, { x: '-55vw', rotate: -4, scale: 0.92, ease: 'power2.in' }, 0.7)
        .fromTo(card, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.95)
        .fromTo(circle, { x: 0, scale: 1 }, { x: '-30vw', scale: 0.85, ease: 'power2.in' }, 0.7)
        .fromTo([cta, pill], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0.25, ease: 'power2.in' }, 0.7)
        .fromTo([cta, pill], { opacity: 0.25 }, { opacity: 0, ease: 'power2.in' }, 0.95)
        .fromTo(burger, { x: 0 }, { x: '20vw', ease: 'power2.in' }, 0.7)
        .fromTo([logo, tagline], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.85);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-sky-blue flex items-center justify-center z-10"
    >
      {/* Background Circle */}
      <div
        ref={circleRef}
        className="bg-circle bg-neon-yellow"
        style={{
          left: '52vw',
          top: '56vh',
          width: '110vmin',
          height: '110vmin',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Hero Card */}
      <div
        ref={cardRef}
        className="kiddo-card relative"
        style={{
          width: 'min(86vw, 1100px)',
          height: 'min(56vh, 520px)',
          maxWidth: '1100px',
        }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="absolute flex items-center gap-3"
          style={{ left: '6%', top: '10%' }}
        >
          <img 
            src="/logo-ema.png" 
            alt="Ema Burgers" 
            className="h-12 sm:h-16 w-auto"
          />
          <div>
            <h1 className="font-fredoka text-hero font-bold text-near-black leading-none">
              Ema
            </h1>
            <span className="font-nunito font-bold text-sm text-near-black/70">SMASH URUGUAYA</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="absolute"
          style={{ left: '6%', top: '30%', maxWidth: '42%' }}
        >
          <p className="font-fredoka text-card-title text-near-black leading-tight">
            Jugosas por dentro,
            <br />
            <span className="text-tangerine">crocantes por fuera.</span>
          </p>
          <p className="font-nunito text-body text-dark-gray mt-3">
            Smash burgers hechas con carne 100% uruguaya 🇺🇾
          </p>
        </div>

        {/* Hero Burger Image */}
        <div
          style={{
            position: 'absolute',
            left: '54%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42%',
            height: 'auto',
            maxHeight: '96%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <img
            ref={burgerRef}
            src="/smash-classic.jpg"
            alt="Smash Burger"
            className="object-contain animate-float"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={onOrderClick}
          className="kiddo-btn absolute"
          style={{ left: '6%', bottom: '14%' }}
        >
          ¡Pedir Ahora!
        </button>

        {/* Open Today Pill */}
        <div
          ref={pillRef}
          className="absolute flex items-center gap-2 bg-white border-[2.5px] border-near-black rounded-full px-4 py-2"
          style={{ right: '6%', bottom: '14%', boxShadow: '0 4px 0 #141414' }}
        >
          <Clock className="w-4 h-4 text-near-black" />
          <span className="font-nunito font-bold text-sm text-near-black">
            Hoy 11:00–22:00
          </span>
        </div>
      </div>
    </section>
  );
}
