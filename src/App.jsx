import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./index.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";

import ProjectDetails from "./components/ProjectDetail";
const AdminPage = lazy(() => import("./Pages/Admin"));

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#101417',
      paper: '#101417',
    },
    primary: {
      main: '#d4af7a',
    },
    secondary: {
      main: '#e7c08a',
    },
  },
  typography: {
    fontFamily: '"Poppins", serif',
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-accent-gold text-obsidian rounded-lg hover:bg-secondary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
  </div>
);

const Footer = () => (
  <footer role="contentinfo">
    <hr className="my-3 border-secondary/15 sm:mx-auto lg:my-6 text-center" />
    <p className="block text-sm pb-4 text-[#c7c5ce]/60 text-center font-mono text-xs tracking-wider">
      © {new Date().getFullYear()} Mohamed Esam Fouad (MeMo). All Rights Reserved.
    </p>
  </footer>
);

const LandingPage = () => (
  <main className="relative">
    <AnimatedBackground />
    <div className="relative z-10">
      <Navbar />
      <Home />
      <About />
      <Portofolio />
      <ContactPage />
      <Footer />
    </div>
  </main>
);

const ProjectPageLayout = () => (
  <main className="relative">
    <AnimatedBackground />
    <div className="relative z-10">
      <ProjectDetails />
      <Footer />
    </div>
  </main>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')} future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
            {import.meta.env.DEV && (
              <Route path="/admin" element={
                <Suspense fallback={<LoadingFallback />}>
                  <AdminPage />
                </Suspense>
              } />
            )}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
