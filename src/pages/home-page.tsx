import EvolutionSection from '@/feature/main/evolution-section';
import HeroSection from '@/feature/main/hero-section';
import PromotionSection from '@/feature/main/promotion-section';
import RemainSection from '@/feature/main/remain-section';
import SeparatorWave from '@/feature/main/separator-wave';

export default function HomePage() {
  return (
    <>
      <title>{'Home :: Poster store'}</title>

      <SeparatorWave top={true} color="fill-hero" />
      <HeroSection />
      <SeparatorWave color="fill-hero" />
      <EvolutionSection />
      <SeparatorWave top={true} color="fill-hero" />
      <RemainSection />
      <SeparatorWave color="fill-hero" />
      <PromotionSection />
    </>
  );
}
