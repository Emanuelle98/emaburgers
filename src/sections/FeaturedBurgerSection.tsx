import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Burger } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedBurgerSectionProps {
  burger: Burger;
  bgColor: 'sky-blue' | 'soft-pink';
  circleColor: string;
  imagePosition: 'left' | 'right';
  zIndex: number;
}

export function FeaturedBurgerSection({
  burger,
  bgColor,
  circleColor,
  imagePosition,
  zIndex,
}: FeaturedBurgerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const circle = circleRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const price = priceRef.current;
    const btn = btnRef.current;
    const badge = badgeRef.current;

    if (!section || !card || !circle || !image || !title || !desc || !price || !btn || !badge) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      const circleStartX = imagePosition === 'right' ? '-60vw' : '60vw';
      const cardStartX = imagePosition === 'right' ? '60vw' : '-60vw';
      const cardStartRotate = imagePosition === 'right' ? 6 : -6;
      const imageStartX = imagePosition === 'right' ? '50vw' : '-50vw';
      const imageStartRotate = imagePosition === 'right' ? 12 : -12;
      const textStartX = imagePosition === 'right' ? '-20vw' : '20vw';
      const badgeStartRotate = imagePosition === 'right' ? -120 : 120;

      scrollTl
        // Circle entrance
        .fromTo(circle, { x: circleStartX, scale: 0.2, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'power2.out' }, 0)
        // Card entrance
        .fromTo(card, { x: cardStartX, rotate: cardStartRotate, scale: 0.85 }, { x: 0, rotate: 0, scale: 1, ease: 'power2.out' }, 0)
        // Image entrance
        .fromTo(image, { x: imageStartX, rotate: imageStartRotate, scale: 0.8 }, { x: 0, rotate: 0, scale: 1, ease: 'power2.out' }, 0.05)
        // Title entrance
        .fromTo(title, { y: '-20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.08)
        // Description & price entrance
        .fromTo([desc, price], { x: textStartX, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 0.12)
        // Button entrance
        .fromTo(btn, { y: '18vh', scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'back.out(1.4)' }, 0.2)
        // Badge entrance
        .fromTo(badge, { scale: 0, rotate: badgeStartRotate }, { scale: 1, rotate: 0, ease: 'back.out(1.8)' }, 0.1);

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      const cardExitX = imagePosition === 'right' ? '-55vw' : '55vw';
      const cardExitRotate = imagePosition === 'right' ? -4 : 4;
      const imageExitX = imagePosition === 'right' ? '30vw' : '-30vw';
      const imageExitRotate = imagePosition === 'right' ? 10 : -10;
      const circleExitX = imagePosition === 'right' ? '20vw' : '-20vw';

      scrollTl
        .fromTo(card, { x: 0, rotate: 0, scale: 1 }, { x: cardExitX, rotate: cardExitRotate, scale: 0.92, ease: 'power2.in' }, 0.7)
        .fromTo(card, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.95)
        .fromTo(image, { x: 0, rotate: 0 }, { x: imageExitX, rotate: imageExitRotate, ease: 'power2.in' }, 0.7)
        .fromTo([title, desc, price], { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0.25, ease: 'power2.in' }, 0.7)
        .fromTo([title, desc, price], { opacity: 0.25 }, { opacity: 0, ease: 'power2.in' }, 0.95)
        .fromTo(circle, { x: 0, scale: 1 }, { x: circleExitX, scale: 0.85, ease: 'power2.in' }, 0.7)
        .fromTo(btn, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.75)
        .fromTo(badge, { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const handleAddToCart = () => {
    addItem({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      image: burger.image,
      type: 'burger',
    });
  };

  const bgClass = bgColor === 'sky-blue' ? 'bg-sky-blue' : 'bg-soft-pink';
  const cardClass =
    burger.bgColor === 'mustard'
      ? 'kiddo-card-mustard'
      : burger.bgColor === 'bubblegum'
      ? 'kiddo-card-pink'
      : 'kiddo-card-lavender';

  const textPosition = imagePosition === 'right' ? { left: '7%' } : { left: '54%' };
  const imagePositionStyle = imagePosition === 'right' ? { left: '58%' } : { left: '8%' };
  const badgePosition = imagePosition === 'right' 
    ? { right: '-18px', top: '-18px' } 
    : { left: '-18px', top: '-18px' };

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${bgClass} flex items-center justify-center`}
      style={{ zIndex }}
    >
      {/* Background Circle */}
      <div
        ref={circleRef}
        className="bg-circle"
        style={{
          background: circleColor,
          left: imagePosition === 'right' ? '18vw' : '78vw',
          top: imagePosition === 'right' ? '62vh' : '58vh',
          width: '110vmin',
          height: '110vmin',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Menu Card */}
      <div
        ref={cardRef}
        className={`${cardClass} relative`}
        style={{
          width: 'min(88vw, 1140px)',
          height: 'min(58vh, 540px)',
          maxWidth: '1140px',
        }}
      >
        {/* Star Badge */}
        {burger.badge && (
          <div
            ref={badgeRef}
            className="star-badge w-20 h-20"
            style={badgePosition}
          >
            <span className="text-center text-xs leading-tight">{burger.badge}</span>
          </div>
        )}

        {/* Burger Image */}
        <div
          style={{
            position: 'absolute',
            ...imagePositionStyle,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40%',
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
            ref={imageRef}
            src={burger.image}
            alt={burger.name}
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

        {/* Text Content */}
        <div className="absolute" style={{ ...textPosition, top: '18%', width: '38%' }}>
          <h2
            ref={titleRef}
            className="font-fredoka text-section font-bold text-near-black mb-4"
          >
            {burger.name}
          </h2>
          <p
            ref={descRef}
            className="font-nunito text-body text-dark-gray leading-relaxed mb-4"
          >
            {burger.description}
          </p>
          <span
            ref={priceRef}
            className="font-fredoka text-price font-bold text-near-black block mb-6"
          >
            ${burger.price.toFixed(2)}
          </span>
          <button
            ref={btnRef}
            onClick={handleAddToCart}
            className="kiddo-btn flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar
          </button>
        </div>
      </div>
    </section>
  );
}
