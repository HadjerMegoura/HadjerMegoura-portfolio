# Project Instructions

## Project Structure and Maintainability

- Keep the project clean, modular, and easy to maintain.
- Create a separate React component for each portfolio section.
- Store portfolio content and static data in JSON files inside a centralized `src/data/` directory.
- Do not hardcode portfolio content directly into components when it can be stored in a JSON file.
- Import the relevant JSON data into the components that need it.
- Keep components focused on their own responsibilities.
- Avoid unnecessarily large components and duplicated code.
- Create reusable components when appropriate.
- Keep the folder structure organized and use clear, consistent naming conventions.
- Separate data, UI components, styles, and application logic.
- Keep styling consistent by reusing the existing design tokens.
- Avoid unnecessary dependencies and unnecessary abstractions.

## Suggested Organization

Organize the project according to the following structure, adapting it to the existing project when necessary:

src/
├── components/
│ ├── layout/
│ ├── sections/
│ │ ├── Hero.tsx
│ │ ├── Projects.tsx
│ │ ├── Experience.tsx
│ │ ├── TechStack.tsx
│ │ └── Contact.tsx
│ └── ui/
├── data/
│ ├── projects.json
│ ├── experience.json
│ ├── tech-stack.json
│ └── personal-info.json
├── styles/
│ └── tokens.css
├── App.tsx
└── main.tsx

## Data Management

- Keep project information in `projects.json`.
- Keep professional experience in `experience.json`.
- Keep technology information in `tech-stack.json`.
- Keep general portfolio information in `personal-info.json`.
- Use valid JSON syntax.
- Keep the data structure consistent and predictable.
- Components should render content from the data files rather than duplicate the same information.
- Keep data separate from presentation so content can be updated without modifying component code.

## React and TypeScript

- Use functional React components with TypeScript.
- Define appropriate types and interfaces for structured data.
- Avoid using `any` unless absolutely necessary.
- Keep components small, readable, and focused.
- Use clear and meaningful component, variable, and file names.

## Styling

- Reuse the centralized design tokens defined in `src/styles/tokens.css`.
- Avoid hardcoding colors, spacing, typography, and other values when appropriate tokens already exist.
- Keep the design consistent across all sections.
- Avoid duplicating CSS rules unnecessarily.

## Working with Copilot

- Inspect the existing project structure before making changes.
- Follow the established architecture and conventions.
- Avoid rewriting working code unnecessarily.
- Do not introduce unnecessary files, dependencies, or abstractions.
- When adding a new section, keep its component, data, and styles organized.
- Ensure changes remain consistent with the rest of the project.
- Prefer simple, maintainable solutions over clever or unnecessarily complex implementations.
