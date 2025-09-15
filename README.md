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
- **Authentication**: User signup, login, and dashboard pages with Supabase integration

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

## 🔐 Authentication Setup

### Supabase Configuration
1. Create a Supabase project at [supabase.com](https://supabase.com/)
2. Copy your project URL and anon key from the Supabase dashboard
3. Create a `.env.local` file in the root directory
4. Add your Supabase credentials to the `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
5. Restart the development server

### Database Setup
1. **Create the team_registrations table** by running this SQL in your Supabase SQL editor:

```sql
-- Create team_registrations table
CREATE TABLE team_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    team_lead_name VARCHAR(100) NOT NULL,
    team_lead_email VARCHAR(255) NOT NULL UNIQUE,
    college_name VARCHAR(200) NOT NULL,
    participant_count INTEGER NOT NULL CHECK (participant_count >= 1 AND participant_count <= 4),
    participants JSONB NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_team_registrations_email ON team_registrations(team_lead_email);
CREATE INDEX idx_team_registrations_team_name ON team_registrations(team_name);
CREATE INDEX idx_team_registrations_registration_date ON team_registrations(registration_date);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_team_registrations_updated_at 
    BEFORE UPDATE ON team_registrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can insert their own registration" ON team_registrations
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view all registrations" ON team_registrations
    FOR SELECT 
    USING (true);
```

2. **Set up RLS policies** according to your security requirements

## 📧 Email Configuration with Supabase Edge Functions

### Setup Email Service
1. **Deploy the Edge Function:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Link to your project
   supabase link --project-ref YOUR_PROJECT_REF
   
   # Deploy the email function
   supabase functions deploy send-confirmation-email
   ```

2. **Configure Email Service** in your Supabase dashboard (Project Settings > Edge Functions):
   ```
   EMAIL_API_KEY=your_email_service_api_key
   EMAIL_API_URL=your_email_service_api_endpoint
   FROM_EMAIL=noreply@yourdomain.com
   ```

3. **Email Service Examples:**
   
   **SendGrid:**
   ```
   EMAIL_API_KEY=SG.your_sendgrid_api_key
   EMAIL_API_URL=https://api.sendgrid.com/v3/mail/send
   ```
   
   **Resend:**
   ```
   EMAIL_API_KEY=re_your_resend_api_key
   EMAIL_API_URL=https://api.resend.com/emails
   ```

### Email Features
- **Confirmation Emails**: Automatic email sent upon registration
- **Professional Templates**: Styled HTML emails with team details
- **Registration Details**: Complete information including team members
- **Unique Registration IDs**: For tracking and reference

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Space Grotesk font
│   ├── page.tsx            # Main landing page with all sections
│   ├── signup/
│   │   └── page.tsx        # User signup page
│   ├── login/
│   │   └── page.tsx        # User login page
│   ├── dashboard/
│   │   └── page.tsx        # User dashboard
│   ├── globals.css         # Global styles and cursor pointer definitions
│   └── favicon.ico         # Website favicon
├── components/
│   ├── Hero.tsx            # Hero section with video background
│   ├── TopHeader.tsx       # Header with logo, language switcher, hamburger menu
│   ├── MenuDrawer.tsx      # Swiss design menu with GSAP flow animations
│   └── VerticalLine.tsx    # Decorative vertical lines
├── contexts/
│   └── AuthContext.tsx     # Authentication context provider
├── lib/
│   └── supabaseClient.ts   # Supabase client configuration
├── locales/
│   ├── en/common.json      # English translations
│   ├── ta/common.json      # Tamil translations
│   └── hi/common.json      # Hindi translations
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
