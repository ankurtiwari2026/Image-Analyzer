# Visual Product Matcher - Technical Assessment Project

## 🚀 Project Overview

A web application that helps users find visually similar products based on uploaded images. Built as a technical assessment for a Software Engineer position, this project demonstrates problem-solving approach, code quality, and working functionality using modern web technologies.

**Project Challenge**: Build a web application that helps users find visually similar products based on uploaded images.

**Live Demo**: [🌐 View Live Application](https://image.onrender.com/)
**GitHub Repository**: [📁 View Source Code](https://github.com/ankurtiwari2026/Image-Analyzer)

## ✨ Required Features (Assignment Compliance)

### 🔍 **Image Upload**
- **File Upload**: Drag & drop file upload support
- **URL Input**: Direct image URL analysis capability
- **Multiple Formats**: Support for common image formats (JPEG, PNG, WebP)

### 🎯 **Search Interface**
- **Image Display**: View the uploaded image with analysis results
- **Similar Products**: List of visually similar products with metadata
- **Filtering**: Filter results by similarity score and category
- **Responsive Design**: Mobile-first, responsive interface

### 🗄️ **Product Database**
- **50+ Products**: Comprehensive product database with images
- **Rich Metadata**: Name, category, description, tags, colors, brand
- **AI Analysis**: Google Gemini AI-powered image understanding
- **Similarity Scoring**: Multi-factor matching algorithm

### 📱 **User Experience**
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error handling and user feedback
- **Mobile Responsive**: Optimized for all device sizes
- **Intuitive Interface**: Clean, modern UI with Tailwind CSS

## 📋 Assignment Requirements 

### **Project Challenge**
Build a web application that helps users find visually similar products based on uploaded images.

### **Required Features ✅**
- ✅ **Image Upload**: Support both file upload and image URL input
- ✅ **Search Interface**: View uploaded image, see similar products, filter by similarity score
- ✅ **Product Database**: 50+ products with images and metadata (name, category, etc.)
- ✅ **Hosting**: Ready for deployment on free hosting services
- ✅ **Mobile Responsive**: Mobile-first responsive design

### **Technical Requirements ✅**
- ✅ **Clean Code**: Production-quality, well-structured TypeScript/React code
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Loading States**: Smooth loading animations and UX improvements
- ✅ **Documentation**: Clear README explaining approach and implementation


## 🏗️ Technical Architecture

### **Frontend Technologies**
- **Next.js 13**: Latest React framework with App Router
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Modern, utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI components
- **Framer Motion**: Smooth animations and transitions

### **Backend & Database**
- **MongoDB**: NoSQL database with Mongoose ODM
- **Next.js API Routes**: Serverless API endpoints
- **Advanced Indexing**: Optimized database queries with compound indexes
- **Text Search**: Full-text search capabilities for product discovery

### **AI Integration**
- **Google Gemini AI**: State-of-the-art image analysis and understanding
- **Intelligent Prompting**: Optimized prompts for accurate product analysis
- **Multi-Modal Processing**: Text and image analysis for comprehensive results

## 📱 User Experience

### **Main Interface**
- **Drag & Drop Upload**: Intuitive image upload with drag-and-drop support
- **URL Input**: Support for direct image URL analysis
- **Real-time Analysis**: Live feedback during image processing
- **Responsive Design**: Optimized for all device sizes

### **Results Display**
- **Grid Layout**: Clean, organized product results
- **Similarity Scores**: Visual representation of match quality
- **Product Cards**: Rich product information with images and details
- **Related Products**: Discover additional similar items

## 💡 Approach & Implementation Strategy

### **Problem-Solving Approach**
This project addresses the challenge of visual product matching through a multi-layered approach:

1. **AI-Powered Image Analysis**: Leverages Google Gemini AI to extract comprehensive product information including categories, colors, brands, and descriptive tags from uploaded images.

2. **Intelligent Matching Algorithm**: Implements a sophisticated scoring system that combines exact matches, category similarity, brand recognition, color analysis, and semantic understanding for accurate product matching.

3. **Scalable Architecture**: Built with Next.js 13 and MongoDB for performance and scalability, featuring optimized database queries and efficient image processing.

4. **Enhanced User Experience**: Focuses on intuitive interfaces, responsive design, and comprehensive error handling to ensure smooth user interactions across all devices.

### **Technical Implementation**
- **Frontend**: Modern React with TypeScript for type safety and maintainability
- **Backend**: Serverless API routes with MongoDB for flexible data storage
- **AI Integration**: Google Gemini AI for advanced image understanding
- **Performance**: Database indexing, optimized queries, and responsive UI components

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- MongoDB instance
- Google Gemini AI API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Image-Analayzing-Tool-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Database Setup**
   ```bash
   # Run migration to set up database indexes
   node scripts/migrate-products.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Configuration

### **Environment Variables**
- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini AI API key
- `NODE_ENV`: Environment (development/production)

### **Database Configuration**
- Automatic index creation for optimal performance
- Text search indexes for product discovery
- Compound indexes for category and tag filtering

## 📊 API Endpoints

### **Core Functionality**
- `POST /api/analyze` - Image analysis with Gemini AI
- `POST /api/search` - Advanced product matching
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Save new products

### **Advanced Features**
- `GET /api/related-products` - Get related products
- `POST /api/fetch-image` - Image URL processing

## 🎨 Customization

### **Styling**
- Tailwind CSS configuration in `tailwind.config.ts`
- Component variants using `class-variance-authority`
- Dark/light theme support with `next-themes`

### **Components**
- Modular component architecture
- Reusable UI components in `components/ui/`
- Custom hooks for business logic

## 📈 Performance Features

### **Optimizations**
- Database indexing for fast queries
- Efficient image processing
- Optimized search algorithms
- Responsive image handling

### **Scalability**
- Serverless API architecture
- Database connection pooling
- Efficient memory usage
- Optimized bundle size

## 🔒 Security & Best Practices

### **Data Protection**
- Input validation and sanitization
- Secure API endpoints
- Environment variable protection
- Database query optimization

### **Code Quality**
- TypeScript for type safety
- ESLint configuration
- Consistent code formatting
- Comprehensive error handling

## 🧪 Testing & Quality Assurance

### **Code Quality**
- TypeScript strict mode enabled
- ESLint rules for code consistency
- Prettier formatting standards
- Comprehensive error boundaries

### **Performance Testing**
- Database query optimization
- Image processing efficiency
- Search algorithm performance
- Memory usage optimization

## 🚀 Deployment & Hosting

### **Assignment Requirement: Live Deployment**
This project is ready for deployment on any free hosting service as required by the assignment.

### **Recommended Free Hosting Options**
- **Render**: Free tier for web services (✅ **Successfully deployed here**)
- **Vercel**: Perfect for Next.js applications
- **Netlify**: Great for static sites with serverless functions
- **Railway**: Good for full-stack applications with database

### **Quick Deploy to Render (Currently Used)**
```bash
# Connect your GitHub repository to Render
# 1. Go to render.com and sign up
# 2. Click "New +" and select "Web Service"
# 3. Connect your GitHub repository
# 4. Set build command: npm install && npm run build
# 5. Set start command: npm start
# 6. Add environment variables and deploy
```

**🌐 Live Demo**: [https://image-analyzer.onrender.com/](https://image-analyzer.onrender.com/)

### **Quick Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and deploy
```

**🚀 One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/Image-Analayzing-Tool-main)

### **Production Build**
```bash
npm run build
npm start
```

### **Environment Considerations**
- Ensure MongoDB connection string is properly configured
- Set appropriate environment variables
- Configure production database indexes
- Optimize image processing for production load

## 📚 Documentation

### **Additional Resources**
- `README-ENHANCED-FEATURES.md` - Detailed feature documentation
- API endpoint documentation in code comments
- Component usage examples in component files

### **Database Schema**
- Product model with comprehensive fields
- Relationship mapping system
- Indexing strategy documentation

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Implement changes with TypeScript
4. Test thoroughly
5. Submit a pull request

### **Code Standards**
- Follow TypeScript best practices
- Maintain component modularity
- Update documentation as needed
- Ensure responsive design compliance



