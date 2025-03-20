# Blogging Platform

This is a blogging platform built with [Next.js](https://nextjs.org), featuring a modern UI, server-side rendering, and a robust backend powered by Drizzle ORM.

## Features

- **Blog Management**: Create, update, and delete blog posts.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Image Handling**: Supports dynamic image validation and placeholders for invalid URLs.
- **Authentication**: User authentication and authorization (e.g., login, register).
- **Database Integration**: Powered by Drizzle ORM for database migrations and queries.
- **Testing**: Unit tests written with Vitest and React Testing Library.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (v20 or later)
- [npm](https://www.npmjs.com/)
- A database supported by Drizzle ORM (e.g., PostgreSQL, MySQL)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdallahMarei97/Blogging-Platform.git
   cd blogging-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of your project and add the required environment variables:

   ```env
   DATABASE_URL=your-database-url
   NEXT_PUBLIC_API_URL=your-api-url
   ```

4. Run database migrations:

   ```bash
   npm run db:migrate
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Scripts

Here are some useful scripts for development and testing:

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run test`: Run unit tests with Vitest.
- `npm run db:migrate`: Run database migrations using Drizzle ORM.
- `npm run db:generate`: Generate database schema.

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing. To run tests:

```bash
npm run test
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS.
- [Drizzle ORM Documentation](https://orm.drizzle.team/) - Learn about Drizzle ORM.
- [Vitest Documentation](https://vitest.dev/) - Learn about testing with Vitest.
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Learn about using components with shadcn/ui.

## Deploying the App

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/). Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
