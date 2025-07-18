# Lost & Found Devices Platform

A modern, full-stack web application for managing lost and found items in a college environment. Built with React.js, Node.js, Express, MongoDB, and featuring Google OAuth authentication.

## 🚀 Features

### Authentication & Security
- **Secure Registration & Login** with email/password
- **Google OAuth Integration** for seamless sign-in
- **JWT-based Authentication** with token management
- **Password Hashing** using bcrypt
- **Input Validation** and sanitization

### User Dashboard
- **Modern, Responsive UI** with smooth animations
- **Smart Search & Filtering** by category, location, and keywords
- **Real-time Item Cards** with image previews
- **Category-based Organization** (Electronics, Books, Clothing, etc.)
- **Location-based Filtering** (Library, Cafeteria, Parking Lot, etc.)

### Item Management
- **Post Lost Items** with detailed descriptions
- **Post Found Items** to help others
- **Image Upload Support** (up to 5 images per item)
- **Reward System** for lost items
- **Contact Information** management
- **Item Status Tracking** (Active, Claimed, Returned)

### Advanced Features
- **Image Storage** via Cloudinary
- **Search Functionality** with text indexing
- **View Counters** for item popularity
- **Tag System** for better categorization
- **User Profiles** with statistics
- **Responsive Design** for all devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Framework
- **React Router** - Navigation
- **React Hook Form** - Form Management
- **React Query** - Data Fetching
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Dropzone** - File Uploads
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication
- **JWT** - Token Management
- **Multer** - File Upload
- **Cloudinary** - Image Storage

### Development Tools
- **Nodemon** - Development Server
- **CORS** - Cross-Origin Support
- **Helmet** - Security Headers
- **Express Rate Limit** - Rate Limiting
- **Express Validator** - Input Validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Google OAuth credentials

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lost-found-devices
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lost-found
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Database Setup
Make sure MongoDB is running locally or set up MongoDB Atlas and update the connection string in your `.env` file.

### 5. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://your-domain.com/api/auth/google/callback` (production)

### 6. Cloudinary Setup
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
# Start backend server
cd server
npm run dev

# Start frontend (in a new terminal)
cd client
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

#### Using Render:
1. Create account at [Render](https://render.com/)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables from `.env`

#### Using Heroku:
```bash
# Install Heroku CLI
cd server
heroku create your-app-name-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-jwt-secret
# ... add other environment variables
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel:
```bash
# Install Vercel CLI
npm i -g vercel
cd client
vercel --prod
```

#### Using Netlify:
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set up environment variables in Netlify dashboard

### Database Deployment (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in your environment variables
5. Add your deployment IP to whitelist

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Items Endpoints
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/user/me` - Get current user's items

### Users Endpoints
- `GET /api/users/profile/:id` - Get user profile
- `GET /api/users/stats` - Get user statistics

## 🎨 Design Features

### Modern UI/UX
- **Gradient Backgrounds** and modern color scheme
- **Smooth Animations** with Framer Motion
- **Responsive Design** for all screen sizes
- **Interactive Elements** with hover effects
- **Loading States** and error handling
- **Toast Notifications** for user feedback

### Component Structure
```
src/
├── components/
│   ├── ItemCard.js
│   ├── LoadingSpinner.js
│   └── Navbar.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── LandingPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── DashboardPage.js
│   ├── PostItemPage.js
│   ├── ItemDetailPage.js
│   ├── ProfilePage.js
│   └── AuthCallback.js
├── App.js
├── index.js
└── index.css
```

## 🔒 Security Features

- **JWT Token Authentication**
- **Password Hashing** with bcrypt
- **Input Validation** and sanitization
- **CORS Protection**
- **Helmet Security Headers**
- **Rate Limiting**
- **File Upload Validation**
- **SQL Injection Prevention**

## 📱 Mobile Responsive

The application is fully responsive and works seamlessly on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Use

This project is designed for educational purposes and demonstrates:
- Full-stack web development
- Modern React patterns
- RESTful API design
- Database design and management
- Authentication and authorization
- File upload handling
- Responsive web design
- Deployment strategies

## 🚨 Important Notes

- **Environment Variables**: Never commit `.env` files to version control
- **API Keys**: Keep all API keys and secrets secure
- **Database**: Use MongoDB Atlas for production
- **Images**: Cloudinary handles image storage and optimization
- **Authentication**: Google OAuth requires proper domain configuration

## 📞 Support

For support or questions:
- Check the documentation
- Review the code comments
- Create an issue on GitHub
- Contact the development team

---

**Happy Coding! 🎉**

*Built with ❤️ for the college community*
