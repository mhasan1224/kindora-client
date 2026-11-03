# Kindora – Social Development Events Platform

Kindora is a social development events platform where people can discover, join, and manage community-focused events. It aims to connect people who want to contribute to positive social change.

## Live Website

- **Live URL:** `https://your-kindora-domain.vercel.app`
- **Frontend Repository:** https://github.com/mhasan1224/kindora-client
- **Backend Repository:** https://github.com/mhasan1224/kindora-server

## Key Features

- **User Authentication:** Register and log in using email/password or Google authentication.
- **Upcoming Events:** Browse upcoming social development events.
- **Event Management:** Authenticated users can create, update, and delete their own events.
- **Join Events:** Logged-in users can join events and view their joined events.
- **Personal Profile:** Update profile information and upload or change profile pictures.
- **Protected Routes:** Private pages are accessible only to authenticated users.
- **Secure API:** JWT-based authentication protects private backend endpoints.
- **Responsive Design:** User-friendly interface for desktop, tablet, and mobile devices.
- **Dark and Light Theme:** Switch between clean light and dark themes.

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- JWT Authentication
- Zod
- Sonner (Toast Notifications)

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Backend server running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mhasan1224/kindora-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kindora-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables.

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   Configure the Better Auth and database-related environment variables according to your local setup. Never commit secret keys or credentials.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Deployment

The frontend is intended to be deployed on [Vercel](https://vercel.com/).

Before deployment, configure the required environment variables in the Vercel project settings, including the production backend API URL and Better Auth configuration.

## License

This project was developed as part of an assignment.