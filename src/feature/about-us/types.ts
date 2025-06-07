type TeamMembersDataProp = {
  name: string;
  title: string;
  bio: string;
  contribution: string[];
  url: {
    imageMember: string;
    gitHub: string;
    linkedIn: string;
  };
};

export type { TeamMembersDataProp };
