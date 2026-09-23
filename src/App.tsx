import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import type { Heritage } from "./types";

import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import DragonCompanion from "./components/DragonCompanion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeritageMap from "./components/HeritageMap";
import Explore from "./components/Explore";
import TangibleHeritage from "./components/TangibleHeritage";
import IntangibleHeritage from "./components/IntangibleHeritage";
import DocumentaryHeritage from "./components/DocumentaryHeritage";
import Timeline from "./components/Timeline";
import UNESCOSection from "./components/UNESCOSection";
import ArtifactViewer from "./components/ArtifactViewer";
import HeritageDetailModal from "./components/HeritageDetailModal";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Heritage | null>(null);

  useLenis();

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <CustomCursor />
      <ScrollProgress />
      <DragonCompanion />
      <Navbar />

      <main className="relative">
        <Hero />
        <HeritageMap onOpenDetail={setSelected} />
        <TangibleHeritage onOpenDetail={setSelected} />
        <IntangibleHeritage onOpenDetail={setSelected} />
        <DocumentaryHeritage onOpenDetail={setSelected} />
        <Timeline />
        <UNESCOSection onOpenDetail={setSelected} />
        <ArtifactViewer />
        <Explore onOpenDetail={setSelected} />
      </main>

      <Footer />

      <HeritageDetailModal heritage={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default App;
