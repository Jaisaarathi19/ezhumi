# 🌱 Ezhumi Hackathon Landing Page

A comprehensive, production-quality landing page for the Ezhumi Agriculture Hackathon. Built with Next.js 14, TypeScript, Tailwind CSS, and advanced GSAP animations featuring Swiss design principles and agriculture-themed aesthetics.

## ✨ Features

### 🏗️ **Modern Tech Stack**
- **Next.js 14**: App Router with TypeScript support
- **Tailwind CSS 4**: Custom configuration with agriculture color palette
- **GSAP**: Advanced animations with ScrollTrigger
- **Swiss Design**: Clean typography, geometric layouts, minimal color schemes

### 🎨 **Design Elements**
- **Agriculture Theme**: Green color palette (green-50 to green-900)
- **Swiss Design Principles**: Clean typography, grid systems, minimal aesthetics
- **Typography**: Space Grotesk font for modern, professional look
- **Glassmorphism**: Subtle transparency effects and gradient overlays
- **Responsive Design**: Mobile-first approach with adaptive layouts

### 🚀 **Key Sections**
- **Hero Section**: Video background with left-aligned headline and GSAP animations
- **Swiss Menu Drawer**: Logo-left, vertical line center, navigation-right layout with flow animations
- **FAQ Section**: 5 expandable cards with hackathon information
- **Contact Form**: Complete form with Name, Contact Number, Email, Message fields
- **Footer**: Comprehensive footer with social media links and college information

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ezhumi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install GSAP types:**
   ```bash
   npm install @types/gsap
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Space Grotesk font
│   ├── page.tsx            # Main landing page with all sections
│   ├── globals.css         # Global styles and cursor pointer definitions
│   └── favicon.ico         # Website favicon
├── components/
│   ├── Hero.tsx            # Hero section with video background
│   ├── TopHeader.tsx       # Header with logo, language switcher, hamburger menu
│   ├── MenuDrawer.tsx      # Swiss design menu with GSAP flow animations
│   └── VerticalLine.tsx    # Decorative vertical lines
public/
├── media/
│   └── video.mp4           # Background video file
└── [svg files]             # Various icon assets
```

## 🎬 Advanced GSAP Animations

### Swiss Menu Drawer Animations
- **Flow Animation**: Animated dots flowing across the drawer
- **Staggered Entry**: Menu items animate in sequence
- **Logo Animation**: Smooth logo appearance with scaling
- **Vertical Line**: Animated central divider

### Hero Section Animations
- **Timeline Animations**: Coordinated headline and button animations
- **Parallax Effects**: Video background with slower scroll speed
- **Word-level Animation**: Individual word movements and scaling

### Interactive Elements
- **Expandable FAQ**: Smooth accordion animations
- **Form Interactions**: Focus states and validation styling
- **Social Media Hover**: Scale and color transition effects

## 🌿 Agriculture Theme

### Color Palette
```css
/* Primary Agriculture Colors */
green-50: #f0fdf4    /* Light accents */
green-100: #dcfce7   /* Subtle backgrounds */
green-200: #bbf7d0   /* Text secondary */
green-300: #86efac   /* Icons */
green-400: #4ade80   /* Borders */
green-500: #22c55e   /* Primary actions */
green-600: #16a34a   /* Hover states */
green-700: #15803d   /* Active states */
green-800: #166534   /* Dark elements */
green-900: #14532d   /* Darkest backgrounds */
green-950: #052e16   /* Footer elements */
```

### Design Philosophy
- **Nature-Inspired**: Colors reflecting agricultural landscapes
- **Sustainability Focus**: Green theme emphasizing environmental consciousness
- **Professional Aesthetic**: Balanced color usage for credibility

## 📱 Responsive Features

### Mobile Optimization
- **Touch-Friendly**: Large tap targets and spacing
- **Simplified Navigation**: Hamburger menu with smooth animations
- **Optimized Forms**: Mobile-friendly input fields and buttons

### Tablet & Desktop
- **Adaptive Grids**: Flexible layouts that scale beautifully
- **Enhanced Interactions**: Hover effects and advanced animations
- **Full Feature Set**: Complete functionality across all devices

## � Content Sections

### FAQ Section
- **5 Key Questions**: Covering hackathon details, eligibility, themes, prizes, and timeline
- **Expandable Design**: Smooth accordion functionality
- **Search-Friendly**: SEO-optimized content structure

### Contact Form
- **Complete Fields**: Name, Contact Number, Email, Message
- **Validation Styling**: Visual feedback for form states
- **Professional Layout**: Clean, accessible form design

### Footer
- **Comprehensive Links**: Quick navigation and hackathon information
- **Social Media**: Email, LinkedIn, Instagram with proper icons
- **College Information**: Rajalakshmi Engineering College details
- **Legal Links**: Privacy Policy, Terms of Service, Code of Conduct

## ♿ Accessibility & Performance

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and structure
- **ARIA Labels**: Screen reader friendly navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color combinations
- **Reduced Motion**: Respects user motion preferences

### Performance Optimizations
- **Dynamic Imports**: GSAP loaded only when needed
- **Optimized Images**: Proper sizing and lazy loading
- **Minimal Bundle**: Tree-shaking and code splitting
- **SSR Ready**: Server-side rendering compatibility

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Recommended Platforms
- **Vercel**: Seamless Next.js deployment
- **Netlify**: Static site hosting with form handling
- **AWS Amplify**: Full-stack deployment with backend integration

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -m 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Open Pull Request**

## 📄 License

This project is created for the Ezhumi Hackathon organized by the Entrepreneurship Development Cell, Rajalakshmi Engineering College.

## 🏫 About

**Organized by**: Entrepreneurship Development Cell  
**Institution**: Rajalakshmi Engineering College  
**Location**: Vellore - Chennai Rd, Rajalakshmi Nagar, Thandalam, Meyalurkuppam, Tamil Nadu 602105  

---

**Built with 💚 for sustainable agriculture innovation**
