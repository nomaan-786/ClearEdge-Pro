# 🖼️ AI-Powered Background Remover SaaS Application

A **full-stack SaaS application** that allows users to remove image backgrounds using the **Clipdrop AI API**, manage authentication with **Clerk (JWT)**, handle payments via **Razorpay**, and operate on a **credit-based system** for fair usage.  

This project demonstrates how to build a **production-ready AI SaaS** app with **React.js** frontend, **Spring Boot** backend, and secure integrations.

---

## ✨ Features

✅ AI integration with **Clipdrop API** for background removal  
✅ **JWT Authentication** with Clerk for secure login  
✅ **Razorpay Payment Gateway** for seamless transactions  
✅ **Credit-based system** for image processing usage control  
✅ Upload and convert images to **Base64** for API compatibility  
✅ **Spring Boot + Feign Clients** for secure backend communication  
✅ Full-stack architecture explained step by step  

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS, Axios  
- **Backend**: Spring Boot, Feign Client  
- **Payments**: Razorpay  
- **AI Integration**: Clipdrop API  
- **Database**: MySQL  
- **Authentication**: Clerk (JWT Auth)  

---

## 📂 Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── utils/        # Helper functions
│   │   └── App.jsx
│   └── package.json
│
├── server/               # Spring Boot backend
│   ├── src/main/java/
│   │   ├── controllers/  # REST APIs
│   │   ├── services/     # Business logic
│   │   ├── clients/      # Feign clients
│   │   └── models/       # Entities
│   └── pom.xml
│
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-background-remover-saas.git
cd ai-background-remover-saas
```

### 2️⃣ Frontend Setup (React + Clerk)
```bash
cd client
npm install
npm run dev
```

- Add your Clerk Publishable Key in `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_key_here
```

### 3️⃣ Backend Setup (Spring Boot + Razorpay)
- Configure `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password

razorpay.key_id=your_key_id
razorpay.key_secret=your_key_secret
clipdrop.api_key=your_clipdrop_key
```

- Run the backend:
```bash
mvn spring-boot:run
```

---

## 💳 Credit-Based Workflow

1. User **signs up** with Clerk.  
2. On successful **payment via Razorpay**, credits are added.  
3. User uploads an image → converted to **Base64**.  
4. Image is sent to **Clipdrop API**.  
5. Processed image returned → **1 credit deducted**.  

---

## 📸 Demo Workflow

1. Upload an image.  
2. Background removed instantly via AI.  
3. Download the clean image.  
4. Manage usage with credit system.  

---

## 📌 Future Enhancements

- 🌍 Deploy on **Vercel**  
- 📊 Add **usage analytics dashboard**  
- 📨 Email notifications with credits summary  
- 🔒 Role-based admin panel  

---

## 🚀 Conclusion

This project demonstrates how to integrate **AI APIs, payment gateways, authentication, and full-stack architecture** into a **real-world SaaS application**. Perfect for anyone learning **AI-powered SaaS development** with modern technologies.  

---

### 👨‍💻 Author
Built with ❤️ by *Mrityunjay Gupta*  
