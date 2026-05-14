import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Education = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const entries = [
    {
      degree: "Bachelor's Degree, Artificial Intelligence",
      school: 'Universiti Teknologi MARA (UiTM)',
      location: 'Malaysia',
      period: 'Mar 2022 - Jun 2024',
      highlights: ['CGPA: 3.29', "Dean's List Recipient", 'Machine learning & computer vision focus', 'FYP: Real-time sign language translation (YOLOv8)'],
    },
    {
      degree: "Diploma of Education, Computer Science",
      school: 'Universiti Teknologi MARA (UiTM)',
      location: 'Malaysia',
      period: 'Jul 2019 - Feb 2022',
      highlights: ['CGPA: 3.73', "Vice Chancellor's Award", 'Programming & web foundations', 'HTML5, CSS, and multiple languages'],
    },
  ];

  return (
    <section id="education" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out',
    }}>
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Education</h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {entries.map((e, index) => (
            <Card key={index} className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>{e.degree}</CardTitle>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-1">{e.school}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{e.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{e.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {e.highlights.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" style={{ color: themeColors.primary }}>•</span>
                      <span className="text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
