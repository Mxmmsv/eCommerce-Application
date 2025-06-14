import TeamDescription from '@/feature/about-us/team-description-component';

export default function AboutUsPage() {
  return (
    <>
      <title>{'About us :: Poster store'}</title>
      <div className="bg-muted flex min-h-svh items-center justify-center text-lg">
        <TeamDescription />
      </div>
    </>
  );
}
