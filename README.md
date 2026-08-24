# LIFELINK - Healthcare Assistance Platform for West Bengal

![LIFELINK](https://img.shields.io/badge/LIFELINK-Healthcare-medical?color=0066cc)
![Status](https://img.shields.io/badge/Status-Beta-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

**Connecting You to Care, When It Matters Most.**

LIFELINK is a comprehensive healthcare discovery and assistance platform specifically designed for West Bengal, India. It helps users find nearby hospitals, consult with experienced doctors, locate blood donors, and compare healthcare prices all in one place.

## 🚀 Features

### For Users
- ✅ **Find Nearby Hospitals** - Discover hospitals with real-time distance calculations
- ✅ **Consult Doctors** - Book consultations with doctors by specialty and availability
- ✅ **Blood Donor Network** - Find compatible blood donors in your area
- ✅ **Price Comparison** - Compare healthcare service prices across hospitals
- ✅ **Emergency Services** - Quick access to 24/7 emergency hospitals
- ✅ **User Dashboard** - Manage consultations, bookings, and medical history
- ✅ **Secure Authentication** - Email/Phone-based login with password hashing

### For Admins
- ✅ **CSV Data Import** - Bulk upload hospitals, doctors, and pricing data
- ✅ **Content Management** - Add, edit, and delete healthcare facilities
- ✅ **Analytics Dashboard** - View platform statistics and user activity
- ✅ **System Management** - Manage users, bookings, and payments

### Technology
- ✅ **Next.js 15** - React-based framework with built-in optimization
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Modern, responsive UI
- ✅ **PostgreSQL** - Robust relational database
- ✅ **Prisma ORM** - Database access layer
- ✅ **Framer Motion** - Smooth animations
- ✅ **JWT Authentication** - Secure token-based auth

## 📋 Prerequisites

Before you start, ensure you have:
- **Node.js** v18+ installed
- **npm** or **yarn** package manager
- **PostgreSQL** database (local or cloud like Supabase)
- **Git** for version control

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Gungun1909/lifelink-network.git
cd lifelink-network
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lifelink"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-strong-secret-key"
```

### 4. Setup Database
```bash
npx prisma db push
npx ts-node scripts/seed.ts
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

```
lifelink-network/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Login, Signup pages
│   │   ├── (dashboard)/         # User dashboard
│   │   ├── (main)/              # Public pages
│   │   ├── admin/               # Admin panel
│   │   └── api/                 # API routes
│   ├── components/              # React components
│   ├── lib/                     # Utilities & helpers
│   ├── types/                   # TypeScript types
│   └── styles/                  # Global styles
├── prisma/
│   └── schema.prisma            # Database schema
├── public/                      # Static assets
├── scripts/
│   └── seed.ts                  # Database seeding
└── package.json
```

## 🔐 Demo Credentials

For testing, use these credentials:

**Admin Account:**
- Email: `admin@lifelink.com`
- Password: `admin@123`

**Demo User Account:**
- Email: `demo@lifelink.com`
- Password: `demo@123`

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t lifelink .
docker run -p 3000:3000 lifelink
```

## 📝 Documentation

Full documentation available in the wiki and inline code comments.

## 🤝 Contributing

Contributions are welcome! Please fork and create a pull request.

## 📄 License

MIT License - see LICENSE file for details.

## ⚠️ Disclaimer

**IMPORTANT:** Information shown in this demo may contain sample data and should be verified with the healthcare provider before making medical decisions.

## 📞 Contact

- **Email:** support@lifelink.com
- **GitHub:** https://github.com/Gungun1909/lifelink-network

---

**Made with ❤️ for West Bengal Healthcare**
