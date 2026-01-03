import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const profilePhotoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/37e8dcb9-6b7f-41bf-8a7e-c33203b3a8aa/ChatGPT-Image-30-dec.-2025-10_30_18-1767458288598.png?width=400&height=400&resize=contain";

const skillCategories = [
  {
    title: { en: 'Programming Languages', fr: 'Langages de Programmation', ru: 'Языки программирования', ar: 'لغات البرمجة' },
    skills: ['Python', 'JavaScript/TypeScript', 'HTML5/CSS3', 'PHP', 'SQL'],
  },
  {
    title: { en: 'Front-End Development', fr: 'Développement Front-End', ru: 'Фронтенд-разработка', ar: 'تطوير الواجهات الأمامية' },
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: { en: 'Back-End Development', fr: 'Développement Back-End', ru: 'Бэкенд-разработка', ar: 'تطوير الواجهات الخلفية' },
    skills: ['Node.js', 'REST API Design', 'MongoDB'],
  },
  {
    title: { en: 'AI & Machine Learning', fr: 'IA & Machine Learning', ru: 'ИИ и машинное обучение', ar: 'الذكاء الاصطناعي والتعلم الآلي' },
    skills: ['Generative AI', 'LLMs', 'Prompt Engineering'],
  },
  {
    title: { en: 'DevOps & Tools', fr: 'DevOps & Outils', ru: 'DevOps и инструменты', ar: 'DevOps والأدوات' },
    skills: ['Git/GitHub', 'Docker', 'AWS'],
  },
];

const languages = [
  { name: { en: 'Arabic', fr: 'Arabe', ru: 'Арабский', ar: 'العربية' }, level: { en: 'Native', fr: 'Natif', ru: 'Родной', ar: 'اللغة الأم' } },
  { name: { en: 'French', fr: 'Français', ru: 'Французский', ar: 'الفرنسية' }, level: 'B2' },
  { name: { en: 'English', fr: 'Anglais', ru: 'Английский', ar: 'الإنجليزية' }, level: 'B2' },
  { name: { en: 'Russian', fr: 'Russe', ru: 'Русский', ar: 'الروسية' }, level: 'B1' },
  { name: { en: 'Italian', fr: 'Italien', ru: 'Итальянский', ar: 'الإيطالية' }, level: 'A1' },
];

const CVExport = () => {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const loadImageAsBase64 = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPos = margin;

      pdf.setFillColor(26, 35, 50);
      pdf.rect(0, 0, 70, pageHeight, 'F');

      pdf.setFillColor(255, 255, 255);
      pdf.rect(70, 0, pageWidth - 70, pageHeight, 'F');

      try {
        const photoBase64 = await loadImageAsBase64(profilePhotoUrl);
        pdf.addImage(photoBase64, 'PNG', 15, 15, 40, 40);
      } catch {
        pdf.setFillColor(200, 200, 200);
        pdf.circle(35, 35, 20, 'F');
      }

      yPos = 65;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('WALID', 35, yPos, { align: 'center' });
      pdf.text('CHAHMI', 35, yPos + 6, { align: 'center' });

      yPos = 85;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 180, 180);
      pdf.text('Full Stack Developer', 35, yPos, { align: 'center' });
      pdf.text('& AI Engineer', 35, yPos + 4, { align: 'center' });

      yPos = 105;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(10, yPos, 50, 0.5, 'F');

      yPos = 115;
      pdf.setTextColor(200, 160, 90);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CONTACT', 35, yPos, { align: 'center' });

      yPos += 8;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      pdf.text('walidchahmi2@gmail.com', 35, yPos, { align: 'center' });
      yPos += 5;
      pdf.text('+216 53 950 503', 35, yPos, { align: 'center' });
      yPos += 5;
      pdf.text('Bardo, Tunis, Tunisia', 35, yPos, { align: 'center' });

      yPos += 15;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(10, yPos, 50, 0.5, 'F');

      yPos += 10;
      pdf.setTextColor(200, 160, 90);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      const langTitle = { en: 'LANGUAGES', fr: 'LANGUES', ru: 'ЯЗЫКИ', ar: 'اللغات' };
      pdf.text(langTitle[language] || langTitle.en, 35, yPos, { align: 'center' });

      yPos += 8;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      
      languages.forEach((lang) => {
        const langName = typeof lang.name === 'object' ? (lang.name[language] || lang.name.en) : lang.name;
        const langLevel = typeof lang.level === 'object' ? (lang.level[language] || lang.level.en) : lang.level;
        pdf.text(`${langName}: ${langLevel}`, 35, yPos, { align: 'center' });
        yPos += 5;
      });

      yPos += 10;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(10, yPos, 50, 0.5, 'F');

      yPos += 10;
      pdf.setTextColor(200, 160, 90);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      const softTitle = { en: 'SOFT SKILLS', fr: 'QUALITÉS', ru: 'НАВЫКИ', ar: 'المهارات' };
      pdf.text(softTitle[language] || softTitle.en, 35, yPos, { align: 'center' });

      yPos += 8;
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      const softSkills = ['Problem Solving', 'Technical Leadership', 'Autonomous Learning', 'Agile Methodology'];
      softSkills.forEach((skill) => {
        pdf.text(skill, 35, yPos, { align: 'center' });
        yPos += 5;
      });

      let rightYPos = 20;
      const rightMargin = 80;

      pdf.setTextColor(26, 35, 50);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('WALID CHAHMI', rightMargin, rightYPos);

      rightYPos += 7;
      pdf.setTextColor(200, 160, 90);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Full Stack Developer & AI Engineer', rightMargin, rightYPos);

      rightYPos += 15;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(rightMargin, rightYPos, pageWidth - rightMargin - margin, 0.5, 'F');

      rightYPos += 10;
      pdf.setTextColor(26, 35, 50);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const profileTitle = { en: 'PROFILE', fr: 'PROFIL', ru: 'ПРОФИЛЬ', ar: 'نبذة' };
      pdf.text(profileTitle[language] || profileTitle.en, rightMargin, rightYPos);

      rightYPos += 7;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const profileText = {
        en: 'A highly motivated and disciplined student passionate about artificial intelligence, machine learning, and full-stack development. Combining technical excellence with cultural awareness and athletic discipline.',
        fr: 'Étudiant très motivé et discipliné, passionné par l\'intelligence artificielle, le machine learning et le développement full-stack. Je combine excellence technique, sensibilité culturelle et discipline sportive.',
        ru: 'Целеустремлённый и дисциплинированный студент, увлечённый искусственным интеллектом, машинным обучением и fullstack-разработкой.',
        ar: 'طالب متحمس ومنضبط، شغوف بالذكاء الاصطناعي والتعلم الآلي وتطوير Full Stack.'
      };
      const profileLines = pdf.splitTextToSize(profileText[language] || profileText.en, pageWidth - rightMargin - margin - 5);
      pdf.text(profileLines, rightMargin, rightYPos);
      rightYPos += profileLines.length * 4 + 8;

      pdf.setFillColor(200, 160, 90);
      pdf.rect(rightMargin, rightYPos, pageWidth - rightMargin - margin, 0.5, 'F');

      rightYPos += 10;
      pdf.setTextColor(26, 35, 50);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const eduTitle = { en: 'EDUCATION', fr: 'FORMATION', ru: 'ОБРАЗОВАНИЕ', ar: 'التعليم' };
      pdf.text(eduTitle[language] || eduTitle.en, rightMargin, rightYPos);

      rightYPos += 7;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(200, 160, 90);
      pdf.text('4ème Informatique - Lycée Bardo', rightMargin, rightYPos);
      
      rightYPos += 5;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text('GPA: 16.24/20 | Tunis, Tunisia', rightMargin, rightYPos);

      rightYPos += 12;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(rightMargin, rightYPos, pageWidth - rightMargin - margin, 0.5, 'F');

      rightYPos += 10;
      pdf.setTextColor(26, 35, 50);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const skillsTitle = { en: 'TECHNICAL SKILLS', fr: 'COMPÉTENCES TECHNIQUES', ru: 'ТЕХНИЧЕСКИЕ НАВЫКИ', ar: 'المهارات التقنية' };
      pdf.text(skillsTitle[language] || skillsTitle.en, rightMargin, rightYPos);

      rightYPos += 8;
      skillCategories.forEach((category) => {
        if (rightYPos > pageHeight - 30) return;
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(200, 160, 90);
        const catTitle = category.title[language] || category.title.en;
        pdf.text(catTitle, rightMargin, rightYPos);
        
        rightYPos += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(7);
        pdf.text(category.skills.join(' • '), rightMargin, rightYPos);
        rightYPos += 7;
      });

      rightYPos += 5;
      pdf.setFillColor(200, 160, 90);
      pdf.rect(rightMargin, rightYPos, pageWidth - rightMargin - margin, 0.5, 'F');

      rightYPos += 10;
      pdf.setTextColor(26, 35, 50);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const certTitle = { en: 'CERTIFICATIONS', fr: 'CERTIFICATIONS', ru: 'СЕРТИФИКАТЫ', ar: 'الشهادات' };
      pdf.text(certTitle[language] || certTitle.en, rightMargin, rightYPos);

      rightYPos += 7;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const certs = [
        'Google AI Essentials - Google',
        'Introduction to AI with Python - CS50',
        'Machine Learning Certification',
        'Full Stack Web Development'
      ];
      certs.forEach((cert) => {
        if (rightYPos < pageHeight - 15) {
          pdf.text('• ' + cert, rightMargin, rightYPos);
          rightYPos += 5;
        }
      });

      pdf.save('Walid_Chahmi_CV.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-gold text-primary-foreground font-semibold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-70"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:inline">{t('cvDownloading')}</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">{t('navExport')}</span>
        </>
      )}
    </motion.button>
  );
};

export default CVExport;
