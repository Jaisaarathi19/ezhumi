'use client';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-2xl font-bold text-white tracking-wider">
            EZHUMI
          </h1>
        </div>

        {/* Language Switcher - Center */}
        <div className="language-switcher flex items-center space-x-2 text-sm font-light text-white/80">
          <button className="hover:text-white transition-colors duration-300 px-3 py-1.5 rounded border border-white/20 bg-white/10">
            En
          </button>
          <span className="text-white/50">|</span>
          <button className="hover:text-white transition-colors duration-300 px-3 py-1.5 rounded hover:border-white/20 hover:bg-white/10">
            Ta
          </button>
          <span className="text-white/50">|</span>
          <button className="hover:text-white transition-colors duration-300 px-3 py-1.5 rounded hover:border-white/20 hover:bg-white/10">
            Hi
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          className="hamburger-menu text-white hover:text-white/70 transition-colors duration-300"
          aria-label="Open menu"
        >
          <div className="flex flex-col space-y-1.5">
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </div>
        </button>
      </div>
    </header>
  );
};
