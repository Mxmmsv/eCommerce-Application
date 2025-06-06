import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import type { teamMembersDataProp } from './types';

function TeamMember({ member }: { member: teamMembersDataProp }) {
  return (
    <div key={member.name}>
      <img
        src={member.url.imageMember}
        alt={member.name}
        className="bg-secondary aspect-square w-full rounded-lg object-cover"
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
      />
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-muted-foreground text-sm">{member.title}</p>
      <p className="mt-3">{member.bio}</p>
      <div className="mt-4 flex items-center gap-2.5">
        <Button
          className="bg-accent hover:bg-accent text-muted-foreground shadow-none"
          size="icon"
          asChild
        >
          <Link to={member.url.gitHub} target="_blank">
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
  );
}

export default TeamMember;
