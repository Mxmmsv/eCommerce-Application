import { ArrowUpRight, CirclePlay } from 'lucide-react';

import { Button } from '@/components/ui/button';

function HeroSection() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-screen-xl gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] text-4xl !leading-[1.2] font-bold tracking-tight md:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Customized Shadcn UI Blocks & Components
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Explore a collection of Shadcn UI blocks and components, ready to preview and copy.
            Streamline your development workflow with easy-to-implement examples.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="bg-accent aspect-video w-full rounded-xl lg:aspect-auto lg:h-[calc(100vh-4rem)] lg:w-[1000px]" />
      </div>
    </div>
  );
}

export default HeroSection;
