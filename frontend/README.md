# Catalog – Music Catalog Insights

**Version:** 1.0 Release Candidate 1 (RC1)

Catalog is a premium, enterprise-grade music catalog insights application. It provides users with a comprehensive view of their audio acquisitions, featuring real-time analytics, AI-driven insights powered by Google Gemini, and a robust library management system.

## 🌟 Features
- **Editorial Noir Design:** A sophisticated, high-contrast dark mode UI focused on data visibility and premium aesthetics.
- **Analytics Dashboard:** Real-time metrics including Catalog Depth, Rating distributions, and Genre performance, visualized via Recharts.
- **AI Insights:** Seamless integration with Google Gemini via the Spring Boot backend to deliver actionable recommendations and catalog performance summaries.
- **Library Management:** Comprehensive CRUD operations to manage tracks, statuses, and ratings using optimistic React Query updates.
- **Debounced Search:** Efficient catalog searching with debounced requests and React Query caching.
- **Responsive Architecture:** Fully optimized for Desktop, Tablet, and Mobile viewport breakpoints.

## 🛠 Technology Stack
### Frontend
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management & Data Fetching:** TanStack React Query v5
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Charting:** Recharts
- **Toast Notifications:** Sonner

### Backend (Assumed / External)
- **Framework:** Java Spring Boot
- **AI Engine:** Google Gemini (Server-side)
- **Database:** PostgreSQL (or equivalent relational DB)

## 🏗 Architecture & Folder Structure
The frontend follows a domain-driven feature folder structure to ensure maximum scalability and encapsulation.

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router definitions
│   │   ├── (app)/              # Authenticated layout routes (Dashboard, Library, etc.)
│   │   ├── login/              # Unauthenticated routes
│   │   ├── register/
│   │   ├── layout.tsx          # Global layout & SEO Metadata
│   ├── components/             # Global shared UI components (Sidebar, AppLayout, UI primatives)
│   ├── features/               # Domain-driven feature modules
│   │   ├── ai/                 # AI Insights Logic & Components
│   │   ├── analytics/          # Dashboard & Recharts logic
│   │   ├── auth/               # Authentication forms & hooks
│   │   ├── library/            # Library management (Tables, Modals)
│   │   ├── search/             # Search functionality & debouncing
│   │   └── account/            # Profile, Settings, & Preferences forms
│   ├── providers/              # Global Context Providers (Auth, QueryClient)
│   ├── services/               # Axios API clients & interceptors
│   ├── types/                  # Global Typescript interfaces
│   └── utils/                  # Utility functions (date formatters, query keys)
```

## 🔌 API Integration
The frontend utilizes a robust `axios` interceptor pattern in `src/services/api.ts` to automatically attach JWT tokens (stored in `localStorage`) to all outbound requests to the Spring Boot backend. 

**Core Endpoints Integrated:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/songs/search?q=`
- `GET /api/library`, `POST /api/library`, `PUT /api/library/{id}`, `DELETE /api/library/{id}`
- `GET /api/analytics/*` (Overview, Genres, Ratings, Status, Release Years)
- `GET /api/ai/summary`

## 🚀 Installation & Development
1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd music-catalog/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables (see below).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables
Create a `.env.local` file in the root of the `frontend` directory:

```env
# The base URL of the Spring Boot backend (do not include trailing slash)
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📦 Deployment Guide
### Frontend (Vercel)
The application is strictly configured for Vercel deployment.
1. Connect the GitHub repository to a new Vercel Project.
2. The framework preset should automatically detect **Next.js**.
3. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to the production Spring Boot instance (e.g., `https://api.catalog.ai`).
4. Deploy.

### Backend (Spring Boot)
Deploy the Spring Boot `.jar` via Docker, AWS Elastic Beanstalk, or your preferred JVM hosting provider. Ensure CORS is configured on the backend to allow requests from the Vercel production domain.

## 🔮 Future Improvements (Post-V1.0)
- **HttpOnly Cookies:** Migrate JWT storage from `localStorage` to `HttpOnly` cookies for enhanced XSS protection.
- **Audio Previews:** Implement HTML5 audio previews in the Search module using the `previewUrl`.
- **Backend Sync:** Finalize integration for the Profile, Settings, and Notifications modules once the respective Spring Boot endpoints are finalized.
