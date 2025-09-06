'use client';

export const LeftSidebar: React.FC = () => {
  const navItems = [
    { label: 'Hero', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Themes', href: '#themes' },
    { label: 'FAQ\'s', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="left-sidebar fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40">
      {/* Navigation Links */}
      <nav className="sidebar-links flex flex-col space-y-8">
        {navItems.map((item, index) => (
          <button
            key={item.href}
            onClick={() => handleLinkClick(item.href)}
            className="nav-link text-left text-white hover:text-green-400 font-light text-base tracking-wide transition-all duration-300 relative group font-grotesk opacity-0"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="relative z-10 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">{item.label}</span>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0 w-px bg-green-400 group-hover:h-8 transition-all duration-300 -mt-10"></div>
          </button>
        ))}
      </nav>
    </div>
  );
};
