import type { teamMembersDataProp } from './types';

const teamMembersData: teamMembersDataProp[] = [
  {
    name: 'Maksim Moiseev',
    title: 'Project teamlead, Frontend developer',
    bio: `A proactive developer with a strong technical background and organizational skills.
          Acted as a team lead, responsible for the technical architecture and work processes of the team.
          Feels comfortable both on the frontend and on the backend.`,
    contribution: [
      'Configured the Scrum process, sprints and Jira Task Board',
      'Implemented authorization (login auth)',
      'Developed a product preview module',
      'Configured CI/CD, ensuring automatic build and deployment',
      'Monitored the technical integrity of the project and helped the team solve complex problems',
    ],
    url: {
      imageMember: '/member-photo/max.webp',
      gitHub: 'https://github.com/Mxmmsv',
      linkedIn: 'https://www.linkedin.com/in/moiseevmaxim/',
    },
  },
  {
    name: 'Ekaterina Dmitrenko',
    title: 'Frontend developer, Responsible for project infrastructure and UX',
    bio: `developer who is not afraid to take on important starting tasks.
          It was she who laid the technical foundation of the project and provided a stable
          environment for the entire team.`,
    contribution: [
      'Set up the project environment: Vite, React, TypeScript, Vitest, Valibot, ESLint',
      'Developed the catalog page',
      'Provided a structured and scalable architecture of components',
      'Worked on UX, making the interface convenient and intuitive for users',
    ],
    url: {
      imageMember: '/member-photo/ekaterina.webp',
      gitHub: 'https://github.com/ek-ole',
      linkedIn: '',
    },
  },
  {
    name: 'Alla Tsaiukova',
    title: 'Frontend developer, API Integration and UI Specialist',
    bio: `developer with a focus on integrating external services and creating interfaces.
          In the project, she was responsible for interacting with CommerceTools and developing key
          interface elements.`,
    contribution: [
      'Configured and integrated CommerceTools SDK',
      'Implemented CommerceTools admin panel',
      'Developed website header and profile page',
      'Ensured correct data processing between front and backend',
    ],
    url: {
      imageMember: '/member-photo/alya.webp',
      gitHub: 'https://github.com/AlyaEngineer',
      linkedIn: '',
    },
  },
];

export default teamMembersData;
