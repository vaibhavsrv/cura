# Cura — Unified Patient Health Passport

> Doctors treating patients in emergencies across different hospitals have no access to consolidated medical histories, drug allergies, or ongoing prescriptions. Cura solves this.

---

## The Problem

Health records are fragmented across individual hospitals with no interoperable system. A doctor at Hospital B has zero visibility into what Hospital A diagnosed, prescribed, or flagged for the same patient.

**Result:** Duplicate tests, dangerous drug interactions, missed allergy alerts, and delayed emergency treatment.

---

## The Solution

Cura is a full-stack health platform where patients own a **unified digital health passport** — accessible by any doctor at any hospital via a QR code scan. No login needed in an emergency. One scan shows blood group, allergies, active medications, and last diagnosis instantly.

---

## System Flow

```
Patient Registers
       │
       ▼
  Creates Health Passport
  (blood group, allergies, conditions)
       │
       ▼
  Daily Health Logs        ──►  AI Insights Engine
  (BP, sugar, mood, meds)        (trend alerts, anomaly detection)
       │
       ▼
  Generates QR Code
       │
       ▼
  Doctor at Any Hospital Scans QR
       │
       ├──► Sees: Blood group + drug allergies   (immediate)
       ├──► Sees: Active medications              (immediate)
       ├──► Sees: Full medical history timeline   (one scroll)
       └──► AI flags: Drug interaction warnings   (automatic)
       │
       ▼
  Doctor Adds Visit Notes + New Prescription
       │
       ▼
  Patient's Passport Updated Automatically
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, React Router v6 |
| Backend | Node.js, Express.js |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Database | PostgreSQL |
| AI Features | Claude API / OpenAI API |
| QR Code | qrcode.react |
| Charts | Recharts |

---

## Project Structure

```
cura/
├── frontend/
│   └── src/
│       ├── pages/          # Login, Register, Dashboard, PatientProfile
│       ├── components/     # Navbar, ProtectedRoute, QRCard
│       ├── context/        # AuthContext.jsx — global auth state
│       └── api/            # auth.js, patient.js — all API calls
│
├── backend/
│   ├── routes/             # auth.js, patients.js, records.js
│   ├── middleware/         # verifyToken.js — JWT guard
│   ├── db.js               # PostgreSQL connection pool
│   ├── server.js           # Express entry point
│   └── .env                # Secrets (never committed)
│
└── README.md
```

---

## Database Schema

```sql
users           — id, name, email, password (hashed), role, created_at
patients        — id, user_id, blood_group, allergies, chronic_conditions
health_records  — id, patient_id, doctor_id, diagnosis, prescription, date
appointments    — id, patient_id, doctor_id, scheduled_at, status
health_logs     — id, patient_id, bp, sugar, mood, notes, logged_at
```

---

## Auth Flow

```
POST /api/auth/register
  → password hashed with bcrypt
  → user saved to PostgreSQL
  → returns user object

POST /api/auth/login
  → email looked up in DB
  → bcrypt.compare() checks password
  → JWT token signed with secret (expires 7d)
  → token + user returned to frontend

Frontend stores token in localStorage
Every protected API request sends:
  Authorization: Bearer <token>

verifyToken middleware checks token on every protected route
→ valid: req.user set, route proceeds
→ invalid: 403 Forbidden
```

---

## Features

### Phase 1 — Foundation (current)
- [x] Patient and doctor registration
- [x] JWT-based login with role system
- [x] Protected routes on frontend
- [x] PostgreSQL database with user schema

### Phase 2 — Health Passport
- [ ] Patient profile (blood group, allergies, conditions)
- [ ] Medical history timeline
- [ ] Drug allergy alert banner for doctors
- [ ] QR code generation and emergency scan access

### Phase 3 — Daily Tracking
- [ ] Daily health check-in (BP, sugar, mood, sleep)
- [ ] Medication tracker with streak system
- [ ] Appointment booking and reminders
- [ ] Health trend charts (Recharts)

### Phase 4 — AI Insights
- [ ] Pre-visit symptom summariser for doctors
- [ ] Drug interaction checker
- [ ] Anomaly detection on health logs

### Phase 5 — Community
- [ ] Anonymous health communities by condition
- [ ] Peer posts and doctor Q&A feed
- [ ] Gamified medication adherence badges

---

## Run Locally

### Prerequisites
- Node.js v18+
- PostgreSQL running locally

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/cura.git
cd cura

# Backend
cd backend
npm install
# Create .env with your DB credentials and JWT secret (see .env.example)
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Environment Variables

Create `backend/.env`:

```
PORT=5000
JWT_SECRET=your_secret_key_here
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cura_db
DB_PASSWORD=yourpassword
DB_PORT=5432
```

---

## Why Cura Matters

India has 1.4 billion people and a deeply fragmented healthcare system. A patient visiting three different hospitals generates three separate, siloed records. During emergencies — when the patient is unconscious — doctors have no way to know about penicillin allergies, ongoing blood thinners, or a recent surgery.

Cura gives every patient one health identity, accessible anywhere, with their consent.

---

## Author

**Vaibhav Srivastava**
B.Tech Computer Science, Galgotias University
[LinkedIn](https://linkedin.com/in/vaisrv) · [GitHub](https://github.com/vaibhavsrv)