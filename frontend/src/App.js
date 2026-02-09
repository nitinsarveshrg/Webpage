import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const element = document.getElementById(hash);
      if (!element) return;

      const header = document.querySelector("header");
      const headerOffset = (header ? header.getBoundingClientRect().height : 80) + 16;
      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "auto" });
    };

    const timer = setTimeout(scrollToHashTarget, 0);
    window.addEventListener("hashchange", scrollToHashTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return (
    <div className="bg-zinc-950">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
