# App Router Base

This is a modern **Next.js 16 (App Router)** project template, pre-configured with essential tools and best practices for scalable applications.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) + React 19
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) + Axios
- **Form Handling:** React Hook Form + Zod
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
- **Linting & Formatting:** ESLint (Flat Config), Prettier
- **Commit Convention:** Husky + Commitlint + Lint-staged

## 🛠 Prerequisites

Ensure you have the following installed:

- **Node.js**: `>=22.0.0`
- **pnpm**: `>=10.0.0`

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nhat251/app-router-base.git
    cd app-router-base
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Setup Environment Variables:**
    Copy the example environment file and update variables:
    ```bash
    cp .env.example .env
    ```

## ⚡️ Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔍 Linting & Quality Control

This project enforces strict code quality standards using **ESLint**, **Prettier**, and **Husky**.

### Manual Linting

To check for linting errors:

```bash
pnpm lint
```

To automatically fix linting errors where possible:

```bash
pnpm lint:fix
```

### Pre-commit Hooks

We use **Husky** and **lint-staged** to ensure code quality before every commit.

- **Lint-staged**: Automatically runs `pnpm lint` on staged files. If the lint check fails, the commit will be blocked. You must fix the errors before you can commit.

### Commit Message Convention

We use **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

Your commit message must follow this format:
`type(scope?): subject`

**Examples:**

- `feat: add new user profile component`
- `fix(auth): resolve login token issue`
- `docs: update README with installation steps`
- `chore: upgrate next.js version`

**Common Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries usually not affecting source code

If your commit message does not follow this convention, the commit will be rejected.
