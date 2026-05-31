# Wahab Sohail — Portfolio

> Personal portfolio website built with **Next.js 14**, **TypeScript**, and **Framer Motion**.  
> Live at: [wahabsohail.vercel.app](https://portfolio-wahabsohail258.vercel.app/)

---

## ✨ Features

- **Dark / Light theme** — forest-green dark mode by default, smooth transitions
- **Animated hero** — bold typography with italic green accent word
- **Interactive terminal** — "Who Am I" card with 3D cursor-tracking tilt effect
- **Technical Toolbox** — animated marquee of skills and technologies
- **Featured Projects** — filterable project cards with GitHub links
- **Experience Timeline** — internships, education, and leadership
- **Bento contact grid** — iOS-style widgets + live clock + contact form
- **EmailJS integration** — contact form sends directly to inbox
- **Fully responsive** — mobile-first design with hamburger nav
- **Smooth scroll navigation** — all nav links jump to sections

---

## 🛠 Tech Stack

| Category | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + Tailwind utilities |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Poppins + Fira Code (Google Fonts) |
| Contact | EmailJS |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── projects/          # Project screenshot images
│   └── Wahab_Resume.pdf   # Downloadable resume
│
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with theme script
│   │   ├── page.tsx       # Main page — section order
│   │   └── globals.css    # Design system, tokens, responsive CSS
│   │
│   ├── components/
│   │   ├── hero/          # Hero section with specialty pills
│   │   ├── navbar/        # Single-pill navbar with theme toggle
│   │   ├── about/         # "Who Am I" terminal with 3D tilt
│   │   ├── skills/        # Tech toolbox marquee
│   │   ├── projects/      # Project cards with filters
│   │   ├── timeline/      # Experience & education timeline
│   │   ├── contact/       # Bento grid + contact form
│   │   ├── footer/        # Footer with social links
│   │   └── ui/            # Shared: ThemeToggle, ThemeScript, etc.
│   │
│   └── data/
│       ├── projects.ts    # Project data
│       └── experience.ts  # Work, education, leadership data
│
├── .env.local.example     # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/WahabSohail258/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your [EmailJS](https://emailjs.com) credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📬 EmailJS Setup (Contact Form)

1. Sign up at [emailjs.com](https://emailjs.com) — free tier works
2. Add **Email Service** → connect Gmail (`sohailwahab27@gmail.com`)
3. Create **Email Template** with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy your **Service ID**, **Template ID**, and **Public Key** into `.env.local`

---

## 🌐 Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import this repo
3. Add the 3 EmailJS environment variables in **Settings → Environment Variables**
4. Click **Deploy** — live in ~60 seconds

Every `git push` to `main` auto-deploys. No manual steps needed.

---

## 📄 Resume

Place your resume PDF at:
```
public/Wahab_Resume.pdf
```

The "Resume" button in the navbar and hero will automatically download it.

---

## 🔗 Links

- **GitHub:** [github.com/WahabSohail258](https://github.com/WahabSohail258)
- **LinkedIn:** [linkedin.com/in/wahab-sohail](https://linkedin.com/in/wahab-sohail)
- **Email:** [sohailwahab27@gmail.com](mailto:sohailwahab27@gmail.com)

---

## 📝 License

MIT — feel free to use as a template. A credit link is appreciated but not required.
