/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, MapPin, ChevronRight, Heart, Plane, Key, Search, Shield, PenTool, LineChart, Filter, Users, Award, TrendingUp, Building2, ArrowUp, ChevronDown } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactProperty, setContactProperty] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [bedFilter, setBedFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Parallax for Hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '20%']);

  // Parallax for Editorial Section
  const editorialRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: editorialScroll } = useScroll({
    target: editorialRef,
    offset: ["start end", "end start"]
  });
  const editorialY = useTransform(editorialScroll, [0, 1], ['-15%', '15%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const properties = [
    {
      id: 1,
      name: "The Belvedere Arch",
      location: "Beverly Hills, CA",
      price: "$12,500,000",
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c9070952-37a3-41e4-bed6-847746be5b06_3840w.png?w=800&q=80",
      specs: "5 Bed • 7 Bath • 8,200 sqft",
      description: "A triumph of modern architecture, The Belvedere Arch command sweeping views of the canyons. Features an infinity-edge pool that appears to float above the city lights.",
      detailedDescription: "Designed as a series of interlocking volumes, The Belvedere Arch is a masterclass in structural expressionism. The interior features book-matched Italian marble, a 2,000-bottle temperature-controlled wine cellar, and a professional-grade wellness suite. The upper cantilevered wing houses the primary suite, offering a 270-degree view of the Los Angeles basin through museum-quality glass.",
      features: ["Wine Cellar", "Infinity Pool", "Smart Home System", "Private Gallery", "Wellness Suite", "Custom Chef Kitchen"],
      architect: "Renzo Piano Studio",
      yearBuilt: 2023,
      landArea: "1.2 Acres",
      neighborhood: "Upper Bel-Air"
    },
    {
      id: 2,
      name: "Villa Azure",
      location: "Cap d'Antibes, France",
      price: "€24,000,000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
      specs: "7 Bed • 9 Bath • 12,000 sqft",
      description: "Steeped in history and luxury, Villa Azure embodies the timeless elegance of the French Riviera. A private path leads directly to the Mediterranean.",
      features: ["Private Beach Access", "Historic Wine Cave", "Guest House", "Staff Quarters"],
      architect: "Jean-Michel Wilmotte",
      yearBuilt: 1928,
      landArea: "2.5 Hectares",
      neighborhood: "La Garoupe"
    },
    {
      id: 3,
      name: "Oakhaven Estate",
      location: "Aspen, CO",
      price: "$18,900,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
      specs: "6 Bed • 6.5 Bath • 9,500 sqft",
      description: "The ultimate mountain retreat. Oakhaven features floor-to-ceiling windows that perfectly frame the snow-capped peaks of Aspen.",
      features: ["Ski-in/Ski-out", "Home Theater", "Heated Driveway", "Outdoor Spa"],
      architect: "Charles Cunniffe Architects",
      yearBuilt: 2021,
      landArea: "0.8 Acres",
      neighborhood: "Red Mountain"
    },
    {
      id: 4,
      name: "Solstice Pavilion",
      location: "Malibu, CA",
      price: "$28,500,000",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop",
      specs: "4 Bed • 5.5 Bath • 7,800 sqft",
      description: "An architectural masterpiece in the heart of Malibu. The Solstice Pavilion blends indoor and outdoor living seamlessly with its retracting glass walls.",
      features: ["Ocean Front", "Panoramic Rooftop", "Zen Garden", "Private Chef's Kitchen"],
      architect: "Richard Meier & Partners",
      yearBuilt: 2024,
      landArea: "0.5 Acres",
      neighborhood: "Carbon Beach"
    },
    {
      id: 5,
      name: "Casa Blanco",
      location: "Ibiza, Spain",
      price: "€15,200,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
      specs: "6 Bed • 6 Bath • 8,900 sqft",
      description: "A minimalist sanctuary overlooking the turquoise waters of Ibiza. Designed for ultimate relaxation and entertaining.",
      features: ["Nightclub Room", "Yoga Studio", "Outdoor Cinema", "Eco-Friendly Design"],
      architect: "Fran Silvestre Arquitectos",
      yearBuilt: 2022,
      landArea: "4,000 sqm",
      neighborhood: "Es Cubells"
    },
    {
      id: 6,
      name: "The Zenith Penthouse",
      location: "New York, NY",
      price: "$45,000,000",
      image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2670&auto=format&fit=crop",
      specs: "4 Bed • 5 Bath • 6,200 sqft",
      description: "Floating above Central Park, this penthouse offers the most exclusive perspective of the Manhattan skyline.",
      detailedDescription: "Occupying the entire 92nd floor, The Zenith Penthouse defines vertical luxury. The residence features 14-foot ceilings throughout, with a private ballroom and a custom-designed library of rare hardwoods. The 3,000-square-foot wraparound terrace includes an outdoor lounge and the highest private water feature in the city.",
      features: ["Private Elevator", "360-degree Views", "Butler Service", "Library", "Ballroom", "Wraparound Terrace"],
      architect: "Foster + Partners",
      yearBuilt: 2020,
      landArea: "N/A (Billionaire's Row)",
      neighborhood: "Midtown Manhattan"
    },
    {
      id: 7,
      name: "Elysium Manor",
      location: "Lake Como, Italy",
      price: "€32,000,000",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2670&auto=format&fit=crop",
      specs: "9 Bed • 11 Bath • 18,500 sqft",
      description: "A grand neoclassical villa restored to its former glory. The Elysium Manor is a beacon of Italian heritage and luxury.",
      features: ["Private Boat Dock", "Heliport", "Botanical Garden", "Ballroom"],
      architect: "Piero Lissoni (Renovation)",
      yearBuilt: 1845,
      landArea: "4.5 Hectares",
      neighborhood: "Bellagio"
    },
    {
      id: 8,
      name: "The Glass House",
      location: "Miami, FL",
      price: "$19,800,000",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
      specs: "5 Bed • 6 Bath • 10,200 sqft",
      description: "A transparent marvel on the waterfront. Every room in The Glass House offers uninterrupted views of the Atlantic Ocean.",
      features: ["Underwater Viewing Room", "Private Island", "Gym", "Auto-Gallery"],
      architect: "Kobi Karp",
      yearBuilt: 2023,
      landArea: "0.4 Acres",
      neighborhood: "Star Island"
    },
    {
      id: 9,
      name: "Alpine Retreat",
      location: "Gstaad, Switzerland",
      price: "CHF 42,000,000",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2670&auto=format&fit=crop",
      specs: "8 Bed • 8.5 Bath • 15,000 sqft",
      description: "A massive timber and stone chalet in the most exclusive Swiss village. Offers absolute privacy and cozy luxury.",
      features: ["Full Spa Center", "Indoor Pool", "Bowling Alley", "Professional Kitchen"],
      architect: "Local Master Craftsmen",
      yearBuilt: 2019,
      landArea: "1.5 Hectares",
      neighborhood: "Oberbort"
    },
    {
      id: 10,
      name: "The Sapphire Rim",
      location: "Oia, Santorini",
      price: "€12,800,000",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2670&auto=format&fit=crop",
      specs: "3 Bed • 4 Bath • 3,200 sqft",
      description: "Perched on the edge of the caldera, this property offers the world's most famous sunset views from every window.",
      features: ["Infinity Dip Pool", "Traditional Cave Style", "Rooftop Terrace", "Bespoke Furnishing"],
      architect: "Kapsimalis Architects",
      yearBuilt: 2020,
      landArea: "450 sqm",
      neighborhood: "Caldera Edge"
    },
    {
      id: 11,
      name: "Ironwood Ridge",
      location: "Vancouver, BC",
      price: "$14,500,000",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop",
      specs: "6 Bed • 7 Bath • 11,400 sqft",
      description: "A modern fortress of wood, metal, and glass. Ironwood Ridge is designed to celebrate the rugged beauty of the Pacific Northwest.",
      features: ["Sustainability Focus", "Art Studio", "Waterfall Entrance", "Guest Wing"],
      architect: "Patkau Architects",
      yearBuilt: 2021,
      landArea: "2.1 Acres",
      neighborhood: "West Vancouver"
    },
    {
      id: 12,
      name: "Marble Pavilion",
      location: "Kyoto, Japan",
      price: "¥2,400,000,000",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2670&auto=format&fit=crop",
      specs: "5 Bed • 5 Bath • 6,800 sqft",
      description: "A serene architectural homage to Japanese minimalism. Features an authentic stone garden and meditation chambers.",
      features: ["Tea Ceremony Room", "Onsen-style Bath", "Zan Garden", "Cherry Blossom Park"],
      architect: "Kengo Kuma & Associates",
      yearBuilt: 2023,
      landArea: "1,200 sqm",
      neighborhood: "Higashiyama"
    },
    {
      id: 13,
      name: "The Ivory Sanctuary",
      location: "The Hamptons, NY",
      price: "$34,000,000",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      specs: "10 Bed • 12 Bath • 22,000 sqft",
      description: "The crown jewel of The Hamptons. This massive estate offers unparalleled scale and classic coastal elegance.",
      features: ["Tennis Court", "Olympic Pool", "Orchard", "Media Wing"],
      architect: "Robert A.M. Stern Architects",
      yearBuilt: 2022,
      landArea: "4.2 Acres",
      neighborhood: "Southampton"
    }
  ];

  const faqList = [
    {
      q: "How do I gain access to off-market properties?",
      a: "Our exclusive off-market portfolio is available only to registered clients. We verify each residency inquiry to maintain the absolute privacy of the sellers."
    },
    {
      q: "Does RELAY Properties handle international acquisition legalities?",
      a: "Yes. We partner with elite global law firms specializing in trans-border real estate acquisition, handles all structural due diligence and tax optimization."
    },
    {
      q: "Can I sell a property anonymously?",
      a: "Discretion is our hallmark. We can facilitate 'Stealth Transactions' where your property is never listed on public databases and only shown to verified buyers."
    },
    {
      q: "What is 'Interior Curation'?",
      a: "Beyond brokerage, we help you transform your new acquisition through our network of world-renowned architectural and interior design firms."
    },
    {
      q: "Do you offer private jet services for viewings?",
      a: "For our international clientele, we orchestrate complimentary private aviation for all property inspections and viewings globally."
    },
    {
      q: "How are your portfolio management services structured?",
      a: "We provide bespoke management for high-net-worth portfolios, ensuring asset appreciation through vigilant maintenance and strategic financial oversight."
    },
    {
      q: "Is there a minimum value for listings you represent?",
      a: "While we specialize in ultra-prime real estate, our primary focus is on exceptional architecture and historically significant estates, typically starting at $10M."
    },
    {
      q: "How do you verify the quality of structural build in your listings?",
      a: "Every property undergoes a rigorous 200-point inspection by our structural advisory team before being introduced to our private portfolio."
    },
    {
      q: "What regions do you currently operate in?",
      a: "We have primary offices in Los Angeles, New York, London, and Dubai, with localized surgical coverage across Europe and the Pacific Rim."
    },
    {
      q: "How do I begin an inquiry for a property?",
      a: "You may use the 'Inquire' button on any property listing or contact our private advisory directly through our global office directory."
    }
  ];

  const servicesList = [
    {
      icon: <Search className="text-gold-500" size={28} />,
      title: "Off-Market Sourcing",
      description: "Access to private listings and bespoke properties before they reach the open market."
    },
    {
      icon: <Shield className="text-gold-500" size={28} />,
      title: "Private Acquisition",
      description: "Complete anonymity and discretion handled through our elite legal & privacy partners."
    },
    {
      icon: <PenTool className="text-gold-500" size={28} />,
      title: "Interior Curation",
      description: "Collaboration with world-renowned architectural and interior design firms."
    },
    {
      icon: <Plane className="text-gold-500" size={28} />,
      title: "Private Aviation",
      description: "Complimentary global travel orchestration for all international property viewings."
    },
    {
      icon: <LineChart className="text-gold-500" size={28} />,
      title: "Portfolio Management",
      description: "Strategic real estate advisory for high-net-worth investment portfolios."
    },
    {
      icon: <Key className="text-gold-500" size={28} />,
      title: "Concierge Closing",
      description: "Seamless white-glove closing processes handling every logistical detail."
    }
  ];

  const coreOperations = [
    {
      title: "Buy",
      subtitle: "Acquisition Strategy",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop",
      description: "We navigate the complexities of global acquisition. From identifying off-market opportunities to structural due diligence and legal negotiation, our team ensures your transition is seamless."
    },
    {
      title: "Sell",
      subtitle: "Global Placement",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop",
      description: "Maximizing the value of your asset through high-detail cinematography, global PR placement, and access to our private database of qualified ultra-high-net-worth individuals."
    },
    {
      title: "Manage",
      subtitle: "Asset Preservation",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
      description: "Real estate is an investment that requires vigilance. Our management division handles maintenance, tenant relations, and financial optimization to ensure your portfolio appreciates."
    }
  ];

  const teamMembers = [
    {
      name: "Marcus Thorne",
      role: "Managing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
      bio: "Former luxury developments attorney with 20 years of experience in ultra-prime real estate."
    },
    {
      name: "Elena Rossi",
      role: "Head of International Sales",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2669&auto=format&fit=crop",
      bio: "Global network specialist connecting the Mediterranean coast with the New York luxury market."
    },
    {
      name: "David Chen",
      role: "Director of Asset Management",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2670&auto=format&fit=crop",
      bio: "Specialist in sustainable architecture and high-yield property optimization strategies."
    }
  ];

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationFilter === "all" || property.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Simple bed extraction logic: "5 Bed • 7 Bath • 8,200 sqft" -> 5
    const beds = parseInt(property.specs.split(' ')[0]) || 0;
    const matchesBeds = bedFilter === "all" || 
                        (bedFilter === "3+" && beds >= 3) || 
                        (bedFilter === "5+" && beds >= 5) || 
                        (parseInt(bedFilter) === beds);

    // Simple price extraction logic: "$12,500,000" -> 12500000
    const priceValue = parseInt(property.price.replace(/[^0-9]/g, '')) || 0;
    const matchesPrice = priceFilter === "all" || 
                         (priceFilter === "under-15m" && priceValue < 15000000) || 
                         (priceFilter === "over-30m" && priceValue > 30000000) ||
                         (priceFilter === "15m-30m" && priceValue >= 15000000 && priceValue <= 30000000);

    return matchesSearch && matchesLocation && matchesBeds && matchesPrice;
  });

  const AboutPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <span className="text-gold-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Meet the Visionaries</span>
        <h1 className="text-5xl md:text-7xl font-serif font-light text-stone-900 mb-8">Architects of <br/><span className="italic">Legacy</span></h1>
        <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
          Founded on the principles of absolute discretion and unrivaled market intelligence, Relay is more than a brokerage. We are a boutique residency advisory serving the world's most discerning families.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-32">
        {teamMembers.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="aspect-[3/4] overflow-hidden mb-8 border border-stone-200">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-serif mb-1">{member.name}</h3>
            <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-4">{member.role}</p>
            <p className="text-stone-500 text-sm leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-stone-900 text-stone-50 p-12 lg:p-20">
        <div className="space-y-4">
          <TrendingUp size={32} className="text-gold-500" />
          <h4 className="text-xl font-serif">Market Dominance</h4>
          <p className="text-stone-400 text-sm">Controlling over 15% of the off-market luxury transactions in Beverly Hills and Aspen.</p>
        </div>
        <div className="space-y-4">
          <Award size={32} className="text-gold-500" />
          <h4 className="text-xl font-serif">Unrivaled Privacy</h4>
          <p className="text-stone-400 text-sm">Our proprietary "Stealth Transaction" protocol ensures 100% anonymity for high-profile acquisitions.</p>
        </div>
        <div className="space-y-4">
          <Users size={32} className="text-gold-500" />
          <h4 className="text-xl font-serif">Global Network</h4>
          <p className="text-stone-400 text-sm">Direct connections to the family offices of the world's Top 500 wealthiest individuals.</p>
        </div>
      </div>
      
      <div className="mt-32 text-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="px-10 py-5 bg-stone-900 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold-500 transition-colors"
        >
          Return to Collections
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-gold-500 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-stone-50/90 backdrop-blur-md border-stone-200/50 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentPage('home')}>
            {/* Logo Icon with Curved Text */}
            <div className="relative flex items-center justify-center w-10 h-10">
              <Building2 className="text-gold-500 relative z-10" size={20} />
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-180">
                <path id="logoCurve" d="M 20,50 A 30,30 0 0,1 80,50" fill="transparent" />
                <text className="text-[9px] font-sans tracking-[0.3em] uppercase fill-gold-500 font-bold">
                  <textPath xlinkHref="#logoCurve" startOffset="50%" textAnchor="middle">
                    Properties
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Main Brand Name */}
            <span className={`text-2xl font-serif tracking-widest uppercase transition-colors duration-500 ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
              Relay
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <div className={`flex items-center gap-8 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${isScrolled ? 'text-stone-600' : 'text-white/80'}`}>
              <button onClick={() => setCurrentPage('home')} className="hover:text-gold-500 transition-colors">Estates</button>
              <button onClick={() => setCurrentPage('about')} className="hover:text-gold-500 transition-colors">About</button>
              <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth'}), 100); }} className="hover:text-gold-500 transition-colors">Services</button>
              
              {/* Favorites Icon */}
              <button 
                onClick={() => setFavoritesOpen(true)}
                className="relative p-1 hover:text-gold-500 transition-colors flex items-center gap-2"
              >
                <Heart size={16} className={favorites.size > 0 ? "fill-gold-500 text-gold-500" : ""} />
                {favorites.size > 0 && <span className="text-[10px] tabular-nums">{favorites.size}</span>}
              </button>
            </div>
            <button 
              onClick={() => setContactOpen(true)}
              className={`px-6 py-2.5 text-xs font-medium tracking-[0.1em] uppercase border transition-colors duration-500 ${
              isScrolled 
                ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-stone-900'
            }`}>
              Contact Us
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-stone-900' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-50 bg-stone-900 text-stone-50 flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <Building2 className="text-gold-500" size={16} />
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-180">
                    <path id="mobileLogoCurve" d="M 20,50 A 30,30 0 0,1 80,50" fill="transparent" />
                    <text className="text-[10px] font-sans tracking-[0.2em] uppercase fill-gold-500 font-bold">
                      <textPath xlinkHref="#mobileLogoCurve" startOffset="50%" textAnchor="middle">
                        Properties
                      </textPath>
                    </text>
                  </svg>
                </div>
                <span className="text-xl font-serif tracking-widest uppercase text-gold-500">Relay</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-stone-50">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-10 text-xl font-serif tracking-widest uppercase">
              <a href="#estates" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">Estates</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">Services</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setFavoritesOpen(true); }}
                className="hover:text-gold-500 transition-colors flex items-center gap-3"
              >
                Favorites ({favorites.size})
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
                className="mt-8 px-8 py-4 text-xs font-sans font-medium tracking-[0.1em] border border-stone-50 hover:bg-gold-500 hover:border-gold-500 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Drawer */}
      <AnimatePresence>
        {favoritesOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFavoritesOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-stone-50 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-stone-200 flex justify-between items-center bg-white">
                <div>
                  <h2 className="text-2xl font-serif text-stone-900">Your <span className="italic">Collection</span></h2>
                  <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">{favorites.size} Saved Properties</p>
                </div>
                <button 
                  onClick={() => setFavoritesOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {favorites.size === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Heart size={48} className="text-stone-200 mb-6" />
                    <p className="text-stone-500 font-serif italic text-lg mb-2">Empty Sanctuary</p>
                    <p className="text-xs text-stone-400 uppercase tracking-widest max-w-[200px]">Save exceptional properties to view them here later.</p>
                  </div>
                ) : (
                  Array.from(favorites).map(id => {
                    const property = properties.find(p => p.id === id);
                    if (!property) return null;
                    return (
                      <div 
                        key={property.id} 
                        className="flex gap-4 group cursor-pointer"
                        onClick={() => { setSelectedProperty(property); setFavoritesOpen(false); }}
                      >
                        <div className="w-24 h-32 flex-shrink-0 overflow-hidden border border-stone-200">
                          <img src={property.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" loading="lazy" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-lg font-serif mb-1 group-hover:text-gold-500 transition-colors">{property.name}</h3>
                          <p className="text-[10px] uppercase tracking-widest text-gold-500 mb-2">{property.location}</p>
                          <p className="text-sm font-medium mb-3">{property.price}</p>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(e, property.id); }}
                            className="text-[10px] uppercase font-bold tracking-tighter border-b border-stone-900 w-fit hover:text-red-500 hover:border-red-500 transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              {favorites.size > 0 && (
                <div className="p-8 border-t border-stone-200 bg-white">
                  <button className="w-full py-4 bg-stone-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-gold-500 transition-colors">
                    Request Info For All
                  </button>
                </div>
              )}
            </motion.div>
            {/* Contact Us Modal */}
            <AnimatePresence>
              {contactOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                >
                  <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm" onClick={() => { setContactOpen(false); setContactProperty(null); }} />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-white max-w-4xl w-full p-8 md:p-16 border border-stone-200 shadow-2xl overflow-hidden"
                  >
                    <button 
                      onClick={() => { setContactOpen(false); setContactProperty(null); }}
                      className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div>
                        <h2 className="text-4xl font-serif text-stone-900 mb-8 lowercase italic">get in <br />touch</h2>
                        {contactProperty ? (
                          <div className="mb-8 p-6 bg-stone-50 border border-stone-100">
                            <p className="text-[10px] font-bold tracking-widest text-gold-500 uppercase mb-2">Inquiring About</p>
                            <h3 className="text-xl font-serif text-stone-900 mb-1">{contactProperty.name}</h3>
                            <p className="text-stone-500 text-sm mb-4">{contactProperty.location} • {contactProperty.price}</p>
                            <textarea 
                              className="w-full bg-white border border-stone-200 p-3 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none placeholder:text-stone-300"
                              rows={4}
                              placeholder="Add any specific questions or preferred times to tour..."
                            ></textarea>
                          </div>
                        ) : (
                          <p className="text-stone-500 text-sm leading-relaxed mb-12">
                            Our private advisory team is available 24/7 for our registered portfolio holders. Please select your regional directory for direct access.
                          </p>
                        )}
                        
                        <div className="space-y-8">
                          <div>
                            <p className="text-[10px] font-bold tracking-widest text-gold-500 uppercase mb-2 italic">Beverly Hills HQ</p>
                            <p className="text-stone-900 font-medium">relay.bh@gmail.com</p>
                            <p className="text-stone-400 text-xs">+1 (310) 555-0192</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-widest text-gold-500 uppercase mb-2 italic">London Prime</p>
                            <p className="text-stone-900 font-medium">relay.ldn@gmail.com</p>
                            <p className="text-stone-400 text-xs">+44 20 7946 0851</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-widest text-gold-500 uppercase mb-2 italic">Dubai Private</p>
                            <p className="text-stone-900 font-medium">relay.dxb@gmail.com</p>
                            <p className="text-stone-400 text-xs">+971 4 555 0123</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-stone-50 p-8 flex flex-col justify-center">
                        <div className="mb-12">
                          <Building2 className="text-gold-500 mb-6" size={40} />
                          <h3 className="text-2xl font-serif mb-4 italic italic">Surgical Precision</h3>
                          <p className="text-stone-500 text-sm leading-relaxed italic">
                            "Every inquiry is handled with the surgical precision and absolute discretion that the RELAY legacy demands."
                          </p>
                        </div>
                        <button className="w-full py-4 bg-stone-900 text-stone-50 text-xs font-bold tracking-widest uppercase hover:bg-gold-500 transition-colors">
                          Schedule Private Call
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Property Detail Modal */}
            <AnimatePresence>
              {selectedProperty && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] flex items-center justify-center px-4"
                >
                  <div className="absolute inset-0 bg-stone-900/95 backdrop-blur-md" onClick={() => setSelectedProperty(null)} />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                  >
                    <button 
                      onClick={() => setSelectedProperty(null)}
                      className="absolute top-6 right-6 z-20 p-2 hover:bg-stone-100 rounded-full transition-colors mix-blend-difference text-white"
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                      <img 
                        src={selectedProperty.image} 
                        className="w-full h-full object-cover" 
                        alt={selectedProperty.name} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                      <div className="mb-8">
                        <span className="text-gold-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block italic">{selectedProperty.location}</span>
                        <h2 className="text-4xl font-serif text-stone-900 mb-2 leading-tight">{selectedProperty.name}</h2>
                        <p className="text-xl font-medium text-stone-900 mb-6">{selectedProperty.price}</p>
                        <div className="flex gap-4 p-4 bg-stone-50 border border-stone-100 mb-8 overflow-hidden">
                          <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold whitespace-nowrap">{selectedProperty.specs}</p>
                        </div>
                      </div>

                      <div className="mb-8 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                          {selectedProperty.architect && (
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 italic">Architect</p>
                              <p className="text-stone-900 text-sm font-medium">{selectedProperty.architect}</p>
                            </div>
                          )}
                          {selectedProperty.yearBuilt && (
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 italic">Year Built</p>
                              <p className="text-stone-900 text-sm font-medium">{selectedProperty.yearBuilt}</p>
                            </div>
                          )}
                          {selectedProperty.landArea && (
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 italic">Land Area</p>
                              <p className="text-stone-900 text-sm font-medium">{selectedProperty.landArea}</p>
                            </div>
                          )}
                          {selectedProperty.neighborhood && (
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 italic">Neighborhood</p>
                              <p className="text-stone-900 text-sm font-medium">{selectedProperty.neighborhood}</p>
                            </div>
                          )}
                        </div>

                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-900 mb-3 italic">Overview</h4>
                        <p className="text-stone-500 text-sm leading-relaxed mb-6 italic">
                          {selectedProperty.detailedDescription || selectedProperty.description}
                        </p>
                      </div>

                      <div className="mb-12">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-900 mb-4 italic">Distinguished Features</h4>
                        <div className="grid grid-cols-2 gap-y-3">
                          {selectedProperty.features?.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                              <span className="text-xs text-stone-600 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex gap-4">
                        <button 
                          onClick={() => { setContactOpen(true); setSelectedProperty(null); }}
                          className="flex-1 py-4 bg-stone-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gold-500 transition-colors"
                        >
                          Request Private Tour
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(e, selectedProperty.id); }}
                          className="px-6 py-4 border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                        >
                          <Heart size={20} className={favorites.has(selectedProperty.id) ? "fill-gold-500 text-gold-500" : "text-stone-900"} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {currentPage === 'about' ? <AboutPage /> : (
        <>
          {/* Hero Section */}
          <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-stone-950">
              <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-transparent to-stone-50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent md:bg-none z-10" />
              <motion.img 
                style={{ y: heroY }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop" 
                alt="Luxury Architecture"
                className="w-full h-[120%] object-cover object-[65%_center] sm:object-center origin-top opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Hero Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-48">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center mb-6"
              >
                <p className="text-white/60 text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                  Luxury Architecture
                </p>
                <p className="text-white/80 text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
                  Curated Global Portfolio
                </p>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] mb-10 drop-shadow-sm"
              >
                Elevate Your <br />
                <span className="italic text-gold-500">Perspective</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                <a href="#estates" className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white hover:text-stone-900 transition-all duration-300 group">
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase">Explore Properties</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* Intro Section */}
          <section className="py-24 px-6 max-w-4xl mx-auto text-center" id="about">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-serif leading-relaxed text-stone-800"
            >
              We are <span className="italic text-gold-500 font-medium">RELAY Properties</span>. An exclusive real estate consultancy connecting discerning individuals with the world's most exceptional properties.
            </motion.p>
          </section>

          {/* New Featured Properties Section */}
          <section className="py-24 bg-white border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <span className="text-gold-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block italic">Signature Listings</span>
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Featured <span className="italic font-light">Properties</span></h2>
                <p className="text-stone-500 max-w-2xl mx-auto">A handpicked selection of our most extraordinary luxury estates, showcasing unparalleled design and exclusivity.</p>
              </div>

              <div className="space-y-32">
                {properties.slice(0, 3).map((property, idx) => (
                  <div key={property.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <motion.div 
                      initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full lg:w-1/2"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative group cursor-pointer" onClick={() => setSelectedProperty(property)}>
                        <img 
                          src={property.image} 
                          alt={property.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="w-full lg:w-1/2 flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-2 text-gold-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                        <MapPin size={14} />
                        <span>{property.location}</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-serif text-stone-900 mb-4">{property.name}</h3>
                      <p className="text-xl font-medium text-stone-800 mb-6">{property.price}</p>
                      <p className="text-stone-500 leading-relaxed mb-8 max-w-md">
                        {property.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-stone-200">
                        {property.features?.slice(0, 4).map((feature, i) => (
                           <div key={i} className="flex items-center gap-2">
                             <div className="w-1 h-1 bg-stone-300 rounded-full" />
                             <span className="text-xs text-stone-600 font-medium tracking-wide">{feature}</span>
                           </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => setSelectedProperty(property)}
                          className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors group hover:text-gold-500 w-fit"
                        >
                          <span className="border-b border-stone-900 group-hover:border-gold-500 pb-1 transition-colors">View Details</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setContactProperty(property); setContactOpen(true); }}
                          className="px-6 py-3 bg-stone-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gold-500 transition-colors"
                        >
                          Contact Agent
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Global Collection */}
          <section className="py-20 px-6 max-w-7xl mx-auto" id="estates">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Global <span className="italic font-light">Collection</span></h2>
                <p className="text-stone-500 tracking-wide text-sm md:text-base">Explore our complete portfolio covering exclusive markets worldwide.</p>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-gold-500 transition-colors group">
                View All Properties
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-20">
              <div className="bg-white border-b border-stone-200">
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
                  {/* Search Bar */}
                  <div className="flex-1 min-w-0 p-6 flex items-center group">
                    <Search size={18} className="text-stone-400 mr-4 group-focus-within:text-gold-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search property or location..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-stone-300"
                    />
                  </div>

                  {/* Filters Menu */}
                  <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
                    {/* Location */}
                    <div className="relative group p-6 hover:bg-stone-50 transition-colors cursor-pointer min-w-[200px]">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Market</p>
                          <select 
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="bg-transparent text-sm font-medium focus:outline-none appearance-none cursor-pointer w-full pr-8"
                          >
                            <option value="all">Global (All)</option>
                            <option value="beverly hills">Beverly Hills</option>
                            <option value="new york">New York</option>
                            <option value="malibu">Malibu</option>
                            <option value="france">France</option>
                            <option value="italy">Italy</option>
                            <option value="switzerland">Switzerland</option>
                          </select>
                        </div>
                        <ChevronDown size={14} className="text-stone-300 group-hover:text-gold-500 transition-colors absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="relative group p-6 hover:bg-stone-50 transition-colors cursor-pointer min-w-[200px]">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Cap Allocation</p>
                          <select 
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="bg-transparent text-sm font-medium focus:outline-none appearance-none cursor-pointer w-full pr-8"
                          >
                            <option value="all">Unrestricted</option>
                            <option value="under-15m">Under $15M</option>
                            <option value="15m-30m">$15M - $30M</option>
                            <option value="over-30m">Over $30M</option>
                          </select>
                        </div>
                        <ChevronDown size={14} className="text-stone-300 group-hover:text-gold-500 transition-colors absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="relative group p-6 hover:bg-stone-50 transition-colors cursor-pointer min-w-[160px]">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Bedrooms</p>
                          <select 
                            value={bedFilter}
                            onChange={(e) => setBedFilter(e.target.value)}
                            className="bg-transparent text-sm font-medium focus:outline-none appearance-none cursor-pointer w-full pr-8"
                          >
                            <option value="all">Any Beds</option>
                            <option value="3+">3+ Beds</option>
                            <option value="5+">5+ Beds</option>
                            <option value="8+">8+ Beds</option>
                          </select>
                        </div>
                        <ChevronDown size={14} className="text-stone-300 group-hover:text-gold-500 transition-colors absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setPriceFilter("all");
                        setBedFilter("all");
                        setLocationFilter("all");
                      }}
                      className="p-6 text-stone-400 hover:text-gold-500 transition-colors border-l border-stone-100 flex items-center justify-center group"
                      title="Reset Selection"
                    >
                      <Filter size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, idx) => (
                  <motion.div 
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    layout
                    className="group cursor-pointer"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="relative overflow-hidden aspect-[4/5] object-cover mb-6 border border-stone-200">
                      <img 
                        src={property.image} 
                        alt={property.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={(e) => toggleFavorite(e, property.id)}
                        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/50 backdrop-blur-md hover:bg-white transition-colors border border-white/20 shadow-sm"
                        aria-label="Toggle Favorite"
                      >
                        <Heart 
                          size={18} 
                          className={favorites.has(property.id) ? "fill-gold-500 text-gold-500" : "text-stone-900"} 
                        />
                      </button>
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-serif text-stone-900 mb-1">{property.name}</h3>
                        <p className="text-stone-500 text-sm flex items-center gap-1 mb-2">
                          <MapPin size={14} className="text-gold-500"/> {property.location}
                        </p>
                        <p className="text-xs tracking-wider text-stone-400 font-medium uppercase">{property.specs}</p>
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-stone-900">{property.price}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setContactProperty(property); setContactOpen(true); }}
                      className="w-full py-3 bg-stone-50 text-stone-600 border border-stone-200 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all"
                    >
                      Contact Agent
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <Search size={40} className="text-stone-200 mb-4" />
                  <p className="text-xl font-serif text-stone-900 mb-2">No Properties Found</p>
                  <p className="text-stone-500 text-sm">Try adjusting your filters or search criteria.</p>
                </div>
              )}
            </div>
          </section>

          {/* Editorial Split Section */}
          <section className="py-24" id="services">
            <div className="bg-stone-900 text-stone-50">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 p-12 lg:p-24 order-2 lg:order-1">
                  <span className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 block">Our Approach</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight">
                    Beyond <br/> <span className="italic text-stone-300">Transactions</span>
                  </h2>
                  <p className="text-stone-400 leading-relaxed mb-10 font-light text-lg">
                    We believe finding a home is more than a transaction; it's a profound life event. Our advisory team provides a white-glove service that anticipates needs, respects privacy, and delivers results through unrivaled market intelligence.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="text-3xl font-serif text-white mb-2">150+</h4>
                      <p className="text-xs uppercase tracking-widest text-stone-500">Properties Sold</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-serif text-white mb-2">$2B+</h4>
                      <p className="text-xs uppercase tracking-widest text-stone-500">Volume Handled</p>
                    </div>
                  </div>
                  
                  <button className="px-8 py-4 border border-stone-700 hover:border-gold-500 hover:text-gold-500 text-xs font-semibold tracking-[0.1em] uppercase transition-colors">
                    Meet the Team
                  </button>
                </div>
                <div ref={editorialRef} className="w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[600px] order-1 lg:order-2 overflow-hidden relative">
                   <motion.img 
                    style={{ y: editorialY }}
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2680&auto=format&fit=crop" 
                    alt="Luxury living space"
                    className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Detailed Services Grid */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 text-stone-900 border-b border-stone-200">
              <div className="text-center mb-20 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 font-light">
                  <span className="italic text-gold-500">Bespoke</span> Services
                </h2>
                <p className="text-stone-500 leading-relaxed font-sans">
                  Experience an unparalleled level of dedicated service. Our comprehensive suite covers the entire lifecycle of global property ownership.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                {servicesList.map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="mb-6 p-4 rounded-full bg-stone-100 inline-block group-hover:bg-gold-500/10 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-serif text-stone-900 mb-3">{service.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Buy Sell Manage Section */}
            <div className="max-w-7xl mx-auto px-6 py-32 border-b border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {coreOperations.map((op, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="group"
                  >
                    <div className="overflow-hidden aspect-video mb-8 border border-stone-200">
                      <img 
                        src={op.image} 
                        alt={op.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-gold-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">{op.subtitle}</span>
                    <h3 className="text-3xl font-serif text-stone-900 mb-6">{op.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                      {op.description}
                    </p>
                    <button className="text-xs font-bold tracking-widest uppercase border-b border-stone-900 pb-1 hover:text-gold-500 hover:border-gold-500 transition-all">
                      Inquire
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Our Team Section */}
            <div className="max-w-7xl mx-auto px-6 py-32">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">Mastering the Art <br/> of <span className="italic">Excellence</span></h2>
                  <p className="text-stone-500 font-light leading-relaxed">Our multidisciplinary team brings together legacy expertise and forward-thinking precision to serve our global clientele.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="px-8 py-4 bg-stone-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-gold-500 transition-colors"
                >
                  Our Full Team
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {teamMembers.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="text-center md:text-left"
                  >
                    <div className="aspect-square mb-8 overflow-hidden bg-stone-200 border border-stone-200">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="text-2xl font-serif text-stone-900 mb-1">{member.name}</h4>
                    <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-4">{member.role}</p>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                      {member.bio}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* FAQ Section */}
            <section className="py-32 px-6 bg-white border-t border-stone-100" id="faq">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <span className="text-gold-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block italic">Intelligence & Protocols</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-stone-900 lowercase italic">frequently asked <br /> questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {faqList.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <h3 className="text-xl font-serif text-stone-900 mb-4 border-b border-stone-100 pb-4">{item.q}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </>
      )}

      {/* Footer */}
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[60] w-12 h-12 bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-xl hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-stone-50 pt-24 pb-12 px-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-20 gap-12 text-stone-900">
          
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative flex items-center justify-center w-10 h-10">
                <Building2 className="text-gold-500 font-bold" size={20} />
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-180">
                  <path id="footerLogoCurve" d="M 20,50 A 30,30 0 0,1 80,50" fill="transparent" />
                  <text className="text-[9px] font-sans tracking-[0.3em] uppercase fill-gold-500 font-bold">
                    <textPath xlinkHref="#footerLogoCurve" startOffset="50%" textAnchor="middle">
                      Properties
                    </textPath>
                  </text>
                </svg>
              </div>
              <span className="text-2xl font-serif tracking-widest uppercase text-stone-900">Relay</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              The premier destination for luxury real estate globally. We curate exceptional living spaces for extraordinary lives.
            </p>
            <form className="flex border-b border-stone-300 pb-2">
              <input 
                type="email" 
                placeholder="Join our private mailing list" 
                className="bg-transparent text-sm w-full outline-none placeholder:text-stone-400 font-medium"
              />
              <button type="submit" className="text-xs font-bold uppercase tracking-widest hover:text-gold-500">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-medium">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-6">Explore</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-gold-500 transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Developments</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Agents</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-gold-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-6">Offices</h4>
              <ul className="space-y-4 text-sm text-stone-500">
                <li>Los Angeles</li>
                <li>New York</li>
                <li>London</li>
                <li>Dubai</li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-medium text-stone-400 pt-8 border-t border-stone-200">
          <p>&copy; {new Date().getFullYear()} RELAY Properties. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-900">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
