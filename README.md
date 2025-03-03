# Deployed Links
- Web-App: https://crypto-track-pro.vercel.app/
- Documentation: https://5h0ov.github.io/CryptoTrackPro/


# Installation & Setup

This guide will walk you through how to set up and run both the web and mobile applications of CryptoTrackPro.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database (Optional)

## Web App Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker/web-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy the .env.example file to .env.local
   - Fill in the required variables:

```
DATABASE_URL=your_postgresql_db_url
NODE_ENV=development
JWT_SECRET=your_jwt_secret
COINCAP_API_KEY=your_coincap_api_key # optional
```

4. Set up the database (OPTIONAL):

```bash
# Run database migrations
npm run db:generate
npm run db:migrate
# or
yarn run db:generate
yarn run db:migrate


# After making changes to schema
npm run db:push
# or
yarn run db:push
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser
