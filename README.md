# 🛡️ Phantom Cyber Core - SOC Dashboard
![Screenshot From 2025-07-10 14-12-56](https://github.com/user-attachments/assets/84163d3b-4773-4051-8abd-3d6e889f26c9)
![Screenshot From 2025-07-10 14-13-03](https://github.com/user-attachments/assets/88028a82-a01b-492a-bc57-a0d27bbd2667)
![Screenshot From 2025-07-10 14-13-09](https://github.com/user-attachments/assets/4252f4d1-c09a-4237-88ed-954abed616a7)
![Screenshot From 2025-07-10 14-13-16](https://github.com/user-attachments/assets/bd9ce2c4-a995-4867-b822-c0603b136163)
![Screenshot From 2025-07-10 14-13-24](https://github.com/user-attachments/assets/9e2d6b91-ff00-4cfe-afc6-a1639c1808cd)
![Screenshot From 2025-07-10 14-13-31](https://github.com/user-attachments/assets/db08ca50-2e29-4686-9f57-a99433655091)
![Screenshot From 2025-07-10 14-14-00](https://github.com/user-attachments/assets/3de578d4-01d1-4303-b982-f494e26b9994)


[![Deploy Status](https://img.shields.io/badge/Deploy-Live-brightgreen)](https://phantom01.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4.svg)](https://tailwindcss.com/)

A comprehensive **Cybersecurity Operations Center (SOC) Dashboard** built with modern web technologies. This professional-grade cyber platform provides advanced monitoring, threat detection, and incident management capabilities with a sleek, Matrix-inspired dark interface.

## 🌟 Live Demo

**[🚀 View Live Dashboard](https://phantom01.netlify.app/)**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Dashboard
- **Real-time Security Metrics** - Live threat counters and security status
- **Interactive Analytics** - Dynamic charts and data visualizations
- **Network Monitoring** - Infrastructure health and performance tracking
- **Quick Actions** - Emergency response buttons for critical incidents

### 🔍 Threat Intelligence Center
- **Live Threat Feeds** - Real-time security intelligence from multiple sources
- **IOC Management** - Indicators of Compromise tracking and analysis
- **Threat Confidence Scoring** - Advanced threat assessment algorithms
- **Advanced Search & Filtering** - Powerful query capabilities

### 📊 Real-time Monitoring
- **Live System Metrics** - Performance monitoring with real-time updates
- **Security Event Streaming** - Continuous security event processing
- **Resource Utilization** - System resource tracking and alerts
- **Threat Detection Status** - Active monitoring of security systems

### 🚨 Incident Management
- **Full Lifecycle Tracking** - Complete incident management workflow
- **Priority-based Severity** - Intelligent incident classification
- **Timeline & Activity Logs** - Detailed incident history and forensics
- **Assignee Management** - Team coordination and task assignment

### 🎨 Advanced Design System
- **Matrix-inspired Dark Theme** - Cyberpunk aesthetic with neon accents
- **Cyber Green/Blue Palette** - Professional security operations colors
- **Terminal Aesthetics** - Monospace fonts and command-line inspired UI
- **Responsive Design** - Optimized for all screen sizes and devices

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - Modern UI library with hooks and concurrent features
- **TypeScript 5.x** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **React Router** - Client-side routing for single-page application

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful, customizable icons
- **CSS Grid & Flexbox** - Modern layout systems

### Data Visualization
- **Recharts** - Composable charting library built on React components
- **Custom Charts** - Specialized security metrics visualizations

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting and style consistency
- **Git** - Version control and collaboration

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Neerajupadhayay2004/phantom-cyber-core.git
   cd phantom-cyber-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the dashboard

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
phantom-cyber-core/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── charts/        # Data visualization components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Mock data and constants
│   └── styles/            # Global styles and theme
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyber Green (`#00ff41`)
- **Secondary**: Electric Blue (`#0099ff`)
- **Accent**: Neon Pink (`#ff0080`)
- **Background**: Deep Black (`#0a0a0a`)
- **Surface**: Dark Gray (`#1a1a1a`)

### Typography
- **Primary Font**: JetBrains Mono (monospace)
- **System Font**: Inter (fallback)

### Components
- **Glowing Effects**: CSS box-shadow with neon colors
- **Animations**: Smooth transitions and hover effects
- **Glass Morphism**: Subtle backdrop blur and transparency
- **Matrix Patterns**: Background grid and dot patterns

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Development Guidelines

1. **Component Structure**
   - Use functional components with hooks
   - Implement proper TypeScript interfaces
   - Follow naming conventions (PascalCase for components)

2. **Styling**
   - Use Tailwind CSS utility classes
   - Implement responsive design patterns
   - Follow the established design system

3. **State Management**
   - Use React hooks for local state
   - Implement proper state lifting when needed
   - Consider context for global state

## 🌐 Deployment

### Netlify (Recommended)
The project is configured for automatic deployment on Netlify:

1. **Fork the repository** on GitHub
2. **Connect to Netlify** and select your fork
3. **Build settings** are automatically configured
4. **Deploy** - Your site will be live at `your-site-name.netlify.app`

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=Phantom Cyber Core
```

## 🤝 Contributing

We welcome contributions to improve the SOC Dashboard! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add appropriate tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - For the excellent component library
- **Recharts** - For powerful data visualization capabilities
- **Lucide** - For beautiful, consistent icons
- **Tailwind CSS** - For the utility-first styling approach

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues** - Search existing issues on GitHub
2. **Create a New Issue** - Report bugs or request features
3. **Documentation** - Review this README and code comments

---

**Built with ❤️ by the Phantom Cyber Core Team**

*Securing the digital frontier, one dashboard at a time.*
