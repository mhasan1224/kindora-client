# Kindora – Social Development Events Platform

Kindora is a social development events platform where people can discover, join, and manage community-focused events. It brings together volunteers and organizers around activities such as tree plantation, community cleanup, food donation, education support, blood donation, clothes distribution, and health awareness.

The project is split into two applications:

- **Frontend (this repository):** A Next.js App Router application.
- **Backend:** An Express.js REST API backed by MongoDB.

## Live Website

- **Live URL:** [https://kindora-frontend-five.vercel.app](https://kindora-frontend-five.vercel.app)
- **Frontend Repository:** [https://github.com/mhasan1224/kindora-client](https://github.com/mhasan1224/kindora-client)
- **Backend Repository:** [https://github.com/mhasan1224/kindora-server](https://github.com/mhasan1224/kindora-server)

## Key Features

- **Discover and filter events:** Browse upcoming events and narrow them by category using the category filter, which is also reflected in the `category` URL query parameter.
- **Event details and joining:** View full event information and join an event as an authenticated user. Users cannot join their own events, and duplicate joins are rejected.
- **Event creation:** Authenticated users can create events with a title, description, category, HTTPS thumbnail URL, location, and a future event date.
- **Event management:** Organizers can view the events they created, edit them, and delete them. Only the event owner can update or delete an event.
- **Joined events dashboard:** A dedicated page lists events the signed-in user has joined, including the join date.
- **Profile management:** Users can view their profile and edit their display name and profile photo URL. Email addresses are read-only.
- **Authentication:** Email/password registration and login, plus Google sign-in, powered by Better Auth.
- **Protected routes:** Private pages are guarded so that unauthenticated visitors are redirected to the login page.
- **Newsletter subscription:** A functional newsletter form with client-side validation, loading state, duplicate handling, and toast feedback.
- **Responsive design and themes:** A layout that adapts to desktop, tablet, and mobile, with light and dark themes.

## Technologies Used

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn-style UI components built on Base UI |
| Authentication | Better Auth 1.7 (email/password, Google OAuth, JWT plugin) |
| Database | MongoDB (native driver, via the Better Auth MongoDB adapter) |
| Forms and validation | React Hook Form, Zod |
| UI utilities | Motion, Lucide React, Sonner (toasts), next-themes |
| HTTP | Fetch API with JWT bearer tokens |

## Project Structure

```text
src/
├── app/                          # App Router pages and auth API route
│   ├── api/auth/[...all]/        # Better Auth request handler
│   ├── create-event/             # Create an event
│   ├── manage-events/            # List, edit, and delete own events
│   │   └── [id]/edit/
│   ├── my-joined-events/         # Events the user has joined
│   ├── upcoming-events/          # Event listing and event details
│   │   └── [id]/
│   ├── profile/                  # View profile
│   │   └── edit/                 # Edit profile
│   ├── login/                    # Sign in
│   ├── register/                 # Sign up
│   └── jwt-test/                 # Manual JWT verification page
├── components/
│   ├── Events/                   # Event cards, lists, filters, details
│   ├── Home/                     # Home page sections
│   └── ui/                       # Shared UI components
├── lib/
│   ├── auth.ts                   # Better Auth server configuration
│   ├── auth-client.ts            # Better Auth browser client
│   ├── get-access-token.ts       # Issues a JWT for API requests
│   ├── mongodb.ts                # MongoDB connection for Better Auth
│   └── event-categories.ts       # Shared event category list
└── proxy.ts                      # Route protection
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (shared with the backend)
- The Kindora backend running locally (defaults to `http://localhost:8000`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mhasan1224/kindora-client.git
   ```

2. Navigate into the project directory:

   ```bash
   cd kindora-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a local environment file (for example, `.env.local`) and configure the environment variable names listed below.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The application expects the following environment variable **names**. Values are environment-specific and must never be committed.

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Express backend (defaults to `http://localhost:8000` when unset). |
| `MONGO_URI` | MongoDB connection string used by Better Auth. Must point to the same `kindora` database as the backend. |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign and encrypt session data. |
| `BETTER_AUTH_URL` | Public origin of this frontend. Better Auth also derives the JWT issuer and audience from it. |
| `BETTER_AUTH_GOOGLE_CLIENT_ID` | Google OAuth client ID. |
| `BETTER_AUTH_GOOGLE_CLIENT_SECRET` | Google OAuth client secret. |

Notes:

- `BETTER_AUTH_URL` must match the origin where the frontend is served, and the same origin must be configured as `FRONTEND_URL` in the backend.
- The backend must be able to reach `<frontend origin>/api/auth/jwks` to verify access tokens.
- The Google OAuth client must allow the callback URL `<frontend origin>/api/auth/callback/google`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after a build. |
| `npm run lint` | Run ESLint. |

## Authentication

### Email and Password

Users register and sign in with an email address and password through Better Auth (`authClient.signUp.email` and `authClient.signIn.email`). Passwords are validated on the client with Zod and enforced by Better Auth on the server.

### Google OAuth

The login and registration pages also offer "Continue with Google", which calls `authClient.signIn.social({ provider: "google" })`. Google is configured in `src/lib/auth.ts` using the `BETTER_AUTH_GOOGLE_CLIENT_ID` and `BETTER_AUTH_GOOGLE_CLIENT_SECRET` variables.

### Sessions and the Navbar

Session state comes from `useSession()`. The navbar renders login/register actions for guests and a profile dropdown with logout, create event, manage events, and joined events links for signed-in users.

### JWT and the Backend API

The frontend and backend use separate authentication layers:

1. Better Auth runs on the frontend at `/api/auth/[...all]` and publishes signing keys at `/api/auth/jwks`.
2. The Better Auth JWT plugin (`jwt()` on the server and `jwtClient()` in the browser) issues access tokens.
3. `src/lib/get-access-token.ts` calls `authClient.token()` and returns the token.
4. Client requests send it to the Express API as `Authorization: Bearer <token>`.
5. The Express API verifies the token with the Better Auth JWKS endpoint, so no shared secret is stored in the backend.

The optional `/jwt-test` page demonstrates this flow end to end.

### Protected Routes

`src/proxy.ts` checks for a Better Auth session cookie on the following routes and redirects guests to the login page:

- `/profile`
- `/create-event`
- `/manage-events`
- `/my-joined-events`

Profile pages additionally guard themselves on the client using the current session.

## How the Main Flows Work

### Creating and Managing Events

- `/create-event` collects the event title, description, category, thumbnail URL, location, and date.
- The form validates input with Zod; the backend validates it again and requires an HTTPS image URL and a future date.
- `/manage-events` lists the signed-in user's events and supports deleting an event with confirmation.
- `/manage-events/[id]/edit` updates an existing event. Ownership is enforced by the backend using the creator's email from the JWT.

### Joining Events

- Event details are available at `/upcoming-events/[id]`.
- Signed-in users can join an event from the details page.
- The backend rejects joining your own event and duplicate joins.
- `/my-joined-events` shows events the user has joined.

### Newsletter

The home page newsletter form validates the email address, disables the form while submitting, and posts to the backend:

- **Success:** A success toast is shown and the input is cleared.
- **Duplicate email:** An informational toast is shown.
- **Invalid email or request failure:** An error toast is shown.

## Backend API Reference

All endpoints are served by the Express backend. Protected routes require a valid JWT access token.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Health-style greeting (`Hello Kindora!`). |
| `GET` | `/events` | Public | Latest six upcoming events. |
| `GET` | `/upcoming-events` | Public | All upcoming events. |
| `GET` | `/events/:id` | Public | Single event by ID. |
| `POST` | `/newsletter/subscribe` | Public | Subscribe an email address to the newsletter. |
| `GET` | `/jwt-test` | Protected | Verifies a JWT and echoes the authenticated user. |
| `GET` | `/my-events` | Protected | Events created by the signed-in user. |
| `POST` | `/events` | Protected | Create an event. |
| `PUT` | `/events/:id` | Protected | Update an event owned by the signed-in user. |
| `DELETE` | `/events/:id` | Protected | Delete an event owned by the signed-in user. |
| `POST` | `/events/:id/join` | Protected | Join an event. |
| `GET` | `/my-joined-events` | Protected | Events the signed-in user has joined. |

Newsletter responses:

| Status | Meaning |
|---|---|
| `201` | Subscription created. |
| `400` | Missing or invalid email address. |
| `409` | Email is already subscribed. |
| `500` | Unexpected server error. |

## Deployment

The frontend is deployed on [Vercel](https://vercel.com/) at [https://kindora-frontend-five.vercel.app](https://kindora-frontend-five.vercel.app).

Before deploying:

1. Add all environment variables listed above to the Vercel project settings.
2. Point `NEXT_PUBLIC_API_URL` at the deployed backend.
3. Set `BETTER_AUTH_URL` to the deployed frontend origin.
4. Add the production callback URL to the Google OAuth client.
5. Update the backend's `FRONTEND_URL` to the deployed frontend origin.

The Better Auth client does not hardcode a base URL. In the browser, it uses the current origin. Local and production environments must have the correct `BETTER_AUTH_URL` configuration. Vercel preview deployments may require additional Better Auth trusted origin configuration.

## License

This project was developed as part of an assignment.