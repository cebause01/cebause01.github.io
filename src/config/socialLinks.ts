// Social links: env overrides (see .env.example); fallbacks match this portfolio site.
const fallback = {
  github: 'https://github.com/cebause01',
  linkedin: 'https://www.linkedin.com/in/zarifhaikalz/',
  email: 'zarif0107@icloud.com',
  projectOne: 'https://idialysis.my',
  projectTwo: 'https://github.com/cebause01/Multi-LLM',
  projectThree: 'https://huggingface.co/zarifhaikal01',
  projectFour: 'https://github.com/cebause01/RT-SignLanguage-YOLOv8',
} as const;

// Social Links Configuration - uses environment variables only
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL || fallback.github,
  linkedin: import.meta.env.VITE_LINKEDIN_URL || fallback.linkedin,
  email: import.meta.env.VITE_EMAIL || fallback.email,

  // GitHub repository URLs (optional extras for template components)
  repositories: {
    projectOne: import.meta.env.VITE_GITHUB_PROJECT1_URL || fallback.projectOne,
    projectTwo: import.meta.env.VITE_GITHUB_PROJECT2_URL || fallback.projectTwo,
    projectThree: import.meta.env.VITE_GITHUB_PROJECT3_URL || fallback.projectThree,
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL || fallback.projectFour,
  },

  // Formatted display names (extracted from environment variables)
  display: {
    github: (import.meta.env.VITE_GITHUB_URL || fallback.github).replace('https://', ''),
    linkedin: (import.meta.env.VITE_LINKEDIN_URL || fallback.linkedin).replace('https://', ''),
    email: import.meta.env.VITE_EMAIL || fallback.email,
  },
};

export default socialLinks;