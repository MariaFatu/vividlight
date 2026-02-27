import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionA.css';

gsap.registerPlugin(ScrollTrigger);

const SectionA = () => {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const circularTextRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const parallax = parallaxRef.current;
    const circularText = circularTextRef.current;
    const brand = brandRef.current;

    if (!section || !parallax) return;

    gsap.to(parallax, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    if (circularText) {
      gsap.to(circularText, {
        rotation: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    if (brand) {
      gsap.fromTo(
        brand,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const scrollTo = (selector, position = 'start') => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (position === 'center') {
      const top = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.35;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: position });
    }
  };

  return (
    <section ref={sectionRef} className="section-a">
      <nav className="site-nav">
        <button className="nav-link" onClick={() => scrollTo('.section-b', 'center')}>Portfolio</button>
        <span className="nav-divider">·</span>
        <button className="nav-link" onClick={() => scrollTo('.section-c')}>Contact</button>
      </nav>

      <div className="brand-container-top">
        <h2 ref={brandRef} className="brand-heading-top">Vividlight</h2>
      </div>

      <div ref={parallaxRef} className="parallax-background">
        <img 
          src="/mountain-background.jpg" 
          alt="Mountain Background" 
          className="background-image"
        />
      </div>
      
      <div ref={circularTextRef} className="circular-text-container">
        <svg className="circular-text-svg" viewBox="0 0 200 200">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text className="circular-text">
            <textPath href="#circlePath">
            ✦ Outdoor ✦ Gorpcore ✦ Hiking ✦ Snowsports ✦ Camping ✦ 
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
};

export default SectionA;
