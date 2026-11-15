import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Check, Copy } from 'lucide-react';
import { personalInfo, experiences, technicalSkills, education, prototypes } from '../data/portfolioData';
import { playSuccessChime, playTactileClick } from '../utils/soundEffects';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playSuccessChime();
    window.print();
  };

  const handleCopyText = () => {
    playSuccessChime();
    const resumeText = `
ASHUTOSH GAUTAM
Phone: ${personalInfo.phone} | Email: ${personalInfo.email} | Location: ${personalInfo.location}

PROFESSIONAL SUMMARY
${personalInfo.about}

TECHNICAL & PROFESSIONAL SKILLS
- Technical Skills: Full-Stack Developer (MERN Stack Core), Application Testing & Debugger, Next.js, TypeScript, Python, JavaScript, HTML, CSS
- Core Skills: Email Marketing, Lead Generation, SEO, Financial Market Analysis, Company Fundamentals, Data Analysis, Website Optimization, Advanced Excel, Professional Typing
- Languages: English, Hindi, Bengali, Italian (Beginner)

PROFESSIONAL EXPERIENCE
${experiences
  .map(
    (e) => `
${e.company} | ${e.role} | ${e.period} (${e.location})
${e.highlights.map((h) => `- ${h}`).join('\n')}`
  )
  .join('\n\n')}

FEATURED TECHNICAL PROTOTYPES & MVPS
${prototypes
  .map(
    (p) => `- ${p.title} (${p.status}): ${p.problem} Stack: ${p.tech.join(', ')}`
  )
  .join('\n\n')}

EDUCATION
- Adamas University: Bachelor of Computer Applications (BCA), 2023 – 2027 (Expected), Kolkata
- Agrasain Boys' School: Higher Secondary (XII) & Secondary (X), Completed 2023, Howrah

INTERESTS & HOBBIES
Swimming • Creative Photography • Secondary Language Learning
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0d12] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <h2 id="resume-title" className="ml-3 font-semibold text-sm text-white">
              Ashutosh_Gautam_Resume.pdf
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 border border-white/10 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090a0f] font-sans print:bg-white print:text-black">
          {/* Header Details */}
          <div className="text-center space-y-2 border-b border-white/10 pb-6 print:border-black/20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
              ASHUTOSH GAUTAM
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-zinc-400 print:text-zinc-700">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                {personalInfo.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {personalInfo.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 border-b border-blue-500/30 pb-1 print:text-black">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed print:text-black">
              {personalInfo.about}
            </p>
          </div>

          {/* Technical & Professional Skills */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 border-b border-blue-500/30 pb-1 print:text-black">
              Technical & Professional Skills
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-300 print:text-black">
              <div>
                <strong className="text-white print:text-black">Technical Skills:</strong>{' '}
                Full-Stack Developer (MERN Stack Core), Application Testing & Debugger, Next.js, TypeScript, Python, JavaScript, HTML, CSS
              </div>
              <div>
                <strong className="text-white print:text-black">Core Skills:</strong>{' '}
                Email Marketing, Lead Generation, SEO, Financial Market Analysis, Company Fundamentals, Data Analysis, Website Optimization, Advanced Excel, Professional Typing
              </div>
              <div>
                <strong className="text-white print:text-black">Languages:</strong>{' '}
                English, Hindi, Bengali, Italian (Beginner)
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 border-b border-blue-500/30 pb-1 print:text-black">
              Professional Experience
            </h3>

            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2 text-xs sm:text-sm">
                <div className="flex flex-wrap justify-between items-baseline">
                  <div>
                    <span className="font-bold text-white print:text-black text-sm">
                      {exp.company}
                    </span>
                    <span className="text-zinc-400 print:text-zinc-600 ml-2 italic">
                      — {exp.role}
                    </span>
                  </div>
                  <div className="text-right text-zinc-400 print:text-zinc-600 font-mono text-xs">
                    {exp.period} • {exp.location}
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-black pl-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Technical Prototypes & MVPs */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 border-b border-blue-500/30 pb-1 print:text-black">
              Featured Technical Prototypes & MVPs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prototypes.map((proto) => (
                <div key={proto.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 print:border-black/20 print:bg-transparent space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-white print:text-black text-xs sm:text-sm font-bold">
                      {proto.title}
                    </strong>
                    <span className="text-[10px] font-mono text-emerald-400 print:text-black">
                      {proto.status.split('•')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 print:text-zinc-800 leading-relaxed">
                    {proto.problem}
                  </p>
                  <div className="text-[10px] text-zinc-400 print:text-zinc-600 font-mono pt-1">
                    Stack: {proto.tech.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 border-b border-blue-500/30 pb-1 print:text-black">
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline text-xs sm:text-sm">
                <div>
                  <strong className="text-white print:text-black">{edu.institution}</strong>
                  <div className="text-zinc-400 print:text-zinc-600">{edu.degree}</div>
                </div>
                <div className="text-right text-zinc-400 print:text-zinc-600 font-mono text-xs">
                  {edu.period} • {edu.location}
                </div>
              </div>
            ))}
          </div>

          {/* Interests & Hobbies */}
          <div className="space-y-2 pt-2 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs uppercase tracking-widest font-bold text-blue-400 print:text-black">
              Interests & Hobbies
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-black">
              Swimming • Creative Photography • Secondary Language Learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
