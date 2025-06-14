import EvolutionSection from '@/feature/main/evolution-section';
import HeroSection from '@/feature/main/hero-section';
import RemainSection from '@/feature/main/remain-section';
import SeparatorWave from '@/feature/main/separator-wave';

export default function HomePage() {
  return (
    <>
      <title>{'Home :: Poster store'}</title>
      <HeroSection />
      <SeparatorWave />
      <EvolutionSection />
      <SeparatorWave />
      <RemainSection />
    </>
  );
}
