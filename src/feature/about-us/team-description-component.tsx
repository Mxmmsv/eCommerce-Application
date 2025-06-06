import TeamMember from './team-member-component';
import teamMembersData from './team-members-data';

function TeamDescription() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-16 px-6 py-8 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Our Yet Another Dream Team
        </h2>
        <p className="mt-6 text-base sm:text-lg">{/* здесь что-то будет */}</p>
      </div>

      <div>
        <div>
          <p>
            Welcome to our eCommerce application, created as part of the final project at RS School!
            Our team of three frontend developers worked closely together to build a modern,
            responsive, and performant web application using cutting-edge technologies. We used
            React.js as the core framework and enhanced development with TypeScript, Vite, and
            Tailwind CSS for rapid styling.
          </p>
          <p>
            To ensure code quality and maintainability, we incorporated Vitest for unit testing,
            Zustand for state management, and SWR for efficient data fetching. We also utilized
            shadcn/ui for accessible, customizable UI components and Valibot for form validation.
            The app is deployed via Netlify for seamless CI/CD.
          </p>
          <p>
            Throughout the project, we followed Scrum methodology with regular sprints, daily
            stand-ups, and review sessions. Our mentor provided continuous guidance and feedback,
            helping us align our work with industry best practices.
          </p>
          <p>
            This project highlights our strong collaboration, deep understanding of modern frontend
            tooling, and commitment to delivering a polished and user-centric product.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {teamMembersData.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

export default TeamDescription;
