import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function HeroSection() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-screen-xl gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] text-4xl !leading-[1.2] font-bold tracking-tight md:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Posters Are More Than Just Decor
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Posters are a vibrant blend of art, design, and self-expression. They can instantly
            transform a space, set the mood, and tell a story without words.
          </p>
          <p>
            Whether you prefer sleek minimalism, vintage classics, or bold pop art—posters suit any
            interior. Mix, match, and collect them to create a unique atmosphere at home, in the
            office, or even in a café.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Link
              to="/catalog"
              className={cn(buttonVariants({ variant: 'default' }), 'rounded-full text-base')}
            >
              Explore <ArrowUpRight className="!h-5 !w-5" />
            </Link>
          </div>
        </div>
        <div className="bg-accent aspect-video w-full rounded-xl lg:aspect-auto lg:h-[calc(100vh-4rem)] lg:w-[1000px]" />
      </div>
    </div>
  );
}

export default HeroSection;
