import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SectionB1.css';

const SectionB1 = ({ isOpen, projectData, onClose, onOpened }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRefs = useRef([]);
  const mediaOrientations = useRef({});

  useEffect(() => {
    if (!sectionRef.current) return;

    if (isOpen) {
      // Expand: animate clip-path (GPU-accelerated)
      gsap.fromTo(
        sectionRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'expo.out',
          onComplete: () => {
            // Load videos after animation so they're ready to play on demand
            videoRefs.current.forEach(video => {
              if (video && video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
              }
            });
            // Notify parent that section is fully open — safe to lock scroll now
            if (onOpened) onOpened();
          }
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power2.out'
        }
      );
    } else {
      // Pause and reset videos
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
          video.src = '';
        }
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: 'power2.in'
      });

      gsap.to(sectionRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'expo.in'
      });
    }
  }, [isOpen]);

  const handleImageLoad = (e, index) => {
    const img = e.target;
    const container = img.parentElement;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    
    if (container) {
      if (isPortrait) {
        container.classList.add('portrait-item');
        container.classList.remove('landscape-item');
      } else {
        container.classList.add('landscape-item');
        container.classList.remove('portrait-item');
      }
    }
    mediaOrientations.current[index] = isPortrait ? 'portrait' : 'landscape';
  };

  const handleVideoLoad = (e, index) => {
    const video = e.target;
    const container = video.parentElement;
    const isPortrait = video.videoHeight > video.videoWidth;
    
    if (container) {
      if (isPortrait) {
        container.classList.add('portrait-item');
        container.classList.remove('landscape-item');
      } else {
        container.classList.add('landscape-item');
        container.classList.remove('portrait-item');
      }
    }
    mediaOrientations.current[index] = isPortrait ? 'portrait' : 'landscape';
  };

  if (!projectData) return null;

  return (
    <section ref={sectionRef} className="section-b1">
      <div ref={contentRef} className="section-b1-content">
        <button className="close-button" onClick={onClose}>
          <span className="close-text">Close</span>
          <span className="close-icon">×</span>
        </button>

        <h2 className="project-title-main">{projectData.title}</h2>

        <div className="photo-grid">
          {projectData.images && projectData.images.map((item, index) => (
            <div 
              key={index} 
              className="photo-grid-item"
            >
              {item.type === 'video' ? (
                <video
                  ref={el => videoRefs.current[index] = el}
                  data-src={item.url}
                  className="photo-grid-video"
                  muted
                  playsInline
                  controls
                  preload="none"
                  onLoadedMetadata={(e) => handleVideoLoad(e, index)}
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={`${projectData.title} ${index + 1}`}
                  className="photo-grid-image"
                  onLoad={(e) => handleImageLoad(e, index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionB1;
