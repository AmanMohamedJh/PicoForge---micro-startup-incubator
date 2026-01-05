# 💡 Feature: Idea Submission (Create & View) — Phase 1 Foundation

## Summary

Implement the core **Idea Submission** feature for PicoForge. This enables authenticated users to submit startup ideas and lets anyone (or authenticated users—your choice) view ideas in a basic list and detail view.

This is the first real product feature and unlocks future functionality like validation, collaboration, and workspaces.

---

## Goals

By the end of this issue, users should be able to:

- Submit a startup idea through a form
- View a list of submitted ideas
- View individual idea details
- See who submitted the idea
- Access idea data through protected APIs

**Out of scope:** voting, comments, collaboration, workspaces.

---

## Scope of Work

### 1) Backend — Idea API

#### Idea Model

Create an `Idea` schema with:

- `title`
- `problem`
- `proposedSolution`
- `targetAudience`
- `tags` (array)
- `createdBy` (User reference)
- `createdAt`

#### API Endpoints

- `POST /ideas`

  - Auth required
  - Creates a new idea

- `GET /ideas`

  - Public or auth-based (your choice)
  - Returns all ideas (basic fields)

- `GET /ideas/:id`
  - Returns full idea details

#### Backend Requirements

- Auth middleware protection on create
- Input validation
- Proper error handling
- Clean controller + service structure
- Mongoose population for `createdBy`

---

### 2) Frontend — Idea Submission UI

#### Pages to Create

##### Submit Idea Page

- **Path:** `/submit-idea`
- **Form fields:**
  - Idea title
  - Problem description
  - Proposed solution
  - Target audience
  - Tags (comma-separated or multi-select)

**Requirements:**

- Controlled inputs
- Form validation
- Error & success feedback
- Redirect after submission

##### Explore Ideas Page (Basic)

- **Path:** `/ideas`
- Display idea cards with:
  - Title
  - Short problem summary
  - Creator name
  - Tags

**Interaction:** click a card → idea detail page

##### Idea Detail Page

- **Path:** `/ideas/:id`
- Display:
  - Full idea content
  - Creator profile link
  - Creation date

---

## UI Guidelines

- Match existing PicoForge design
- Reusable card components
- Responsive layout
- No inline styles
- Tailwind / ShadCN friendly

---

## Acceptance Criteria

- Authenticated users can submit ideas
- Ideas persist in the database
- Ideas list loads without errors
- Idea detail page renders correctly
- UI works on desktop and mobile
- Code is clean and readable
- No console errors

---

## Branch Naming

- `feature/idea-submission`

---

## Assignment

Open for contributors.

Once claimed:

- Assign the issue
- Create a dedicated PR branch

---

## Why This Matters

This feature turns PicoForge from a concept into a functioning incubator. Everything else builds on this.

---

## What Comes Next (Not In This Issue)

- Community validation (votes + ratings)
- Comments
- Collaboration requests
- Idea workspaces
