import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularGallery from './CircularGallery';
import ColorBends from './ColorBends';
import './SectionB.css';

gsap.registerPlugin(ScrollTrigger);

const SectionB = ({ projects, onProjectClick, paused = false }) => {
  const sectionRef = useRef(null);
  const circularTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const circularText = circularTextRef.current;

    if (!section || !circularText) return;

    gsap.to(circularText, {
      rotation: -90,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const items = projects.map((project, index) => ({
    image: project.image,
    text: project.title,
    index: index
  }));

  return (
    <section ref={sectionRef} className="section-b">
      <div className="background-container">
        <ColorBends
          rotation={45}
          speed={0.25}
          colors={["#bed963","#a1b5d4","#d9b4f4"]}
          transparent={true}
          autoRotate={0}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.1}
          parallax={0.5}
          noise={0.2}
          paused={paused}
        />
      </div>

      <div className="lens-flare lens-flare-1"></div>
      <div className="lens-flare lens-flare-2"></div>
      <div className="lens-flare lens-flare-3"></div>

      <div ref={circularTextRef} className="circular-text-container-right">
        <svg className="circular-text-svg" viewBox="0 0 200 200">
          <defs>
            <path
              id="circlePathRight"
              d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text className="circular-text-right">
            <textPath href="#circlePathRight">
              ✦ Outdoor ✦ Gorpcore ✦ Hiking ✦ Snowsports ✦ Camping ✦ 
            </textPath>
          </text>
        </svg>
      </div>

      <div className="gallery-container">
        <CircularGallery
          items={items}
          bend={0}
          borderRadius={0.05}
          scrollSpeed={0.4}
          scrollEase={0.05}
          textColor="#2d2d2d"
          font="bold 32px 'Argent CF'"
          letterSpacing={3}
          onItemClick={onProjectClick}
          paused={paused}
        />
      </div>

      <p className="section-b-click-hint">Click Project to expand</p>
    </section>
  );
};

export default SectionB;
