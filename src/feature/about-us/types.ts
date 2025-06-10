type TeamMember = {
  name: string;
  title: string;
  bio: string;
  skills: string;
  contributions: string[];
  url: {
    imageMember: string;
    gitHub: string;
    linkedIn?: string;
  };
};

export type { TeamMember };
