import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import "./index.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";

// Lazy-loaded pages for code splitting (only for separate routes)
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#030014] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
  </div>
);

const Footer = () => (
  <footer>
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
      <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
        © 2025{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Memo™
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
);

const LandingPage = () => (
  <>
    <Navbar />
    <AnimatedBackground />
    <Home />
    <About />
    <Portofolio />
    <ContactPage />
    <Footer />
  </>
);

const ProjectPageLayout = () => (
  <>
    <Suspense fallback={<LoadingFallback />}>
      <ProjectDetails />
    </Suspense>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;