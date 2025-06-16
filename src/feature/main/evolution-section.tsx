function EvolutionSection() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-screen-xl space-y-16 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-center text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:mb-15 lg:text-5xl">
          The Evolution of Posters: From Handbills to Modern Art
        </h2>

        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="space-y-4 lg:w-1/2">
            <h3 className="text-xl font-semibold">1800s: The Birth of Poster Art</h3>
            <p>
              Posters first emerged as advertising bills and theater announcements. With the rise of
              lithography (stone printing), they became mass-produced masterpieces. Visionary
              artists like Alphonse Mucha and Henri de Toulouse-Lautrec elevated them into high art.
            </p>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <img
              src="/posters/18th-poster.webp"
              alt="Poster from 1800s"
              className="shadow-chart-3/75 w-full max-w-xs rounded-xl object-contain shadow-lg sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
          <div className="flex justify-center lg:w-1/2">
            <img
              src="/posters/20th-poster.webp"
              alt="Poster from 20th century"
              className="shadow-chart-3/75 w-full max-w-xs rounded-xl object-contain shadow-lg sm:max-w-sm md:max-w-md"
            />
          </div>
          <div className="space-y-4 lg:w-1/2">
            <h3 className="text-xl font-semibold">
              20th Century: Propaganda, Cinema & Pop Culture
            </h3>
            <p>
              Posters became powerful tools for propaganda and social movements across the USSR and
              Europe.
            </p>
            <p>Hollywood embraced vibrant movie posters as essential marketing magic.</p>
            <p>
              The 1960s pop art revolution (think Andy Warhol&apos;s iconic work) turned posters
              into youth culture staples.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="space-y-4 lg:w-1/2">
            <h3 className="text-xl font-semibold">Today: Art for Everyone</h3>
            <p>
              Digital printing has democratized poster art — now anyone can own museum-quality
              reproductions or cutting-edge digital designs. From classic masterpieces to
              AI-generated visuals, today&apos;s posters let you curate gallery-worthy walls without
              gallery prices.
            </p>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <img
              src="/posters/21th-poster.webp"
              alt="Poster from 21st century"
              className="shadow-chart-3/75 w-full max-w-xs rounded-xl object-contain shadow-lg sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EvolutionSection;
