# 🎁 GiftMate — Smart AI Gift Finder (Indian Festive Edition)

> Converted from Google Stitch to a fully functional React + Vite + Express web application with royal festive aesthetics.

![Design Preview](./screen.png)

## ✨ Highlights

- **Exact Stitch Visual Design**: Pixel-level fidelity to the Stitch design specifications (Playfair Display & Plus Jakarta Sans typography, Regal Festive AI palette, frosted glassmorphism, ambient festive glow vignettes).
- **Interactive Multi-Step AI Gift Quiz**: 60-second quiz calculating emotional compatibility across relationship, occasion, age group, quirks/hobbies, and budget in Indian Rupees (₹).
- **Comparison Matrix**: Side-by-side frosted comparison table scoring gifts on Indian PIN code delivery speed, presentation scores, wax seals, and personalization depth.
- **Conversational Gift Assistant**: Integrated AI chat agent providing instant gifting suggestions with live product links and quick prompt chips.
- **Festive Reminders**: Create, track, and receive automated countdown notifications for Indian celebrations (Diwali, Weddings, Anniversaries, Birthdays).
- **Express Indian Delivery Checker**: 6-digit Indian PIN code verifier displaying courier partner (Bluedart/Delhivery) and express dispatch estimates.
- **Zero External Database**: In-memory + file-persisted JSON architecture (No MongoDB or complex cloud database required).
- **Production-Ready Deployments**: Cloudflare Pages for Frontend, Render for Express Backend.

---

## 📁 Project Structure

```text
Gift Mate/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/
│   │   └── _redirects          # Cloudflare Pages SPA rewrite rule
│   ├── src/
│   │   ├── api/client.js       # Unified API client with offline fallbacks
│   │   ├── context/            # Wishlist and Toast state managers
│   │   ├── components/         # Header, NavDrawer, BottomNav, ProductCard, etc.
│   │   ├── pages/              # 8 fully functional application pages
│   │   ├── utils/              # Indian Rupee currency formatting
│   │   ├── App.jsx             # Root application orchestrator
│   │   ├── index.css           # Design tokens, fonts, and utilities
│   │   └── main.jsx
│   ├── index.html              # HTML shell with Google Fonts & Material Symbols
│   ├── package.json
│   ├── tailwind.config.js      # Stitch design system tokens
│   └── vite.config.js          # Vite config with /api proxy
│
├── server/                     # Backend (Node.js + Express.js)
│   ├── data/                   # JSON persistence (products, categories, wishlist, reminders)
│   ├── routes/                 # REST API routes (products, categories, ai, wishlist, reminders, pincode)
│   ├── package.json
│   ├── server.js               # Express entrypoint with CORS & logging
│   └── .env                    # Server environment variables
│
├── DEPLOYMENT.md               # Detailed Cloudflare & Render deployment manual
├── render.yaml                 # Render infrastructure-as-code blueprint
├── package.json                # Monorepo runner
├── .env                        # Root environment variables
└── .gitignore                  # Git ignore rules
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
# In the server folder
cd server
npm install

# In the client folder
cd ../client
npm install
```

### 2. Run Locally
- **Backend API**:
  ```bash
  cd server
  npm start
  ```
  Runs at `http://localhost:5000`

- **Frontend Client**:
  ```bash
  cd client
  npm run dev
  ```
  Runs at `http://localhost:5173`

---

## 🚀 Deploying to Cloudflare & Render

For detailed, step-by-step instructions on deploying the frontend to **Cloudflare Pages** and the backend to **Render**, see [DEPLOYMENT.md](./DEPLOYMENT.md).
