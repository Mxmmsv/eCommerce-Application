import type { TeamMember } from './types';

const teamMembersData: TeamMember[] = [
  {
    name: 'Maksim Moiseev',
    title: 'Project Team Lead, Frontend Developer',
    bio: `A developer with a strong technical background and solid organizational skills.
          Served as the team lead, responsible for the project's technical architecture and development processes.
          Comfortable working on both frontend and backend.`,
    contributions: [
      'Configured the Scrum process, sprints, and Jira task board',
      'Implemented login authentication',
      'Developed the product preview module',
      'Set up CI/CD pipelines for automatic builds and deployments',
      'Ensured technical integrity across the project and helped solve complex team challenges',
    ],
    url: {
      imageMember: '/member-photo/max.webp',
      gitHub: 'https://github.com/Mxmmsv',
      linkedIn: 'https://www.linkedin.com/in/moiseevmaxim/',
    },
  },
  {
    name: 'Ekaterina Dmitrenko',
    title: 'Frontend Developer, Project Infrastructure and UX',
    bio: `A developer unafraid to tackle critical foundational tasks.
          She established the project's technical foundation and ensured a stable environment for the entire team.`,
    contributions: [
      'Set up the project environment: Vite, React, TypeScript, Vitest, Valibot, ESLint',
      'Developed the catalog page',
      'Provided a structured and scalable component architecture',
      'Improved UX to make the interface clear and intuitive for users',
    ],
    url: {
      imageMember: '/member-photo/ekaterina.webp',
      gitHub: 'https://github.com/ek-ole',
      linkedIn: '',
    },
  },
  {
    name: 'Alla Tsaiukova',
    title: 'Frontend Developer, API Integration and UI Specialist',
    bio: `A developer focused on integrating external services and creating user interfaces.
          In this project, she was responsible for working with the CommerceTools SDK and building key UI components.`,
    contributions: [
      'Configured and integrated the CommerceTools SDK',
      'Implemented the CommerceTools admin panel',
      'Developed the website header and profile page',
      'Handled data processing between frontend and backend effectively',
    ],
    url: {
      imageMember: '/member-photo/alya.webp',
      gitHub: 'https://github.com/AlyaEngineer',
      linkedIn: '',
    },
  },
];

export default teamMembersData;
