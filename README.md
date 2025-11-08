# Lendsqr FE Test

An implementation of the **Lendsqr login**, **users list**, and **user details** pages — built with modern React tooling, strong TypeScript typing, and a clean component-driven architecture.

Currently, two official plugins are available:

**Live Demo:** https://chimezie-nwagbo-lendsqr-fe-test.vercel.app  
**GitHub Repo:** https://github.com/MezieNwagbo/lendsqr-fe-test

---

## Features

- **Authentication:** Functional login flow with input validation and error handling.
- **Users Dashboard:** Paginated user table with sorting, filtering, and responsive layout.
- **User Details Page:** Displays detailed user information with dynamic sections.
- **Reusable Components:** Shared UI building blocks (`Button`, `Input`, `TablePagination`, etc.).
- **Hooks & Utilities:** Custom React hooks (`useLogin`, `useUserTable`, `useUserNavigation`) for logic encapsulation.
- **State & Effects:** Managed with `useState`, `useEffect`, and clean side-effect boundaries.
- **Testing:** Comprehensive unit tests using **Vitest** and **React Testing Library**.

---

## 🧰 Tech Stack

| Category          | Tools                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [React 19](https://react.dev) + [TypeScript 5.9](https://www.typescriptlang.org/)                                      |
| **Build Tool**    | [Vite 7](https://vitejs.dev)                                                                                           |
| **Routing**       | [React Router DOM 7](https://reactrouter.com/)                                                                         |
| **Styling**       | [SASS/SCSS](https://sass-lang.com/)                                                                                    |
| **UI Library**    | [Material UI (MUI)](https://mui.com/) + custom SCSS components                                                         |
| **Tables**        | [react-data-table-component](https://www.npmjs.com/package/react-data-table-component)                                 |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com/)                                                                        |
| **Testing**       | [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) |
| **Linting**       | ESLint + TypeScript ESLint                                                                                             |

---

## Project Structure

src/
┣ assets/ # Images and icons
┣ components/ # Shared UI components (Button, Input, TablePagination, etc.)
┣ constants/ # Static copy and app-wide constants
┣ context/ # Context providers (if applicable)
┣ data/ # Mock or static JSON data
┣ features/ # Feature-based modules (e.g. auth)
┣ layout/ # Layout and wrapper components
┣ pages/ # Page-level components (Login, Users, UserDetails)
┣ routes/ # Route definitions and protected routes
┣ styles/ # Global SCSS styles
┣ types/ # TypeScript type definitions
┣ App.tsx
┗ main.tsx

This modular structure follows **feature-based separation** for scalability and maintainability.

---

## 🧪 Testing

Unit and integration tests are written using **Vitest** + **React Testing Library**.

### Example Tests

- `Button.test.tsx`: ensures correct rendering and onClick behavior
- `UserSummary.test.tsx`: verifies summary stats are displayed
- `useLogin.test.ts`: mocks API + verifies success and failure flows
- `Login.test.tsx`: ensures form validation and navigation logic work

### Run Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Installation and setup

```bash
# Clone the repo
git clone https://github.com/MezieNwagbo/lendsqr-fe-test.git
cd lendsqr-fe-test

# install dependencies
npm install

# run locally
npm run dev
```

The app will be available at http://localhost:5173

## Notes for reviewers

This project follows clean code conventions:

- Commits are atomic and descriptive.
- Components are modular and reusable.
- Codebase includes unit tests for critical paths.
- Uses modern React 19 patterns (no legacy APIs).
