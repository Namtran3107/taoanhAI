
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 py-6 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-playfair font-bold tracking-tighter text-black">COUTURE<span className="text-gray-400">AI</span></h1>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Studio</a>
            <a href="#" className="hover:text-black transition-colors">Collections</a>
            <a href="#" className="hover:text-black transition-colors">Archive</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>&copy; 2024 COUTUREAI DIGITAL ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">API Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
