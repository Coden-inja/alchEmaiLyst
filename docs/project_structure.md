# Project Structure

Here's an overview of the project layout:

```
alchEmaiLyst/
├── License.md
├── README.md
├── constants
│   └── index.ts
├── docs
│   ├── contributing.md
│   └── project_structure.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── hero.jpg
│   ├── hero2.jpg
│   └── herovideo.mp4
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── AgentCard.tsx
│   │   ├── AuthCallback.tsx
│   │   ├── AuthModal.tsx
│   │   ├── ComposeEmail.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EmailSummary.tsx
│   │   ├── GoogleAuthModal.tsx
│   │   ├── Hero.tsx
│   │   ├── Landing.tsx
│   │   └── SpamDetector.tsx
│   ├── hooks
│   │   ├── useAuth.ts
│   │   └── useGoogleAuth.ts
│   ├── index.css
│   ├── main.tsx
│   ├── services
│   │   ├── api.ts
│   │   ├── gmailService.ts
│   │   └── googleAuth.ts
│   ├── types
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### 📂 Folder & File Descriptions

- **`constants/`**: Contains navlinks constants values.
- **`docs/`**: Documentation files, such as contribution guides and project structure references.
- **`public/`**: Static assets like images and videos that are publicly accessible.
- **`src/`**: Main source code directory for the React application.
  - **`src/components/`**: React UI components like hero section, Auth modal, landing page and etc..
  - **`src/hooks/`**: Custom React hooks for encapsulating logic, e.g., authentication.
  - **`src/services/`**: Service layer for handling APIs and external integrations (e.g., Gmail).
  - **`src/types/`**: TypeScript interfaces and type definitions used across the app.
- **`README.md`**: Main documentation file for project overview, usage, and structure.
- **`License.md`**: Licensing terms for the repository.
- **`index.html`**: HTML template used by Vite as the entry point.
- **`package.json`**: Lists dependencies, scripts, and project metadata.
- **`package-lock.json`**: Automatically generated lock file for reproducible installs.
- **`tsconfig*.json`**: TypeScript configuration files for app, node, and general use.
- **`vite.config.ts`**: Vite build and dev server configuration.
- **`postcss.config.js`**: PostCSS plugin configuration.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`eslint.config.js`**: ESLint setup for enforcing code quality and style rules.
