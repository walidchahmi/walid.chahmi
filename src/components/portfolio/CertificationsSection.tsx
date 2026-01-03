import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import generativeAI from '@/assets/certificates/generative-ai.jpg';
import machineLearning from '@/assets/certificates/machine-learning.jpg';
import pythonCert from '@/assets/certificates/python.jpg';
import artificialIntelligence from '@/assets/certificates/artificial-intelligence.jpg';

interface Certificate {
  id: number;
  name: string;
  platform: string;
  category: string;
  image: string;
  date: string;
  rotate?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Generative AI for Professionals",
    platform: "GOMYCODE",
    category: "AI",
    image: generativeAI,
    date: "January 2026"
  },
  {
    id: 2,
    name: "Basics of Machine Learning Algorithms",
    platform: "Cambridge International / UniAthena",
    category: "AI",
    image: machineLearning,
    date: "December 2025"
  },
  {
    id: 3,
    name: "Basics of Python",
    platform: "Cambridge International / UniAthena",
    category: "Data",
    image: pythonCert,
    date: "December 2025"
  },
  {
    id: 4,
    name: "Basics of Artificial Intelligence",
    platform: "Cambridge International / UniAthena",
    category: "AI",
    image: artificialIntelligence,
    date: "December 2025"
  },
    {
      id: 5,
      name: "Getting Started with Microsoft PowerPoint",
      platform: "Coursera",
      category: "Productivity",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Microsoft-PowerPoint_page-0001-1767460835317.jpg?width=1200&height=1200&resize=contain",
      date: "November 28, 2025"
    },
    {
      id: 6,
      name: "Construct Stock Market Indices",
      platform: "Coursera",
      category: "Data",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/_page-0001-1767460835314.jpg?width=1200&height=1200&resize=contain",
      date: "November 28, 2025"
    },
    {
      id: 8,
      name: "Creating a Free Business Page with Blogger",
      platform: "Coursera",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Blogger_page-0001-1767460835314.jpg?width=1200&height=1200&resize=contain",
      date: "November 28, 2025"
    },
    {
      id: 9,
      name: "Develop a Company Website with Wix",
      platform: "Coursera",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Wix_page-0001-1767460835315.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 10,
      name: "Build a Full Website using WordPress",
      platform: "Coursera",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/WordPress_page-0001-1767460524113.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 11,
      name: "Marketing Design with Easil",
      platform: "Coursera",
      category: "Productivity",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Easil_page-0001-1767460523920.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 12,
      name: "Graphic Design: Pop your LinkedIn with 3D Effect using Canva",
      platform: "Coursera",
      category: "Productivity",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/3D-LinkedIn-Canva_page-0001-1767460523920.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 13,
      name: "How to Create Presentations using Canva",
      platform: "Coursera",
      category: "Productivity",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Canva_page-0001-1767460523900.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 14,
      name: "Build a Free Website with WordPress",
      platform: "Coursera",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/WordPress_page-0001-1767460523910.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 15,
      name: "Getting Started with Microsoft Excel",
      platform: "Coursera",
      category: "Productivity",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Microsoft-Excel-_page-0001-1767460523919.jpg?width=1200&height=1200&resize=contain",
      date: "November 27, 2025"
    },
    {
      id: 16,
      name: "Gemini Certified Educator",
      platform: "Google",
      category: "AI",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Gemini-Certified-Educator-_page-0001-1767460523910.jpg?width=1200&height=1200&resize=contain",
      date: "November 21, 2025"
    },
    {
      id: 17,
      name: "Introduction au développement web avec des compétences en IA",
      platform: "GOMYCODE",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/Walid-Chahmi_page-0001-1767460523916.jpg?width=1200&height=1200&resize=contain",
      date: "June 1, 2025"
    },
    {
      id: 18,
      name: "Responsive Web Design",
      platform: "freeCodeCamp",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/_page-0001-1767460523888.jpg?width=1200&height=1200&resize=contain",
      date: "January 22, 2025"
    },
    {
      id: 19,
      name: "PYCathlon - Concours de Codage",
      platform: "Université Paris Dauphine-PSL",
      category: "Web Development",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/PYCathlon-1767458503410.jpg?width=1200&height=1200&resize=contain",
      date: "February 2025",
      rotate: "-rotate-90"
    },
  {
    id: 20,
    name: "Certificat d'Excellence Académique",
    platform: "Ministère de l'Éducation - Tunisie",
    category: "Productivity",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/2-3-2025-1767458503366.jpg?width=1200&height=1200&resize=contain",
    date: "2024/2025"
  },
    {
      id: 21,
      name: "Online Freelancing Strategies and AI",
      platform: "Alhababi Business",
      category: "AI",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/_page-0001-resized-1767460524158.jpg?width=1200&height=1200&resize=contain",
      date: "January 25, 2025"
    }
  ];

const CertificationsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'Web Development', 'AI', 'Data', 'Productivity'];

  const filteredCerts = filter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  return (
    <section id="certifications" className="section-container py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-primary font-medium text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('navCertifications')}
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-display font-bold mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('certificationsTitle')}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('certificationsSubtitle')}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? (t('all') || 'All') : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="certificate-card group cursor-pointer relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              onClick={() => setSelectedCert(cert)}
              whileHover={{ y: -10 }}
            >
              {/* Hover Glow Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
                {/* Certificate Image */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative z-10 border border-white/10">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${cert.rotate || ''}`}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-medium text-primary uppercase tracking-widest">{t('viewCertificate') || 'View Certificate'}</span>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10">
                    {cert.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {cert.date}
                  </span>
                </div>
                <h3 className="text-md font-display font-semibold mt-2 text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                  {cert.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {cert.platform}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Count */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full max-w-md mb-8" />
            <p className="text-muted-foreground flex flex-col items-center gap-2">
              <span className="text-4xl font-display font-bold gold-gradient-text tracking-tighter">20</span>
              <span className="text-sm uppercase tracking-[0.3em] opacity-60">Professional Certifications</span>
            </p>
        </motion.div>
      </div>

        {/* Lightbox Modal */}
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-2xl cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[110] p-3 bg-background/80 rounded-full border border-white/10 text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:rotate-90"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <motion.div
              className="relative w-[90vw] max-w-4xl max-h-[80vh] flex flex-col cursor-default"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex-shrink-0">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className={`w-full h-auto object-contain max-h-[60vh] ${selectedCert.rotate || ''}`}
                />
              </div>

              <div className="mt-4 md:mt-6 text-center flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    {selectedCert.platform}
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground mt-2 tracking-tight">
                    {selectedCert.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm">
                    <span className="h-[1px] w-4 md:w-8 bg-white/10" />
                    <span className="font-medium uppercase tracking-wider">{selectedCert.category}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span>{selectedCert.date}</span>
                    <span className="h-[1px] w-4 md:w-8 bg-white/10" />
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
    </section>
  );
};

export default CertificationsSection;
