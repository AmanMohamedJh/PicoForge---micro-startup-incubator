# Contributing to Micro Startup Incubator

Thanks for your interest in contributing. This project is open to everyone, whether you're fixing bugs, adding new features, or improving documentation.

Please follow the guidelines below to keep things smooth and predictable.

---

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies for both client and server
4. Create a new branch for your feature or fix
5. Make your changes

# Contributing to Micro Startup Incubator

Thanks for your interest in contributing! This project welcomes everyone — whether you're fixing bugs, adding features, improving docs, or suggesting ideas. Please follow these guidelines to keep collaboration smooth and predictable.

---

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies (client and server)
4. Create a new branch for your change
5. Make and test your changes
6. Push your branch
7. Open a Pull Request (PR)

### Setup Commands

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/micro-startup-incubator.git
cd micro-startup-incubator

# Install (server)
cd server; npm install; cd ..

# Install (client)
cd client; npm install; cd ..
```

---

## Branch Naming Convention

Use short, clear, kebab-case names:

- `feature/idea-validation`
- `fix/login-bug`
- `docs/update-readme`
- `chore/deps-bump`

---

## Commit Message Style

Follow Conventional Commits:

**Types:**

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation changes
- `refactor`: code improvements without behavior change
- `style`: formatting only (no code changes)
- `test`: add/update tests
- `chore`: tooling and maintenance

**Format:**

```
type(scope?): short description

body (optional)
footer (optional, e.g., closes #123)
```

**Examples:**

- `feat(workspace): add notes section`
- `fix(auth): handle token refresh on 401`
- `docs(readme): clarify environment setup`

---

## Coding Guidelines

- Keep code clean, readable, and consistent
- Use ESLint + Prettier (already configured)
- Prefer small, single-purpose functions
- Minimize dependencies unless justified
- Only add comments where clarity is needed

### Frontend

- Use React hooks and functional components
- Prefer `React Query` or `Redux Toolkit` per existing pattern
- Keep UI consistent (Tailwind/ShadCN if used)

### Backend

- Follow Express.js routing best practices
- Use Mongoose models and validations
- Handle errors and return consistent API responses

---

## Testing

- Add or update tests for new behavior
- Ensure all tests pass before opening a PR
- Include minimal seed data or mocks when relevant

Run tests (if configured):

```bash
cd server; npm test; cd ..
cd client; npm test; cd ..
```

---

## Pull Request Checklist

Before opening a PR, please ensure:

- Your branch is rebased on `main`
- Linting passes: `npm run lint` (client/server)
- Tests pass (where applicable)
- Description explains the change and impact
- Screenshots/GIFs included for UI changes

PRs with failing checks will not be merged.

---

## Reporting Issues

When filing a bug, include:

- Clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node, browser)
- Screenshots or logs if possible
- Suggested fix (optional)

---

## Feature Requests

Open an issue labeled **enhancement** and share:

- The problem this solves
- How it helps users
- Any UI/UX suggestions
- Possible implementation outline

---

## Communication & Conduct

- Be respectful and constructive in discussions and reviews
- Assume positive intent; ask clarifying questions
- Keep issue/PR threads focused on the topic

---

## Thank You

Every contribution helps this platform grow into a real community for startup builders. We appreciate your time and effort.

---

## Recommended Folder Structure

```
micro-startup-incubator/
│
├── client/ # React/Next.js frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/ # or routes/ if using Vite/React Router
│ │ ├── hooks/
│ │ ├── context/
│ │ ├── utils/
│ │ ├── services/ # axios API calls
│ │ └── assets/
│ └── package.json
│
├── server/ # Node/Express backend
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── utils/
│ │ └── config/
│ └── package.json
│
├── .github/
│ └── ISSUE_TEMPLATE/ # optional: bug/feature templates
│
├── CONTRIBUTING.md
├── README.md
└── LICENSE
```
