import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DomeGallery from './components/ui/domegallery';
import { techStackIcons } from './assets/techstack';
import './dome-embed.css';

const {
  TensorFlowLight: TensorFlow,
  JavaScript,
  JavaLight: Java,
  Docker,
  HTML,
  CSS,
  CPP,
  ReactLight: ReactIcon,
  NodeJSLight: NodeJS,
  MongoDB,
  TypeScript,
  ViteLight: Vite,
  GithubLight: Github,
} = techStackIcons;

const skillDomeImages = [
  { src: TensorFlow, alt: 'TensorFlow' },
  { src: JavaScript, alt: 'JavaScript' },
  { src: Java, alt: 'Java' },
  { src: Docker, alt: 'Docker' },
  { src: HTML, alt: 'HTML' },
  { src: CSS, alt: 'CSS' },
  { src: CPP, alt: 'C++' },
  { src: ReactIcon, alt: 'React' },
  { src: NodeJS, alt: 'Node.js' },
  { src: MongoDB, alt: 'MongoDB' },
  { src: TypeScript, alt: 'TypeScript' },
  { src: Vite, alt: 'Vite' },
  { src: Github, alt: 'GitHub' },
];

function DomeSkillsBlock() {
  const [scale, setScale] = useState(0.55);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let visibilityRatio = 0;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionHeight = rect.height;
        const sectionCenter = rect.top + sectionHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;
        visibilityRatio = 1 - distanceFromCenter / maxDistance;
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio);
      }

      const minScale = 0.5;
      const maxScale = 1;
      setScale(minScale + (maxScale - minScale) * visibilityRatio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="dome-skills-inner relative w-full">
      <div
        className="relative mx-auto w-full max-w-5xl"
        style={{
          height: 'min(70vh, 620px)',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <DomeGallery images={skillDomeImages} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, transparent 42%, rgba(10, 25, 47, 0.15) 72%, rgba(10, 25, 47, 0.75) 100%)'
              : 'radial-gradient(ellipse at center, transparent 42%, rgba(100, 255, 218, 0.06) 72%, rgba(17, 34, 64, 0.12) 100%)',
            maskImage: 'radial-gradient(ellipse at center, black 52%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 52%, transparent 88%)',
          }}
        />
      </div>
    </div>
  );
}

function mount() {
  const el = document.getElementById('dome-skills-root');
  if (!el) return;

  const root = createRoot(el);
  root.render(
    <StrictMode>
      <DomeSkillsBlock />
    </StrictMode>,
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
