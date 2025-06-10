import type { TeamMember } from './types';

const teamMembersData: TeamMember[] = [
  {
    name: 'Maksim Moiseev',
    title: 'Frontend and Backend Developer, Project Team Lead',
    bio: `27 years old, from Vorkuta, Russia. 
          Originally a civil lawyer by profession, but since childhood I’ve been passionate about computers and technology. 
          Curiosity and a drive for self-development led me to the world of IT — a place where I feel truly at home.`,
    skills: `Proactive developer with a solid technical background and strong organizational skills.
             Led the team as project lead, responsible for technical architecture and workflow management.
             Confident in both frontend and backend development.`,
    contributions: [
      'Configured the Scrum process, sprints, and Jira task board',
      'Implemented login authentication',
      'Developed the product preview module',
      'Set up CI/CD pipelines for automatic builds and deployments',
      'Ensured technical integrity across the project and helped solve complex team challenges',
      'Developed the About Us page and Main page',
      'Implemented product search functionality',
      'Created dynamic URL slugs for products and categories',
      'Implemented dynamic page titles for SEO',
      'Developed the website footer',
    ],
    url: {
      imageMember: '/member-photo/max.webp',
      gitHub: 'https://github.com/Mxmmsv',
      linkedIn: 'https://www.linkedin.com/in/moiseevmaxim/',
    },
  },
  {
    name: 'Ekaterina Dmitrenko',
    title: 'Frontend and Backend Developer, Project Infrastructure and UX',
    bio: `30 years old, based in Saint Petersburg, Russia. 
          Currently working as an environmental engineer in the construction industry. 
          I turned to IT to explore a more flexible and creative career path — one that would allow me to chase both professional growth and personal dreams, like surfing the waves of Kamchatka 🌊🏄‍♀️🗻.`,
    skills: `Detail-oriented developer with a passion for building robust infrastructure.
             Established the technical foundation of the project and ensured a reliable and consistent development environment.
             Focused on clean architecture and improving user experience.`,
    contributions: [
      'Set up the project environment: Vite, React, TypeScript, Vitest, Valibot, ESLint',
      'Developed the catalog page',
      'Provided a structured and scalable component architecture',
      'Improved UX to make the interface clear and intuitive for users',
      'Implemented the cart page functionality',
      'Added support for product categories',
      'Implemented product filtering and sorting mechanisms',
    ],
    url: {
      imageMember: '/member-photo/ekaterina.webp',
      gitHub: 'https://github.com/ek-ole',
      linkedIn: '',
    },
  },
  {
    name: 'Alla Tsaiukova',
    title: 'Frontend and Backend Developer, API Integration and UI Specialist',
    bio: `34 years old, currently living in Novi Sad, Serbia. 
          Previously lived in Irkutsk and Moscow. 
          My background is in 3D modeling and production — I produced detailed construction documentation and created physical products based on it.
          I chose frontend development to gain the freedom of remote work, explore a new creative field, and finally say goodbye to the daily office routine.`,
    skills: `Developer with a background in design and manufacturing processes.
            Strong analytical mindset and attention to detail, now applied to building user-friendly, technically sound web interfaces.
            Brings structure and precision from engineering into frontend development.`,
    contributions: [
      'Configured and integrated the Commercetools Merchant Center',
      'Implemented the CommerceTools admin panel',
      'Developed the website header and profile page',
      'Handled data processing between frontend and backend effectively',
      'Implemented the 404 error page',
      'Developed responsive, mobile-friendly layouts',
      'Built centralized routing logic for page navigation',
      'Implemented logout functionality',
    ],
    url: {
      imageMember: '/member-photo/alya.webp',
      gitHub: 'https://github.com/AlyaEngineer',
      linkedIn: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/',
    },
  },
];

export default teamMembersData;
