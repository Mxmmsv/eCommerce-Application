import EvolutionSection from '@/feature/main/evolution-section';
import HeroSection from '@/feature/main/hero-section';
import RemainSection from '@/feature/main/remain-section';
import SeparatorWave from '@/feature/main/separator-wave';

export default function HomePage() {
  return (
    <>
      <title>{'Home :: Poster store'}</title>
      <SeparatorWave top={true} color="hero" />
      <HeroSection />
      <SeparatorWave color="hero" />
      <EvolutionSection />
      <SeparatorWave top={true} color="hero" />
      <RemainSection />
      <SeparatorWave color="hero" />
    </>
  );
}
