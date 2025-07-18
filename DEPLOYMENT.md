# Deployment Guide

## Prerequisites
- Node.js 14+
- MongoDB Atlas account
- Cloudinary account
- Google Cloud Console project
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: Setup MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP (0.0.0.0/0 for production)
5. Get connection string

## Step 2: Setup Cloudinary
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get cloud name, API key, and API secret from dashboard

## Step 3: Setup Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-backend-domain.com/api/auth/google/callback`

## Step 4: Deploy Backend to Render
1. Create account at [Render](https://render.com/)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-jwt-secret
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     CLIENT_URL=https://your-frontend-domain.vercel.app
     ```

## Step 5: Deploy Frontend to Vercel
1. Create account at [Vercel](https://vercel.com/)
2. Connect your GitHub repository
3. Import project and select `client` folder
4. Configure:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-domain.render.com
   ```

## Step 6: Update CORS Settings
Update your backend's CORS configuration to include your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Step 7: Test Deployment
1. Test user registration and login
2. Test Google OAuth
3. Test item posting with image upload
4. Test all navigation and functionality

## Alternative Deployment Options

### Netlify (Frontend)
1. Build your React app: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set up environment variables in Netlify dashboard

### Heroku (Backend)
```bash
# Install Heroku CLI
cd server
heroku create your-app-name-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
# ... add other environment variables
git push heroku main
```

### Railway (Full Stack)
1. Connect your GitHub repository
2. Deploy backend service with environment variables
3. Deploy frontend service
4. Configure custom domains

## Environment Variables Checklist

### Backend (.env)
- [x] NODE_ENV=production
- [x] PORT=10000
- [x] MONGODB_URI
- [x] JWT_SECRET
- [x] GOOGLE_CLIENT_ID
- [x] GOOGLE_CLIENT_SECRET
- [x] CLOUDINARY_CLOUD_NAME
- [x] CLOUDINARY_API_KEY
- [x] CLOUDINARY_API_SECRET
- [x] CLIENT_URL

### Frontend
- [x] REACT_APP_API_URL (if using custom API URL)

## Post-Deployment Checklist
- [ ] Test user registration
- [ ] Test user login
- [ ] Test Google OAuth
- [ ] Test item posting
- [ ] Test image upload
- [ ] Test search functionality
- [ ] Test responsive design
- [ ] Test all navigation
- [ ] Check error handling
- [ ] Verify HTTPS redirect
- [ ] Check performance metrics

## Troubleshooting

### Common Issues
1. **CORS Error**: Update backend CORS settings
2. **OAuth Redirect**: Check redirect URIs in Google Console
3. **Image Upload**: Verify Cloudinary credentials
4. **Database Connection**: Check MongoDB Atlas IP whitelist
5. **Build Errors**: Check Node.js version compatibility

### Monitoring
- Monitor server logs in Render dashboard
- Monitor frontend deployment logs in Vercel
- Use MongoDB Atlas monitoring for database performance
- Set up error tracking (Sentry, LogRocket)

## Performance Optimization
1. Enable gzip compression
2. Implement image optimization
3. Use CDN for static assets
4. Implement caching strategies
5. Monitor bundle size
6. Optimize database queries

## Security Checklist
- [ ] All environment variables are secure
- [ ] HTTPS is enforced
- [ ] JWT secrets are strong
- [ ] Database access is restricted
- [ ] File upload validation is in place
- [ ] Rate limiting is configured
- [ ] Input validation is implemented
