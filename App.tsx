import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CheckCircle2, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { PropertyCard } from './components/PropertyCard';
import { ChatWidget } from './components/ChatWidget';
import { CtaModal } from './components/CtaModal';
import { Property, SectionId } from './types';

// --- Constants & Mock Data ---
const NAV_LINKS = [
  { name: 'Properties', href: '#listings' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const FEATURED_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Azure Residence',
    location: 'Beverly Hills, CA',
    price: '$12,500,000',
    beds: 5,
    baths: 6.5,
    sqft: 6200,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
    tag: 'Just Listed'
  },
  {
    id: '2',
    title: 'Minimalist Canyon Villa',
    location: 'Malibu, CA',
    price: '$8,950,000',
    beds: 4,
    baths: 4,
    sqft: 4100,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    tag: 'Exclusive'
  },
  {
    id: '3',
    title: 'Downtown Sky Penthouse',
    location: 'New York, NY',
    price: '$22,000,000',
    beds: 3,
    baths: 3.5,
    sqft: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    tag: 'Rare Find'
  }
];

const STATS = [
  { label: 'Properties Sold', value: '450+' },
  { label: 'Total Volume', value: '$2.5B' },
  { label: 'Happy Clients', value: '98%' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCta = () => {
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-white">
      {/* --- Navigation --- */}
      <nav 
        className={`fixed w-full z-40 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-4 border-stone-100 shadow-sm' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Logo className="relative z-50 h-8 md:h-10 cursor-pointer" onClick={() => scrollToSection('hero')} />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm uppercase tracking-widest font-medium hover:text-gold-600 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Button variant="outline" size="sm" onClick={openCta}>List With Us</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Mobile Nav Overlay */}
          <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col space-y-8 text-center">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="font-serif text-3xl text-stone-900 hover:text-gold-600 transition-colors cursor-pointer"
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                >
                  {link.name}
                </a>
              ))}
               <Button variant="outline" size="lg" onClick={openCta}>Start Your Journey</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header id={SectionId.HERO} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-white/90 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6 animate-fade-in-up">
            Architectural Masterpieces & Visual Spaces
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight animate-fade-in-up delay-100">
            Curating the World's<br/>
            <span className="italic">Finest Properties</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
             <Button 
                className="bg-white text-stone-900 hover:bg-stone-100 border-none min-w-[200px]"
                onClick={() => scrollToSection('listings')}
             >
               View Listings
             </Button>
             <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-stone-900 min-w-[200px]"
                onClick={openCta}
             >
               Contact an Agent
             </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('expertise')}
        >
          <div className="w-[1px] h-12 bg-white/50 mx-auto"></div>
          <span className="text-white/50 text-[10px] uppercase tracking-widest mt-2 block">Scroll</span>
        </div>
      </header>

      {/* --- Stats Section (Expertise) --- */}
      <section id="expertise" className="py-20 bg-stone-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {STATS.map((stat, idx) => (
              <div key={idx} className="pt-8 md:pt-0 px-4">
                <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">{stat.value}</h3>
                <p className="text-stone-500 uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Intro / About --- */}
      <section id={SectionId.ABOUT} className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
             <div className="w-full lg:w-1/2">
                <div className="relative">
                  <img src="https://picsum.photos/800/600?random=4" alt="Architect" className="w-full h-auto object-cover grayscale" />
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-400/20 backdrop-blur-sm -z-10"></div>
                </div>
             </div>
             <div className="w-full lg:w-1/2 space-y-8">
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                  We bridge the gap between <span className="italic text-gold-600">art</span> and <span className="italic text-gold-600">living</span>.
                </h2>
                <p className="text-stone-600 leading-relaxed font-light text-lg">
                  At AMVS, we don't just sell houses; we curate lifestyles. Our portfolio consists of the most architecturally significant homes on the market, selected for clients who value design, history, and uncompromising quality.
                </p>
                <ul className="space-y-4">
                  {['Exclusive Off-Market Listings', 'Global Network of Buyers', 'Architectural Consultation', 'Concierge Relocation Services'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-stone-800">
                      <CheckCircle2 className="w-5 h-5 text-gold-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-4" onClick={openCta}>Start Your Journey</Button>
             </div>
          </div>
        </div>
      </section>

      {/* --- Featured Listings (Dark Theme) --- */}
      <section id={SectionId.LISTINGS} className="py-24 bg-stone-900 text-white scroll-mt-20 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-stone-700/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-2">Curated Collection</p>
              <h2 className="font-serif text-4xl text-white">Featured Properties</h2>
            </div>
            <button 
              onClick={openCta} 
              className="hidden md:flex items-center gap-2 text-white/80 font-medium hover:text-gold-500 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map(prop => (
              <div key={prop.id} onClick={openCta} className="cursor-pointer transform hover:-translate-y-2 transition-transform duration-500">
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="primary" fullWidth onClick={openCta} className="bg-white text-stone-900 hover:bg-gold-500 hover:text-white">View All Properties</Button>
          </div>
        </div>
      </section>

      {/* --- CTA / Newsletter --- */}
      <section className="py-24 bg-stone-950 text-white relative overflow-hidden border-t border-stone-800">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
           <h2 className="font-serif text-4xl md:text-5xl mb-6">Stay Ahead of the Market</h2>
           <p className="text-stone-400 mb-10 font-light text-lg">
             Join our exclusive circle to receive off-market listings and quarterly market reports before they reach the public.
           </p>
           <div className="flex flex-col sm:flex-row gap-4">
             <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors"
             />
             <Button className="bg-white text-stone-900 hover:bg-gold-500 hover:text-white px-8" onClick={openCta}>Subscribe</Button>
           </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id={SectionId.CONTACT} className="bg-white pt-24 pb-12 border-t border-stone-100 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <Logo className="h-8 mb-6 text-stone-900" />
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                AMVS is the premier destination for luxury real estate, bridging the gap between architectural art and functional living spaces.
              </p>
              <div className="flex gap-4 text-stone-400">
                <Instagram className="w-5 h-5 hover:text-stone-900 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-stone-900 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-stone-900 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-stone-900 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-stone-600">
                <li><button onClick={() => scrollToSection('listings')} className="hover:text-gold-600 transition-colors">Search Homes</button></li>
                <li><button onClick={openCta} className="hover:text-gold-600 transition-colors">Our Agents</button></li>
                <li><button onClick={openCta} className="hover:text-gold-600 transition-colors">Market Reports</button></li>
                <li><button onClick={openCta} className="hover:text-gold-600 transition-colors">Careers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6">Offices</h4>
              <ul className="space-y-4 text-sm text-stone-600">
                <li>
                  <span className="block font-medium text-stone-900">Los Angeles</span>
                  90210 Wilshire Blvd, Suite 500
                </li>
                <li>
                  <span className="block font-medium text-stone-900">New York</span>
                  55 Hudson Yards, 10th Floor
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-stone-600">
                <li>inquiries@amvs.com</li>
                <li>+1 (888) 555-0123</li>
                <li className="pt-4">
                  <button onClick={openCta} className="text-gold-600 underline underline-offset-4">Schedule a Consultation</button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400">
            <p>&copy; 2024 AMVS Real Estate. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-stone-900">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900">Terms of Service</a>
              <a href="#" className="hover:text-stone-900">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
      
      {/* Lead Form Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}