# 🔐 Feature: Authentication & User Onboarding (Phase 1 — Foundation)

## Summary

Implement a complete authentication and onboarding system for PicoForge. This enables users to register, log in, stay authenticated, log out, and access protected areas of the platform.

This issue establishes the **core auth foundation** required for all Phase 1 features such as idea submission, validation, collaboration, and user profiles.

---

## Current Status (Codebase Scan)

Parts of this issue are **already implemented** in the current codebase.

### ✅ Already Implemented

#### Backend

- [x] `POST /api/auth/register` implemented (creates user + returns JWT)
- [x] `POST /api/auth/login` implemented (validates credentials + returns JWT)
- [x] `GET /api/auth/me` implemented (JWT protected)
- [x] Password hashing via `bcryptjs` (Mongoose pre-save hook)
- [x] Email uniqueness check (returns `409` on duplicate)
- [x] JWT auth middleware (`Authorization: Bearer <token>`)
- [x] Basic input validation (register/login validators)
- [x] Central error middleware exists

#### Frontend

- [x] Login page calls API and stores token in `localStorage`
- [x] Signup page calls API and auto-logs in (stores token)
- [x] Shared API helper attaches `Authorization` header for protected requests

### ⚠️ Not Yet Implemented / Needs Improvement

- [ ] `POST /api/auth/logout` endpoint (or clearly documented client-side logout)
- [ ] Protected route handling in the client (route guard + redirect to `/login`)
- [ ] Auth state persistence strategy beyond “token in localStorage” (e.g. bootstrapping user via `/me` on refresh)
- [ ] User model fields requested by this issue (`bio`, `skills`, etc.)
- [ ] “Controller–service separation” (currently controller contains the business logic)
- [ ] Ensure environment docs include required `JWT_SECRET`

---

## Goals

By the end of this issue, the platform should support:

- User registration
- Secure login
- Persistent authentication
- Logout
- Protected routes
- Automatic user profile creation

**This is a blocking dependency for all Phase 1 product features.**

---

## Scope of Work

### 1) Backend — Authentication API

#### Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

#### Required Endpoints

##### `POST /api/auth/register`

Creates a new user account.

**Payload**

- `fullName`
- `email`
- `password`

**Requirements**

- Email uniqueness validation
- Password hashing using `bcrypt`
- Basic input validation
- Clean, consistent error responses

##### `POST /api/auth/login`

Authenticates an existing user.

**Payload**

- `email`
- `password`

**Response**

- JWT token
- Basic user info

**Requirements**

- Secure password comparison
- Meaningful error messages for invalid credentials

##### `GET /api/auth/me`

Returns authenticated user details.

**Requirements**

- JWT-based auth middleware
- Returns user data excluding password

##### `POST /api/auth/logout`

Handles logout logic.

**Notes**

- Can be client-side token removal
- Backend invalidation optional (future enhancement)

#### Backend Requirements

- Centralized auth middleware
- JWT verification
- Clean controller–service separation
- Consistent error handling
- No sensitive data exposed

---

### 2) User Model

Create a base `User` schema with the following fields:

- `name`
- (In current codebase this field is `fullName`; keep naming consistent.)
- `email` (unique)
- `password`
- `bio` (optional)
- `skills` (array, optional)
- `createdAt`

This schema should be designed to scale and later support:

- Public user profiles
- Contributions
- Collaboration roles

---

### 3) Frontend — Auth UI

#### Pages Required

##### Login Page

- Email + password fields
- Validation and error feedback
- Redirect on success

##### Register Page

- Name, email, password
- Basic validation
- Auto-login after successful registration (optional)

#### Frontend Requirements

- Controlled inputs
- Clean form validation
- Auth state persistence
- Protected route handling
- Match PicoForge UI style
- Responsive layout

---

## Acceptance Criteria

- Users can register successfully
- Users can log in and receive a valid token
- Authenticated users stay logged in on refresh
- Protected routes block unauthenticated access
- Logout clears auth state
- No console or server errors
- Code is clean and readable

---

## Completion Checklist (What Contributors Should Do Next)

### Backend

- [ ] Add `POST /api/auth/logout` (optional server-side logic, but consistent response)
- [ ] Extend User model with `bio` and `skills` (backwards compatible)
- [ ] Document required env vars: `MONGODB_URI` and `JWT_SECRET` (optional: `JWT_EXPIRES_IN`)
- [ ] (Optional) Refactor to controller + service modules without changing API behavior

### Frontend

- [ ] Implement a small auth utility/hook (read token + current user)
- [ ] On app start, call `/api/auth/me` when token exists to hydrate user state
- [ ] Add a protected route wrapper to block unauthenticated access
- [ ] Add logout action (clear token + user, redirect)

---

## Branch Naming

- `feature/authentication`

---

## Assignment

Core feature.

Assign to maintainers or experienced contributors.
