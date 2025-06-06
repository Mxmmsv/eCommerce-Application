import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import teamMembers from './team-members';

const TeamDescription = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-16 px-6 py-8 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Our Yet Another Dream Team
        </h2>
        <p className="mt-6 text-base sm:text-lg">
          Our philosophy is simple — hire a team of diverse, passionate people and foster a culture
          that empowers you to do you best work.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.name}>
            <img
              src={member.url.imageMember}
              alt={member.name}
              className="bg-secondary aspect-square w-full rounded-lg object-cover"
              width={600}
              height={600}
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
        ))}
      </div>
    </div>
  );
};

export default TeamDescription;
