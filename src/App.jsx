import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import "./index.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";

import ProjectDetails from "./components/ProjectDetail";
const AdminPage = lazy(() => import("./Pages/Admin"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#030014] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
  </div>
);

const Footer = () => (
  <footer role="contentinfo">
    <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
    <p className="block text-sm pb-4 text-gray-500 text-center">
      © {new Date().getFullYear()} Mohamed Esam Fouad (MeMo). All Rights Reserved.
    </p>
  </footer>
);

const LandingPage = () => (
  <main>
    <Navbar />
    <AnimatedBackground />
    <Home />
    <About />
    <Portofolio />
    <ContactPage />
    <Footer />
  </main>
);

const ProjectPageLayout = () => (
  <main>
    <ProjectDetails />
    <Footer />
  </main>
);

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
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
  );
}

export default App;