import HeroSection from '@/feature/main/hero-section';

export default function HomePage() {
  return (
    <>
      <title>{'Home :: Poster store'}</title>
      <div className="bg-muted flex min-h-svh items-center justify-center text-lg">
        <HeroSection />
      </div>
    </>
  );
}
