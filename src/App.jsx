import { useState } from 'react';
import SectionA from './components/SectionA';
import SectionB from './components/SectionB';
import SectionB1 from './components/SectionB1';
import SectionC from './components/SectionC';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  // BASE resolves correctly on both localhost and GitHub Pages subdirectory
  const BASE = import.meta.env.BASE_URL;
  const p = (path) => `${BASE}${path}`;

  const projectsData = [
    {
      id: 1,
      title: 'SCOTT Goggles',
      image: p('projects/scott-goggles/IMG_7927.jpg'),
      images: [
        { url: p('projects/scott-goggles/1772124955448998.MP4'), gridSize: '6x3', type: 'video' },
        { url: p('projects/scott-goggles/IMG_5893.JPG'), gridSize: '2x2' },
        { url: p('projects/scott-goggles/IMG_6341.JPG'), gridSize: '2x2' },
        { url: p('projects/scott-goggles/IMG_6599.JPG'), gridSize: '2x2' },
        { url: p('projects/scott-goggles/IMG_7784.JPG'), gridSize: '2x1' },
        { url: p('projects/scott-goggles/IMG_7788.JPG'), gridSize: '2x1' },
        { url: p('projects/scott-goggles/IMG_0856.jpg'), gridSize: '2x2' },
        { url: p('projects/scott-goggles/FullSizeRender.jpg'), gridSize: '1x1' },
        { url: p('projects/scott-goggles/FullSizeRender 2.jpg'), gridSize: '1x1' }
      ]
    },
    {
      id: 2,
      title: 'Marmot Jacket',
      image: p('projects/marmot-jacket/IMG_5383 2.JPG'),
      images: [
        { url: p('projects/marmot-jacket/1772195732963067.MP4'), type: 'video' },
        { url: p('projects/marmot-jacket/IMG_3120.JPG') },
        { url: p('projects/marmot-jacket/IMG_5383 2.JPG') },
        { url: p('projects/marmot-jacket/IMG_5391.JPG') },
        { url: p('projects/marmot-jacket/IMG_0562.jpg') },
        { url: p('projects/marmot-jacket/IMG_6640.JPG') },
        { url: p('projects/marmot-jacket/FullSizeRender 3.jpg') }
      ]
    },
    {
      id: 3,
      title: 'Sunglasses',
      image: p('projects/sunglasses/IMG_6639.JPG'),
      images: [
        { url: p('projects/sunglasses/1771690502578942.mov'), type: 'video' },
        { url: p('projects/sunglasses/1772196161801619.MP4'), type: 'video' },
        { url: p('projects/sunglasses/1772204750639753.MOV'), type: 'video' },
        { url: p('projects/sunglasses/IMG_4414.JPG') },
        { url: p('projects/sunglasses/IMG_4886.JPG') },
        { url: p('projects/sunglasses/IMG_5273.JPG') },
        { url: p('projects/sunglasses/IMG_5387.JPG') },
        { url: p('projects/sunglasses/IMG_5389.JPG') },
        { url: p('projects/sunglasses/IMG_6639.JPG') },
        { url: p('projects/sunglasses/IMG_8091.jpg') },
        { url: p('projects/sunglasses/IMG_2369.JPG') }
      ]
    },
    {
      id: 4,
      title: 'K2 Mindbender Skis',
      image: p('projects/k2-mindbender-skis/IMG_7786.JPG'),
      images: [
        { url: p('projects/k2-mindbender-skis/1770301909591234.MP4'), type: 'video' },
        { url: p('projects/k2-mindbender-skis/IMG_7786.JPG') },
        { url: p('projects/k2-mindbender-skis/IMG_7789.JPG') },
        { url: p('projects/k2-mindbender-skis/IMG_7804.JPG') },
        { url: p('projects/k2-mindbender-skis/IMG_7784 2.JPG') }
      ]
    },
    {
      id: 5,
      title: 'Kari Traa Baselayers',
      image: p('projects/kari-traa-baselayers/IMG_7903.JPG'),
      images: [
        { url: p('projects/kari-traa-baselayers/1763633817519201.MP4'), type: 'video' },
        { url: p('projects/kari-traa-baselayers/1772123438555566.MP4'), type: 'video' },
        { url: p('projects/kari-traa-baselayers/IMG_2324.JPG') },
        { url: p('projects/kari-traa-baselayers/IMG_3130.JPG') },
        { url: p('projects/kari-traa-baselayers/IMG_4417.jpg') },
        { url: p('projects/kari-traa-baselayers/IMG_7903.JPG') },
        { url: p('projects/kari-traa-baselayers/IMG_2369 2.JPG') },
        { url: p('projects/kari-traa-baselayers/IMG_4414 2.JPG') },
        { url: p('projects/kari-traa-baselayers/FullSizeRender 4.jpg') }
      ]
    },
    {
      id: 6,
      title: 'Knit',
      image: p('projects/knit/IMG_7896.JPG'),
      images: [
        { url: p('projects/knit/1765878697138786.MP4'), type: 'video' },
        { url: p('projects/knit/IMG_5453.JPG') },
        { url: p('projects/knit/IMG_5455.JPG') },
        { url: p('projects/knit/IMG_6633.JPG') },
        { url: p('projects/knit/IMG_6635.JPG') },
        { url: p('projects/knit/IMG_7896.JPG') },
        { url: p('projects/knit/IMG_7900.PNG') }
      ]
    },
    {
      id: 7,
      title: 'Salomon',
      image: p('projects/salomon/IMG_8060.JPG'),
      images: [
        { url: p('projects/salomon/1772115834296773.MP4'), type: 'video' },
        { url: p('projects/salomon/1772116127371411.MP4'), type: 'video' },
        { url: p('projects/salomon/1772116246705902.MP4'), type: 'video' },
        { url: p('projects/salomon/1772116490473199.MP4'), type: 'video' },
        { url: p('projects/salomon/1772124173866596.MP4'), type: 'video' },
        { url: p('projects/salomon/IMG_8060.JPG') },
        { url: p('projects/salomon/IMG_8094.JPG') },
        { url: p('projects/salomon/IMG_8098.JPG') },
        { url: p('projects/salomon/IMG_8100.JPG') },
        { url: p('projects/salomon/IMG_8101.JPG') }
      ]
    }
  ];

  const handleProjectClick = (projectIndex) => {
    const project = projectsData[projectIndex % projectsData.length];
    setSelectedProject(project);

    // Scroll to B1 slightly before expansion
    setTimeout(() => {
      const sectionB1 = document.querySelector('.section-b1');
      if (sectionB1) {
        sectionB1.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    // Start expansion
    setTimeout(() => {
      setIsProjectOpen(true);
    }, 150);
  };

  const handleClose = () => {
    setIsProjectOpen(false);
    setTimeout(() => {
      const sectionB = document.querySelector('.section-b');
      if (sectionB) {
        sectionB.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);
  };

  return (
    <div className="app">
      <SectionA />
      
      <SectionB projects={projectsData} onProjectClick={handleProjectClick} paused={isProjectOpen} />
      
      <SectionB1 
        isOpen={isProjectOpen} 
        projectData={selectedProject} 
        onClose={handleClose}
      />
      
      <SectionC />
    </div>
  );
}

export default App;
