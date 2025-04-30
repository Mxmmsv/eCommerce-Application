# <h1 align="center">🖼️ PosterShop</h1>


## Description

**PosterShop** is a single-page e-commerce application for selling designer posters, powered by [Commercetools](https://commercetools.com) and developed as a final project for the RS School online educational platform (course JS/Front-end 2024Q4).

![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-953DD6?logo=vite&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-white?logo=tailwindcss)
![Material UI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&label=Zustand)

![Prettier](https://img.shields.io/badge/Prettier-BD89C0?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-000000?logo=github&label=Git%20Hooks)

![SWR](https://img.shields.io/badge/SWR-000000?logo=vercel&label=SWR)
![Valibot](https://img.shields.io/badge/Valibot-111827?logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-white?logo=vitest)

![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)

This application provides the following features:

- Browse poster catalog: View a wide selection of posters available for purchase.

- Filter by category: Easily filter posters by categories to find what you're looking for.

- Add to cart: Add your favorite posters to the cart for checkout.

- Place orders: Complete the order process and make purchases.

- User authentication via SDK: Users can sign in securely using SDK for authentication.


## Install and Run the Application
- Using terminal to go to the directory in which you want to install the application, for example:
```bash
$ cd C/Users/yourname/apps
```

- Clone the repository from GitHub:
```bash
$ git clone https://github.com/Mxmmsv/eCommerce-Application.git
```

- install the dependencies with `npm i`:
```bash
$ npm i
```

- start the local server using `npm run start`:
```bash
$ npm run start
```

The server runs on port `5173`. If it is not possible to run the server using port `5173`, you can use another port by modifying the `vite.config.ts` configuration file.


## Available Scripts

In the project directory, you can run:

```
$ npm run start
# Runs the app in development mode.
Open port 5173 (http://localhost:5173) to view the app in the browser.

$ npm run build
# Builds the app for production to the `dist/` folder.

$ npm run lint
# Lints all `.ts` and `.tsx` files using ESLint.

$ npm run format
# Formats code using Prettier.

$ npm run test
# Runs unit tests using Vitest.

$ npm run test:watch
# Runs tests in watch mode.
```
---

You can also use `yarn` or `pnpm` instead of `npm`, depending on your package manager.


## Authors
[Maxim Moiseev](https://github.com/Mxmmsv), [Ekaterina Dmitrenko](https://github.com/ek-ole) and [Alla Tsaiukova](https://github.com/AlyaEngineer).


## Acknowledgments
Thanks a lot to our mentors @gentoosiast, @lenayork, and @existanz for helping with the project.

Thanks to the [Figma](https://figma.com/community) community for the free and accessible e-commerce website layouts that inspired us during the development of the project.

Thanks to the [RS School](https://rs.school/) for the knowledge and experience we received during the course.

Special thanks to the Commercetools team for providing a well-documented, TypeScript-ready SDK that simplified our e-commerce integration.


## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
