# 🚍 Tamil Nadu Bus Ticket Booking System

A modern, bilingual (English/Tamil) bus ticket booking system built with React, Node.js, and Firebase. Features real-time seat availability, secure payments, email/SMS notifications, and admin dashboard.

## ✨ Features

### 🔐 Authentication & Authorization
- Firebase Authentication with email/password and Google OAuth
- Role-based access control (Admin/User)
- Custom claims for user roles
- Protected routes and middleware

### 🌐 Internationalization
- Bilingual support (English/தமிழ்)
- Dynamic language switching
- Localized UI components

### 🚌 Bus Management (Admin)
- CRUD operations for buses
- Route management
- Seat configuration
- Real-time availability updates

### 🎫 Booking System (User)
- Search buses by route and date
- Interactive seat selection
- Real-time seat availability
- Booking confirmation

### 💳 Payment Integration
- Razorpay payment gateway
- Secure payment processing
- Transaction verification
- Payment status tracking

### 📧 Notifications
- Email confirmations (Tamil & English)
- SMS notifications with Unicode support
- Booking confirmations
- Payment receipts

### 📊 Admin Dashboard
- Analytics and reports
- Revenue tracking
- Booking statistics
- User management

### 🎨 Modern UI/UX
- Responsive design with TailwindCSS
- Beautiful gradients and animations
- Toast notifications
- Loading states

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React i18next** - Internationalization
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization
- **React QR Code** - QR code generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Firebase Admin SDK** - Backend services
- **Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Nodemailer** - Email sending
- **Twilio/Fast2SMS** - SMS notifications
- **Razorpay** - Payment gateway
- **PDFKit** - PDF generation
- **QRCode** - QR code generation

### Security & Performance
- **Helmet** - Security headers
- **Rate Limiting** - API protection
- **Compression** - Response compression
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Razorpay account
- Email service (Gmail recommended)
- SMS service (Twilio or Fast2SMS)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tamilnadu-bus-ticket
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

Fill in your environment variables:
```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS Configuration (Choose one)
# Twilio
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# OR Fast2SMS
FAST2SMS_API_KEY=your-fast2sms-api-key
FAST2SMS_SENDER_ID=TNBTKT

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
tamilnadu-bus-ticket/
├── backend/
│   ├── config/
│   │   ├── firebase.js
│   │   └── serviceAccountKey.json
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── busController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── busRoutes.js
│   │   └── bookingRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   └── paymentService.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Buses.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── MyBookings.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── ta.json
│   │   ├── i18n.js
│   │   ├── firebase.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Download service account key
5. Enable Storage (for ticket PDFs)

### Razorpay Setup
1. Create Razorpay account
2. Get API keys from dashboard
3. Configure webhook endpoints

### Email Setup (Gmail)
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in EMAIL_PASS

### SMS Setup
Choose between Twilio or Fast2SMS:
- **Twilio**: International SMS with Unicode support
- **Fast2SMS**: Indian SMS provider with better rates

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
```

Deploy the `dist` folder to your hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (more languages)
- [ ] Offline booking capability
- [ ] Integration with other payment gateways
- [ ] Real-time chat support
- [ ] Advanced seat mapping
- [ ] Route optimization
- [ ] Weather integration
- [ ] Social media integration

---

**Built with ❤️ for Tamil Nadu**
