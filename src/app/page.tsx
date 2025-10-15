'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import OurWork from '@/components/landing/OurWork';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <OurWork />
      <Testimonials />
      <Footer />
    </main>
  );
}
