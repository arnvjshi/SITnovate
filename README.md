# Smart Shopping System

## 📌 Overview
A smart shopping system that detects and processes items in real-time, enabling automatic billing without checkout lines. Uses **QR codes** for adding items to a cart, with a **mobile web app** for scanning and a **desktop e-commerce interface** for shopping. The backend is powered by **AWS Lambda** for seamless cloud processing.

## 🚀 Features
- **QR Code-Based Cart System** – Scan QR codes to add products to the cart.
- **Mobile Web App** – Displays QR codes for scanning.
- **Desktop E-commerce Interface** – Home page, product listings, and cart management.
- **AWS Lambda Backend** – Serverless architecture for processing transactions.
- **Real-Time Inventory Tracking** – Cloud-based database management.
- **Seamless Checkout & Billing** – Automatic invoicing and payment integration.
- **Admin Panel** – Manage products, inventory, and user orders.
- **Scalable & Fast** – Optimized with Next.js for frontend and AWS for backend.

## 🏗️ Tech Stack
### **Frontend** (Next.js)
- **React.js & Next.js** – Modern UI with fast SSR/CSR.
- **Tailwind CSS** – For responsive and clean design.
- **React Context/Zustand** – State management for cart sync.
- **react-qr-reader** – QR code scanning functionality.

### **Backend** (AWS Lambda & API Gateway)
- **Node.js with Express** – API for processing QR code data.
- **AWS Lambda** – Serverless computing for processing transactions.
- **AWS DynamoDB** – NoSQL database for product and cart storage.
- **AWS S3** – Storing product images and invoices.

### **Other Integrations**
- **Stripe/Razorpay** – Payment processing.
- **Firebase/Auth.js** – User authentication.
- **WebRTC** – QR code scanner implementation for mobile.

## 📂 Project Structure
```
/smart-shopping
├── /components
│   ├── Header.js
│   ├── Footer.js
│   ├── ProductCard.js
│   ├── QRScanner.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── AdminPanel.js
│
├── /pages
│   ├── index.js  → Home page
│   ├── product/[id].js  → Product details
│   ├── cart.js  → Shopping cart & checkout
│   ├── admin.js  → Admin dashboard
│   ├── api/qrScan.js  → API for QR scanning
│
├── /utils
│   ├── api.js  → API calls to AWS Lambda
│   ├── helpers.js  → Utility functions
│
├── /public
│   ├── /images
│
├── .env.local  → API keys & secrets
├── next.config.js
├── package.json
```

## ⚡ Setup & Installation
### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/smart-shopping.git
cd smart-shopping
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in the root and add:
```ini
NEXT_PUBLIC_API_URL=your_aws_lambda_url
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

### **4. Run the Development Server**
```bash
npm run dev
```
The app will be available at **http://localhost:3000**.

## 📜 License
MIT License © 2025 Arnav Joshi

## 📞 Contact
For queries, contact: **arnvjshi@gmail.com**

