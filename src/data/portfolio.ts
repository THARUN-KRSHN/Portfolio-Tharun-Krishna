
export type ProjectCategory = "logo" | "poster" | "brochure" | "social" | "ui" | "dev";

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    tags: string[];
    year: string;
    thumbnail: string;
    description?: string;
    color?: string;
    link?: string;
    images?: string[];
}

export const portfolioData: Project[] = [
    // --- Featured Logos ---
    {
        id: "neuro",
        title: "NEuro",
        category: "logo",
        tags: ["Brand Identity", "Tech"],
        year: "2024",
        thumbnail: "/images/NEuro (2).png",
        color: "bg-blue-500",
        description: "Modern neural interface branding."
    },
    {
        id: "courtside-calm",
        title: "Courtside Calm",
        category: "logo",
        tags: ["Sports", "Lifestyle"],
        year: "2024",
        thumbnail: "/images/Courtside calm.png",
        color: "bg-green-500"
    },
    {
        id: "tanal",
        title: "Tanal",
        category: "logo",
        tags: ["Organic", "Nature"],
        year: "2024",
        thumbnail: "/images/tanal (1).png",
        color: "bg-emerald-600"
    },
    {
        id: "thatwork-1",
        title: "ThatWork",
        category: "logo",
        tags: ["Agency", "Creative"],
        year: "2024",
        thumbnail: "/images/thatwork/1.png",
        color: "bg-purple-500"
    },
    {
        id: "thatwork-2",
        title: "ThatWork Monogram",
        category: "logo",
        tags: ["Agency", "Symbol"],
        year: "2024",
        thumbnail: "/images/thatwork/2.png",
        color: "bg-purple-400"
    },
    {
        id: "untitled-17",
        title: "Brand Concept",
        category: "logo",
        tags: ["Concept", "Minimal"],
        year: "2024",
        thumbnail: "/images/Untitled design (17).png",
        color: "bg-zinc-500"
    },

    // --- Posters (Design Works) ---
    {
        id: "congrats-poster",
        title: "Achievement",
        category: "poster",
        tags: ["Celebration", "Typography"],
        year: "2024",
        thumbnail: "/images/CongratsPoster (2).png"
    },
    {
        id: "pravaah",
        title: "Pravaah Flex",
        category: "poster",
        tags: ["Event", "Large Format"],
        year: "2024",
        thumbnail: "/images/Pravaah Flex Work.png"
    },
    {
        id: "future-engineering",
        title: "Future Engineering",
        category: "poster",
        tags: ["Tech", "Conference"],
        year: "2025",
        thumbnail: "/images/The Future of Engineering Today's Innovations.png"
    },
    {
        id: "untitled-15",
        title: "Design Concept",
        category: "poster",
        tags: ["Abstract", "Art"],
        year: "2024",
        thumbnail: "/images/Untitled design (15).png"
    },
    // Christ College Series
    {
        id: "christ-1",
        title: "Christ College Event 1",
        category: "poster",
        tags: ["Academic", "Event"],
        year: "2024",
        thumbnail: "/images/Copy of CHRIST COLLEGE OF ENGINEERING/1.png"
    },
    {
        id: "christ-10",
        title: "Christ College Event 10",
        category: "poster",
        tags: ["Academic", "Event"],
        year: "2024",
        thumbnail: "/images/Copy of CHRIST COLLEGE OF ENGINEERING/10.png"
    },
    {
        id: "christ-11",
        title: "Christ College Event 11",
        category: "poster",
        tags: ["Academic", "Event"],
        year: "2024",
        thumbnail: "/images/Copy of CHRIST COLLEGE OF ENGINEERING/11.png"
    },

    // --- Brochures ---
    {
        id: "brochure-front",
        title: "Corporate Brochure - Front",
        category: "brochure",
        tags: ["Print", "Editorial"],
        year: "2024",
        thumbnail: "/images/front.png"
    },
    {
        id: "brochure-back",
        title: "Corporate Brochure - Back",
        category: "brochure",
        tags: ["Print", "Editorial"],
        year: "2024",
        thumbnail: "/images/back.png"
    },
    {
        id: "christmas-card",
        title: "Christmas Card",
        category: "brochure",
        tags: ["Holiday", "Print"],
        year: "2023",
        thumbnail: "/images/Christmas Card.png"
    },
    // Theme DS as Brochure/Documentation
    {
        id: "theme-ds-1",
        title: "Theme DS - System",
        category: "brochure",
        tags: ["Design System", "Manual"],
        year: "2024",
        thumbnail: "/images/Theme DS/1.png"
    },
    {
        id: "theme-ds-2",
        title: "Theme DS - Components",
        category: "brochure",
        tags: ["Design System", "Manual"],
        year: "2024",
        thumbnail: "/images/Theme DS/2.png"
    },

    // --- Social Media ---
    {
        id: "eid-mubarak",
        title: "Eid Mubarak",
        category: "social",
        tags: ["Festival", "Social"],
        year: "2024",
        thumbnail: "/images/Eid Mubarak.png"
    },
    {
        id: "happy-onam",
        title: "Happy Onam",
        category: "social",
        tags: ["Festival", "Social"],
        year: "2024",
        thumbnail: "/images/HAPPY ONAM (3).png"
    },
    {
        id: "minnal-murali",
        title: "Minnal Murali Fan Art",
        category: "social",
        tags: ["Movie", "Illustration"],
        year: "2024",
        thumbnail: "/images/MINNAL MURALI.png"
    },
    {
        id: "freshers-25",
        title: "Freshers '25",
        category: "social",
        tags: ["Event", "University"],
        year: "2025",
        thumbnail: "/images/Freshers'25 (2).png"
    },
    {
        id: "gasco",
        title: "GASCO",
        category: "social",
        tags: ["Corporate", "Announcement"],
        year: "2024",
        thumbnail: "/images/GASCO (1).png"
    },
    {
        id: "hackforchrist",
        title: "HackForChrist",
        category: "social",
        tags: ["Hackathon", "Tech"],
        year: "2024",
        thumbnail: "/images/HackForChrist.png"
    },
    {
        id: "iv-ust",
        title: "Industrial Visit - UST",
        category: "social",
        tags: ["Event", "Tech"],
        year: "2024",
        thumbnail: "/images/IV UST (1).png"
    },
    {
        id: "may-01",
        title: "May 1st",
        category: "social",
        tags: ["Day", "Poster"],
        year: "2024",
        thumbnail: "/images/MAY 01.png"
    },
    {
        id: "ponnonam",
        title: "Ponnonam Pixels",
        category: "social",
        tags: ["Event", "Contest"],
        year: "2024",
        thumbnail: "/images/PONNONAM PIXELS (6).png"
    },
    {
        id: "star-making",
        title: "Star Making",
        category: "social",
        tags: ["Event", "Christmas"],
        year: "2024",
        thumbnail: "/images/star making  (1).png"
    },
    {
        id: "haritham-1",
        title: "Haritham Campaign 1",
        category: "social",
        tags: ["Eco", "Campaign"],
        year: "2024",
        thumbnail: "/images/haritham/2.png"
    },
    {
        id: "haritham-2",
        title: "Haritham Campaign 2",
        category: "social",
        tags: ["Eco", "Campaign"],
        year: "2024",
        thumbnail: "/images/haritham/3.png"
    },
    // Stories (16:9)
    {
        id: "10-years-of",
        title: "10 Years Celebration",
        category: "social",
        tags: ["Story", "Anniversary"],
        year: "2024",
        thumbnail: "/images/10 YEARS OF.png"
    },
    {
        id: "industrial-visit-story",
        title: "Industrial Visit Story",
        category: "social",
        tags: ["Story", "Event"],
        year: "2024",
        thumbnail: "/images/INDUSTRIAL VISIT.png"
    },

    // --- UI / UX ---
    // Using Banners and UI screens
    {
        id: "banner-1",
        title: "Web Banner 01",
        category: "ui",
        tags: ["Web", "Header"],
        year: "2024",
        thumbnail: "/images/1.png",
        color: "bg-indigo-900"
    },
    {
        id: "banner-2",
        title: "Web Banner 02",
        category: "ui",
        tags: ["Web", "Ad"],
        year: "2024",
        thumbnail: "/images/2.png",
        color: "bg-blue-800"
    },
    {
        id: "untitled-16",
        title: "Dashboard Interface",
        category: "ui",
        tags: ["Dashboard", "SaaS"],
        year: "2024",
        thumbnail: "/images/Untitled design (16).png",
        color: "bg-slate-800"
    },
    // --- Development / Projects ---
    {
        id: "sahayak",
        title: "Sahayak Portal",
        category: "dev",
        tags: ["Frontend", "Accessibility", "GovTech"],
        year: "2026",
        thumbnail: "/images/sahayak.png",
        color: "bg-orange-500",
        description: "Inclusive government services portal."
    },
    {
        id: "copyscale",
        title: "CopyScale",
        category: "dev",
        tags: ["AI", "Security", "Frontend"],
        year: "2025",
        thumbnail: "https://placehold.co/800x450/0f172a/94a3b8?text=CopyScale+Preview",
        color: "bg-violet-900",
        description: "AI-based movie leak detection platform."
    },
    {
        id: "uaat-mvp",
        title: "UAAT MVP",
        category: "dev",
        tags: ["Java", "Desktop App"],
        year: "2025",
        thumbnail: "https://placehold.co/800x450/1e293b/94a3b8?text=UAAT+MVP",
        color: "bg-slate-700",
        description: "Automated question paper generation."
    },
    {
        id: "neuropaths",
        title: "NeuroPaths",
        category: "dev",
        tags: ["Inclusive", "Learning", "Frontend"],
        year: "2025",
        thumbnail: "https://placehold.co/800x450/064e3b/6ee7b7?text=NeuroPaths",
        color: "bg-emerald-800",
        description: "Learning platform for disabilities."
    },
    {
        id: "rover",
        title: "Underwater Rover",
        category: "dev",
        tags: ["Robotics", "QGroundControl"],
        year: "Ongoing",
        thumbnail: "https://placehold.co/800x450/172554/93c5fd?text=Rover+System",
        color: "bg-blue-900",
        description: "Custom control dashboard for ROV."
    },
    {
        id: "traffic-system",
        title: "Traffic Mgmt System",
        category: "dev",
        tags: ["Python", "OpenCV", "Flask"],
        year: "2025",
        thumbnail: "https://placehold.co/800x450/7c2d12/fdba74?text=Traffic+System",
        color: "bg-orange-800",
        description: "Real-time traffic analytics."
    },
];

export const getProjectsByCategory = (category: ProjectCategory) => {
    return portfolioData.filter((project) => project.category === category);
};
