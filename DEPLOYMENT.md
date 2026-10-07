# 🚀 GiftMate Deployment Guide

This guide covers complete instructions for running GiftMate locally and deploying both the **Node.js Express backend** on **Render** and the **React + Vite frontend** on **Cloudflare Pages**.

---

## 🏗️ Architecture Overview

- **Frontend (`client/`)**: React 18 + Vite + Tailwind CSS (styled with the Regal Festive AI design system from Stitch).
- **Backend (`server/`)**: Node.js + Express.js REST API with file-persisted JSON datastore (zero MongoDB or external DB requirement).
- **Communication**: REST API endpoints with CORS support, configured via environment variables.

---

## 💻 1. Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Step 1: Install Dependencies
Open your terminal in the project root:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Configure Local Environment Variables

1. **Backend (`server/.env`)**:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

2. **Frontend (`client/.env`)**:
   ```env
   # Leave blank in development to leverage Vite's built-in /api proxy:
   VITE_API_URL=
   ```

### Step 3: Start the Applications

- **Terminal 1 (Backend Server)**:
  ```bash
  cd server
  npm start
  ```
  The API will start at: `http://localhost:5000` (Health check: `http://localhost:5000/api/health`)

- **Terminal 2 (Frontend Client)**:
  ```bash
  cd client
  npm run dev
  ```
  The Vite app will open at: `http://localhost:5173`

---

## 🌐 2. Backend Deployment on Render

Render hosts the Node.js + Express API server on their cloud platform.

### Step-by-Step Instructions:

1. **Push your code to GitHub**:
   Ensure your project is committed to a GitHub repository.

2. **Log into Render**:
   Go to [dashboard.render.com](https://dashboard.render.com) and sign in.

3. **Create a New Web Service**:
   - Click **New +** > **Web Service**.
   - Connect your GitHub repository containing GiftMate.

4. **Configure Service Settings**:
   - **Name**: `giftmate-backend` (or your preferred name)
   - **Region**: Choose the closest region to India (e.g., `Singapore` or `Frankfurt`)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

5. **Set Environment Variables on Render**:
   In the **Environment Variables** section, add:
   | Key | Value | Description |
   |---|---|---|
   | `PORT` | `10000` | Port automatically assigned by Render |
   | `NODE_ENV` | `production` | Production environment flag |
   | `CLIENT_URL` | `https://your-giftmate-frontend.pages.dev` | URL of your Cloudflare Pages frontend |

6. **Deploy**:
   Click **Create Web Service**. Once deployed, Render will provide a public URL like:
   `https://giftmate-backend.onrender.com`

7. **Verify Backend Health**:
   Visit: `https://giftmate-backend.onrender.com/api/health`
   You should see: `{"status":"ok","service":"GiftMate Express Backend",...}`

---

## ⚡ 3. Frontend Deployment on Cloudflare Pages

Cloudflare Pages provides global ultra-fast CDN hosting for Vite single-page applications.

### Step-by-Step Instructions:

1. **Log into Cloudflare Dashboard**:
   Visit [dash.cloudflare.com](https://dash.cloudflare.com) and navigate to **Workers & Pages**.

2. **Create a New Project**:
   - Click **Create application** > **Pages** > **Connect to Git**.
   - Select your GiftMate GitHub repository.

3. **Configure Build Settings**:
   - **Project Name**: `giftmate`
   - **Production Branch**: `main` (or your default branch)
   - **Framework Preset**: `Vite`
   - **Root directory (advanced)**: `client`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

4. **Set Environment Variables on Cloudflare Pages**:
   Under **Environment variables (advanced)**, add:
   | Variable name | Value | Description |
   |---|---|---|
   | `VITE_API_URL` | `https://giftmate-backend.onrender.com` | URL of your Render backend API |

5. **Save and Deploy**:
   Click **Save and Deploy**. Cloudflare will build the Vite project and publish it globally.

6. **Verify SPA Routing**:
   The included `client/public/_redirects` file ensures that direct URLs or browser refreshes on routes like `/ai-gift-finder` or `/wishlist-and-compare` seamlessly resolve to `/index.html` without 404 errors.

---

## 🔄 4. Updating URLs After Deployment

1. Once your Cloudflare frontend is live (e.g. `https://giftmate-xyz.pages.dev`):
   - Go to your Render service dashboard > **Environment Variables**.
   - Update `CLIENT_URL` to `https://giftmate-xyz.pages.dev`.
   - Render will automatically restart the backend with updated CORS permissions.

2. If your backend URL changes:
   - Go to Cloudflare Pages > **Settings** > **Environment variables**.
   - Update `VITE_API_URL` to your new backend URL.
   - Trigger a new deployment (or push a commit) to rebuild with the new API endpoint.

---

## 🛡️ Error Handling & Resilient Fallbacks

- If the backend is ever sleeping on Render's free tier, the frontend client automatically activates its internal fallback catalog so users never experience a broken UI or blank screen.
- PIN code delivery estimates, AI match scoring, and Wishlist states synchronize both with the Express backend and the browser's localStorage for instant offline resilience.
