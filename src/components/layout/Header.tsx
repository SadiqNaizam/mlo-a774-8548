import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex items-center">
        <Link to="/" className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">
            SwiftLogin Portal
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;