import HeroIntro from './components/HeroIntro';
import AboutFloatingPanels from './components/AboutFloatingPanels';
import CollectionShowcase from './components/CollectionShowcase';
import ManifestoAndContact from './components/ManifestoAndContact';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Intro Scene with Spline 3D and audio */}
      <HeroIntro />

      {/* About the Brand with floating 3D-like panels */}
      <AboutFloatingPanels />

      {/* Collection Preview with rotating metallic forms and hotspots */}
      <CollectionShowcase />

      {/* Manifesto typing + Contact portal */}
      <ManifestoAndContact />

      <footer className="bg-black/90 border-t border-zinc-800 py-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Broken Silence — Digital Rebellion.
      </footer>
    </div>
  );
}
