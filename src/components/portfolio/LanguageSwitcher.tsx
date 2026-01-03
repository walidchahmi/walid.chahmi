import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', label: 'https://flagcdn.com/w20/gb.png', name: 'EN' },
  { code: 'fr', label: 'https://flagcdn.com/w20/fr.png', name: 'FR' },
  { code: 'ru', label: 'https://flagcdn.com/w20/ru.png', name: 'RU' },
  { code: 'ar', label: 'https://flagcdn.com/w20/sa.png', name: 'AR' },
] as const;

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div 
      className="language-switcher"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'ru' | 'ar')}
          className={`language-btn ${language === lang.code ? 'language-btn-active' : 'language-btn-inactive'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={lang.label} alt={lang.name} className="w-5 h-auto mr-1 inline-block" />
          <span className="hidden sm:inline">{lang.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitcher;
