import React from 'react';
import SvgFilters from './components/common/SvgFilters';
import StarPortal from './components/portal/StarPortal';
import Skills from './components/skills/Skills';
import GitHubActivity from './components/github/GitHubActivity';
import Resume from './components/resume/Resume';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <>
      <SvgFilters />
      <StarPortal />
      <main className="main-content">
        <Skills />
        <GitHubActivity />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
