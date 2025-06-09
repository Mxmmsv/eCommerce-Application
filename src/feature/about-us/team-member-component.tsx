import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import type { TeamMember } from './types';

function TeamMember({ member }: { member: TeamMember }) {
  return (
    <div className="imag flex flex-col gap-8 md:flex-row md:gap-12 odd:md:flex-row-reverse">
      <div className="w-full md:w-1/2">
        <img
          src={member.url.imageMember}
          alt={member.name}
          className="bg-secondary aspect-square h-full max-h-[600px] w-full rounded-lg object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center text-center md:w-1/2 md:text-left">
        <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
        <p className="text-muted-foreground text-sm">{member.title}</p>
        <p className="mt-3">{member.bio}</p>
        <p className="mt-3">{member.skills}</p>
        <ul className="text-muted-foreground mt-3 list-inside list-disc text-sm">
          <span>Contribution to the project:</span>
          {member.contributions.map((contribution, index) => (
            <li key={index}>{contribution}</li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2.5">
          <Button
            className="bg-accent hover:bg-accent text-muted-foreground shadow-none"
            size="icon"
            asChild
          >
            <Link to={member.url.gitHub} target="_blank" className="">
              <Github className="stroke-muted-foreground" />
            </Link>
          </Button>
          <Button
            className="bg-muted hover:bg-muted text-muted-foreground shadow-none"
            size="icon"
            asChild
          >
            <Link to={member.url.linkedIn} target="_blank">
              <Linkedin className="stroke-muted-foreground" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
